
/**
 * @class graphiti.Figure
 * A lightweight graphical object. Figures are rendered to a {graphiti.Canvas} object.
 * 
 * @inheritable
 * @author Andreas Herz
 */
graphiti.Figure = Class.extend({
    
	NAME : "graphiti.Figure",
    
	MIN_TIMER_INTERVAL: 50, // minimum timer intervall in milli seconds
	
    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     */
    init: function( ) {
        this.id = graphiti.util.UUID.create();

        // for undo/redo operation. It holds the command during a drag/drop operation
        // and execute it on the CommandStack if the user drop the figure.
        this.command = null;
        
        this.canvas = null;
        this.shape  = null;
         
        // behavior flags
        //
        this.selectable = true;
        this.deleteable = true;
        this.resizeable = true;
        this.draggable = true;
        this.canSnapToHelper = true;
        this.snapToGridAnchor = new graphiti.geo.Point(0,0);   // hot spot for snap to grid  
        
        // time for animation or automatic update
        this.timerId = -1;
        this.timerInterval = 0;
        
        // model for the MVC pattern
        //
        this.model = null; 
 
        // possible parent of the figure. Can be a ComparmentFigure or, in a case of a Port,
        // a normal Figure.
        //
        this.parent = null;
        
        // appearance, position and dim properties
        //
        this.x = 0;
        this.y = 0;
        this.width  = this.getMinWidth();
        this.height = this.getMinHeight();
        this.alpha = 1.0;
        
        // status flags for the Drag&Drop operation handling
        //
        this.isInDragDrop =false;
        this.isMoving = false;
        this.originalAlpha = this.alpha;
        this.ox = 0;
        this.oy = 0;
         
        // listener for movement. required for Ports or property panes in the UI
        //
        this.moveListener = new graphiti.util.ArrayList();
    },
    
    /**
     * @method
     * Return the UUID of this element. 
     * 
     * @return {String}
     */
    getId: function(){
       return this.id; 
    },
    
    /**
     * @method
     * Set the id of this element. 
     * 
     * @param {String} id the new id for this figure
     */
    setId: function(id){
        this.id = id; 
    },
    
    /**
     * @method
     * Set the canvas element of this figures.
     * 
     * @param {graphiti.Canvas} canvas the new parent of the figure or null
     */
    setCanvas: function( canvas )
    {
      // remove the shape if we reset the canvas and the element
      // was already drawn
      if(canvas===null && this.shape!==null)
      {
         this.shape.remove();
         this.shape=null;
      }
     
      this.canvas = canvas;
      
      if(this.canvas!==null){
          this.getShapeElement();
      }

      if(canvas === null){
    	  this.stopTimer();
      }
      else{
    	  if(this.timerInterval>0){
              this.startTimer(this.timerInterval);
    	  }
      }
     },
    
     /**
      * @method
      * Start a timer which calles the onTimer method in the given interval.
      * 
      * @param {Number} milliSeconds
      */
     startTimer: function(milliSeconds){
    	 this.stopTimer();
    	 this.timerInterval = Math.max(this.MIN_TIMER_INTERVAL, milliSeconds);
    	 
    	 if(this.canvas!==null){
    		 this.timerId = window.setInterval($.proxy(this.onTimer,this), this.timerInterval);
    	 }
     },

     /**
      * @method
      * Stop the internal timer.
      * 
      */
     stopTimer: function(){
    	if(this.timerId>=0){
  		  window.clearInterval(this.timerId);
		  this.timerId=-1;
    	} 
     },

     /**
      * @method
      * Callback method for the internal timer handling<br>
      * Inherit classes must override this method if they want use the timer feature.
      * 
      * @template
      */
     onTimer: function(){
    	
     },
     
    /**
     * @method
     * Return the current assigned canvas container.
     * 
     * @return {graphiti.Canvas}
     */
    getCanvas:function()
    {
       return this.canvas;
    },
    

    /**
     * Set the primary model object that this Line represents. This method is used 
     * by an EditPartFactory when creating an Line.
     * 
     * @param {graphiti.mvc.AbstractObjectModel} model The model
     * @final
     */
    setModel:function( model)
    {
       if(this.model!==null){
          this.model.removePropertyChangeListener(this);
       }

       this.model = model;

       if(this.model!==null){
          this.model.addPropertyChangeListener(this);
       }
    },


    /**
     * Returns the primary model object that this Figure represents.
     * 
     * @type {graphiti.mvc.AbstractObjectModel}
     * @final
     */
    getModel:function()
    {
       return this.model;
    },


    /**
     * @method
     * Called by the MVC framework if any data on the related model has been changed. The figure
     * enfoces a repaint or only an update of the position related to type of event.
     * 
     * @private
     * @param {graphiti.mvc.Event} event
     */
    propertyChange:function( event)
    {
      switch(event.property)
      {
        case graphiti.mvc.Event.PROPERTY_CHANGED:
        	this.updateViewFromModel();
            this.repaint();
            break;
        case graphiti.mvc.Event.POSITION_CHANGED:
            this.setPosition(event.newValue.x,event.newValue.y);
            break;
        case graphiti.mvc.Event.CONNECTION_ADDED:
            this.refreshConnections();
            break;
        case graphiti.mvc.Event.CONNECTION_REMOVED:
            this.refreshConnections();
            break;
        default:
            break;
       }
    },

    /**
     * @method
     * return the current SVG shape element or create it on demand.
     * 
     * @final
     */
    getShapeElement:function()
    {
       if(this.shape!==null){
         return this.shape;
       }

      this.shape=this.createShapeElement();
      
      return this.shape;
    },


    /**
     * @method
     * Inherited classes must override this method to implement it's own draw functionality.
     * 
     * @template
     * @abstract
     */
    createShapeElement : function()
    {
        throw "Inherited class ["+this.type+"] must override the abstract method createShapeElement";
    },

    /**
     * @method
     * Template method to synch. the model into the view. Required if the MVC pattern is used.
     * 
     * @template
     */
    updateViewFromModel:function()
    {
    },

    /**
     * @method
     * propagate all attributes like color, stroke,... to the shape element
     * 
     **/
     repaint : function(attributes)
     {
         if (this.shape === null){
             return;
         }

         if(typeof attributes === "undefined" ){
             attributes = {};
         }

         // enrich with common properties
         attributes.opacity = this.alpha;
         
        this.shape.attr(attributes);
     },
     
     /**
      * @method
      * Highlight the element or remove the highlighting
      * 
      * @param {Boolean} flag indicates glow/noGlow
      * @template
      */
     setGlow: function(flag){
    	 // do nothing in the base class. 
    	 // Subclasses must implement this method.
     },
     
     
    /** 
     * @method
     * Create the draggable elements. Called by the framework of the element has been added to the 
     * Canvas.
     * 
     * @private
     **/
    createDraggable:function()
    {
		this._startDrag = $.proxy(function(dx, dy, event) {

			if (this.isSelectable()===true) {
				this.canvas.setCurrentSelection(this);
			}

			this.isInDragDrop = this.onDragStart();
		},this);
		
        this._moveDrag = $.proxy(function (dx, dy) 
        {
           if(this.isInDragDrop===false){
              return;
           }
   
           this.onDrag(dx,dy);
        },this);
        
        this._upDrag = $.proxy(function () 
        {
           if(this.isInDragDrop===false){
                return;
           }

           this.onDragEnd();
        },this);
        this.shape.drag(this._moveDrag, this._startDrag, this._upDrag);
        
        this.shape.hover(function (event) {
            this.onMouseEnter();
        }, function (event) {
            this.onMouseLeave();
        }, this, this);
    },
    

    /**
     * @method
     * Will be called if the drag and drop action beginns. You can return [false] if you
     * want avoid that the figure can be move.
     * 
     * @return {boolean} true if the figure accepts dragging
     **/
    onDragStart : function( )
    {
      this.isInDragDrop =false;
      this.isMoving = false;
      this.originalAlpha = this.getAlpha();

      this.command = this.createCommand(new graphiti.EditPolicy(graphiti.EditPolicy.MOVE));

      if(this.command!==null){
         this.ox = this.x;
         this.oy = this.y;
         this.isInDragDrop =true;
         return true;
      }
      
      return false;
    },

    /**
     * @method
     * Don't call them manually. This will be done by the framework.<br>
     * Will be called if the object are moved via drag and drop.
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>Figure.prototype.onDrag.call(this);</code>
     * @private
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     **/
    onDrag : function( dx,  dy)
    {
      this.x = this.ox+dx;
      this.y = this.oy+dy;

      // Adjust the new location if the object can snap to a helper
      // like grid, geometry, ruler,...
      //
      if(this.getCanSnapToHelper())
      {
        var p = new graphiti.geo.Point(this.x,this.y);
        p = this.getCanvas().snapToHelper(this, p);
        this.x = p.x;
        this.y = p.y;
      }

      this.setPosition(this.x, this.y);
      

      // enable the alpha blending of the first real move of the object
      //
      if(this.isMoving===false)
      {
       this.isMoving = true;
       this.setAlpha(this.originalAlpha*0.7);
      }
    },

    /**
     * @method
     * Will be called after a drag and drop action.<br>
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>this._super();</code>
     * 
     * @private
     **/
    onDragEnd : function()
    {
        /*
       if(this.getWorkflow().getEnableSmoothFigureHandling()==true)
       {
          var oFigure = this;
          var slowShow = function()
          {
             if(oFigure.alpha<1.0)
                oFigure.setAlpha(Math.min(1.0,oFigure.alpha+0.05));
             else
             {
                window.clearInterval(oFigure.timer);
                oFigure.timer = -1;
             }
          };
          if(oFigure.timer>0)
             window.clearInterval(oFigure.timer);
          oFigure.timer = window.setInterval(slowShow,20);
      }
      else*/
//      {
          this.setAlpha(this.originalAlpha);
  //    }
  
      // Element ist zwar schon an seine Position, das Command muss aber trotzdem
      // in dem CommandStack gelegt werden damit das Undo funktioniert.
      //
      this.command.setPosition(this.x, this.y);
      this.isInDragDrop = false;

      this.canvas.commandStack.execute(this.command);
      this.command = null;
      this.isMoving = false;
      this.fireMoveEvent();
    },

    /**
     * @method
     * Called by the framework during drag&drop operations.
     * 
     * @param {graphiti.Figure} figure The figure which is currently dragging
     * 
     * @return {Boolean} true if this port accepts the dragging port for a drop operation
     * @template
     **/
    onDragEnter : function( draggedFigure )
    {
    	return false;
    },
 
    /**
     * @method
     * Called if the DragDrop object leaving the current hover figure.
     * 
     * @param {graphiti.Figure} figure The figure which is currently dragging
     * @template
     **/
    onDragLeave:function( draggedFigure )
    {
    },

    
    /**
     * @method
     * Called if the user drop this element onto the dropTarget
     * 
     * @param {graphiti.Figure} dropTarget The drop target.
     * @private
     **/
    onDrop:function(dropTarget)
    {
    },
   

    /**
     * @method
     * Callback method for the mouse enter event. Usefull for mouse hover-effects.
     * Override this method for yourown effects. Don't call them manually.
     *
     * @template
     **/
    onMouseEnter:function()
    {
    },
    
    
    /**
     * @method
     * Callback method for the mouse leave event. Usefull for mouse hover-effects.
     * 
     * @template
     **/
    onMouseLeave:function()
    {
    },

    /**
     * @method
     * Called when a user dbl clicks on the element
     * 
     * @template
     */
    onDoubleClick: function(){
    },
    
    
    /**
     * @method
     * Set the alpha blending of this figure. 
     *
     * @template
     * @param {Number} percent Value between [0..1].
     **/
    setAlpha:function( percent)
    {
      if(percent===this.alpha){
         return;
      }

      this.alpha = percent;
      this.repaint();
    },

        
    /**
     * @method Return the alpha blending of the figure
     * @return {Number}
     */
    getAlpha : function()
    {
        return this.alpha;
    },
    
    /**
     * @method
     * Return true if the figure visible and part of the canvas.
     * 
     * @return {Boolean}
     */
    isVisible: function(){
        return this.shape!==null;
    },
    
    /**
     * @method
     * Set the flag if this object can snap to grid or geometry.
     * A window of dialog should set this flag to false.
     * 
     * @param {boolean} flag The snap to grid/geometry enable flag.
     *
     **/
    setCanSnapToHelper:function(/*:boolean */flag)
    {
      this.canSnapToHelper = flag;
    },

    /**
     * @method
     * Returns true if the figure can snap to any helper like a grid, guide, geometrie
     * or something else.
     *
     * @return {boolean}
     **/
    getCanSnapToHelper:function()
    {
      return this.canSnapToHelper;
    },

    /**
     *
     * @return {graphiti.geo.Point}
     **/
    getSnapToGridAnchor:function()
    {
      return this.snapToGridAnchor;
    },

    /**
     * @method
     * Set the hot spot for all snapTo### operations.
     * 
     * @param {graphiti.geo.Point} point
     **/
    setSnapToGridAnchor:function(point)
    {
      this.snapToGridAnchor = point;
    },

    /**
     * @method
     * The current width of the figure.
     * 
     * @type {Number}
     **/
    getWidth:function()
    {
      return this.width;
    },

    /**
     * @method 
     * The current height of the figure.
     * 
     * @type {Number}
     **/
    getHeight:function()
    {
      return this.height;
    },


    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. width of this object.
     */
    getMinWidth:function()
    {
      return 5;
    },

    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. height of this object.
     */
    getMinHeight:function()
    {
      return 5;
    },

    /**
     * @method
     * The x-offset related to the parent figure or canvas.
     * 
     * @return {Number} the x-offset to the parent figure
     **/
    getX :function()
    {
        return this.x;
    },

    /**
     * @method
     * The y-offset related to the parent figure or canvas.
     * 
     * @return {Number} The y-offset to the parent figure.
     **/
    getY :function()
    {
        return this.y;
    },

    
    /**
     * @method
     * The x-offset related to the canvas.
     * 
     * @return {Number} the x-offset to the parent figure
     **/
    getAbsoluteX :function()
    {
        if(this.parent===null){
            return this.x;
        }
        return this.x + this.parent.getAbsoluteX();  
    },


    /**
     * @method
     * The y-offset related to the canvas.
     * 
     * @return {Number} The y-offset to the parent figure.
     **/
    getAbsoluteY :function()
    {
        if(this.parent ===null){
            return this.y;
        }
        return this.y + this.parent.getAbsoluteY();  
    },


    
    /**
     * @method
     * Returns the absolute y-position of the port.
     *
     * @type {graphiti.geo.Point}
     **/
    getAbsolutePosition:function()
    {
      return new graphiti.geo.Point(this.getAbsoluteX(), this.getAbsoluteY());
    },
    
    /**
     * @method
     * Returns the absolute y-position of the port.
     *
     * @return {graphiti.geo.Rectangle}
     **/
    getAbsoluteBounds:function()
    {
      return new graphiti.geo.Rectangle(this.getAbsoluteX(), this.getAbsoluteY(),this.getWidth(),this.getHeight());
    },
    

    /**
     * @method
     * Set the position of the object.
     *
     * @param {Number} x The new x coordinate of the figure
     * @param {Number} y The new y coordinate of the figure 
     **/
    setPosition:function(x , y )
    {
      this.x= x;
      this.y= y;

      this.repaint();

      // Update the resize handles if the user change the position of the element via an API call.
      //
      if(this.canvas!==null && this.canvas.getCurrentSelection()===this){
         this.canvas.moveResizeHandles(this);
      }
      this.fireMoveEvent();
    },
    
    /**
     * @method
     * Translate the figure with the given x/y offset.
     *
     * @param {Number} dx The new x translate offset
     * @param {Number} dy The new y translate offset
     **/
    translate:function(dx , dy )
    {
    	this.setPosition(this.x+dx,this.y+dy);
    },
    
    
    /**
     * @method
     * Set the new width and height of the figure. 
     *
     * @param {Number} w The new width of the figure
     * @param {Number} h The new height of the figure
     **/
    setDimension:function(w, h)
    {
      this.width = Math.max(this.getMinWidth(),w);
      this.height= Math.max(this.getMinHeight(),h);
      
      this.repaint();
      
      this.fireMoveEvent();

      // Update the resize handles if the user change the dimension via an API call
      //
      if(this.canvas!==null && this.canvas.getCurrentSelection()===this)  {
         this.canvas.moveResizeHandles(this);
      }
    },


    /**
     * @method
     * Return the bounding box of the figure in absolute position to the canvas.
     * 
     * @return {graphiti.geo.Rectangle}
     **/
    getBoundingBox:function()
    {
      return new graphiti.geo.Rectangle(this.getAbsoluteX(),this.getAbsoluteY(),this.getWidth(),this.getHeight());
    },

    /**
     * @method
     * Detect whenever the hands over coordinate is inside the figure.
     *
     * @param {Number} iX
     * @param {Number} iY
     * @returns {Boolean}
     */
    hitTest : function ( iX , iY)
    {
        var x = this.getAbsoluteX();
        var y = this.getAbsoluteY();
        var iX2 = x + this.getWidth();
        var iY2 = y + this.getHeight();
        return (iX >= x && iX <= iX2 && iY >= y && iY <= iY2);
    },


    /**
     * @method
     * Switch on/off the drag drop behaviour of this object
     *
     * @param {Boolean} flag The new drag drop indicator
     **/
    setDraggable:function(flag)
    {
      this.draggable= flag;
    },

    /**
     * @method
     * Get the Drag drop enable flag
     *
     * @return {boolean} The new drag drop indicator
     **/
    isDraggable:function()
    {
      return this.draggable;
    },


    /**
     * @method
     * Returns the true if the figure can be resized.
     *
     * @return {boolean}
     **/
    isResizeable:function()
    {
      return this.resizeable;
    },

    /**
     * @method
     * You can change the resizeable behaviour of this object. Hands over [false] and
     * the figure has no resizehandles if you select them with the mouse.<br>
     *
     * @param {boolean} flag The resizeable flag.
     **/
    setResizeable:function(flag)
    {
      this.resizeable=flag;
    },

    /**
     * @method
     * Indicates whenever the element is selectable by user interaction or API.
     * 
     * @return {boolean}
     **/
    isSelectable:function()
    {
      return this.selectable;
    },


    /**
     * @method
     * You can change the selectable behavior of this object. Hands over [false] and
     * the figure has no selection handles if you try to select them with the mouse.<br>
     *
     * @param {boolean} flag The selectable flag.
     **/
    setSelectable:function(flag)
    {
      this.selectable=flag;
    },

    /**
     * @method
     * Return true if the object doesn't care about the aspect ratio.
     * You can change the height and width independent.
     * 
     * @return {boolean}
     */
    isStrechable:function()
    {
      return true;
    },

    /**
     * @method
     * Return false if you avoid that the user can delete your figure.
     * Sub class can override this method.
     * 
     * @return {boolean}
     **/
    isDeleteable:function()
    {
      return this.deleteable;
    },

    /**
     * @method
     * Return false if you avoid that the user can delete your figure.
     * 
     * @param {boolean} flag Enable or disable flag for the delete operation
     **/
    setDeleteable:function(flag)
    {
      this.deleteable = flag;
    },

    /**
     * @method
     * Set the parent of this figure.
     * Don't call them manually. Is CompartmentFigre.appendChild() instead.

     * @param {graphiti.CompartmentFigure} parent The new parent of this figure
     * @private
     **/
    setParent:function( parent)
    {
      this.parent = parent;
    },

    /**
     * @method
     * Get the parent of this figure.
     *
     * @return {graphiti.CompartmentFigure}
     **/
    getParent:function()
    {
      return this.parent;
    },

    /**
     * @method
     * Register the hands over object as a moveListener of this figure.<br>
     * All position changes will be broadcast to all move listener. This is
     * useful for Connectors and Layouter for router handling.
     *
     * @param {Object} listener the listener to call
     *
     **/
     attachMoveListener:function(listener) {
		if (listener === null) {
			return;
		}

		this.moveListener.add(listener);
 	 },
 

    /**
     * @method
     * Remove the hands over figure from notification queue.
     *
     * @param {graphiti.Figure} figure The figure to remove the monitor
     *
     **/
    detachMoveListener:function(figure) 
    {
      if(figure===null || this.moveListener===null){
        return;
      }

      this.moveListener.remove(figure);
    },

    /**
     * @method
     * Called from the figure itself when any position changes happens. All listener
     * will be informed.
     * 
     * @private
     **/
    fireMoveEvent: function()
    {
      this.setDocumentDirty();
      var size= this.moveListener.getSize();
      for(var i=0;i<size;i++)
      {
        this.moveListener.get(i).onOtherFigureMoved(this);
      }
    },
    
    /**
     * @method
     * Fired if a figure has been moved. This object receives only this event if it has registered 
     * before.
     *
     * @param {graphiti.Figure} figure The figure which has changed its position
     * @template
     */
    onOtherFigureMoved:function(figure)
    {
    },

    /**
     * @method
     * This method will be called if the figure has changed any position, color, dimension or something else.
     *
     * @private
     **/
    setDocumentDirty:function()
    {
      if(this.canvas!==null){
        this.canvas.setDocumentDirty();
      }
    },

    /**
     * @method
     * Returns the Command to perform the specified Request or null.
      *
     * @param {graphiti.EditPolicy} request describes the Command being requested
     * @return {graphiti.command.Command} null or a Command
     **/
    createCommand:function( request)
    {
      if(request===null)
          return null;
      
      if(request.getPolicy() === graphiti.EditPolicy.MOVE)
      {
        if(!this.isDraggable()){
          return null;
        }
        return new graphiti.command.CommandMove(this);
      }

      if(request.getPolicy() === graphiti.EditPolicy.DELETE)
      {
        if(!this.isDeleteable()){
           return null;
        }
        return new graphiti.command.CommandDelete(this);
      }
      
      if(request.getPolicy() === graphiti.EditPolicy.RESIZE)
      {
        if(!this.isResizeable()){
           return null;
        }
        return new graphiti.command.CommandResize(this);
      }
      
      return null;
    },
    
    
    /**
     * @method 
     * Return an objects with all important attributes for XML or JSON serialization
     * 
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        return {
            type  : this.NAME,
            id    : this.id,
            x     : this.x,
            y     : this.y,
            width : this.width,
            height: this.height           
        };
    }

});

