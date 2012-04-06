/**
 * @class graphiti.Figure
 * The base class for all visible elements inside a canvas.
 * 
 * @inheritable
 * @author Andreas Herz
 * @since 2.1
 */
graphiti.Figure = Class.extend({

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     */
    init: function( ) {
        this.canvas = null;
        this.shape  = null;
         
        this.selectable = true;
        this.deleteable = true;
        this.resizeable = true;
        this.draggable = true;
        this.isMoving = false;
        
        this.parent = null;
        
        this.x = 0;
        this.y = 0;
        this.width = this.getMinWidth();
        this.height = this.getMinHeight();
        
        this.canSnapToHelper = true;
        this.snapToGridAnchor = new graphiti.geo.Point(0,0);
       
        this.moveListener = new graphiti.util.ArrayList();
    },
    
    /**
     * @method
     * Set the canvas element of this figures.
     * 
     * @param {graphiti.Canvas} canvas the new parent of the figure or null
     */
    setCanvas: function( canvas )
    {
      if(canvas===null && this.shape!==null)
      {
         this.shape.remove();
         this.shape=null;
      }
      this.canvas = canvas;
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
     * @method
     * return the current SVG shape element or create it on demand.
     * 
     * @final
     */
    getShapeElement:function()
    {
       if(this.shape!==null)
         return this.shape;

      return this.shape=this.createShapeElement();
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
     * Create the draggable elements. Called by the framework of the element has been added to the 
     * Canvas.
     * 
     * @private
     **/
    createDraggable:function()
    {
        this._startDrag = function (x,y,event) 
        {
           jQuery.Event(event).stopPropagation();
           
           this.canvas.showMenu(null);
    
           var line = this.canvas.getBestLine(this.x+x, y+this.y);
           if(line!==null)
           {
             w.setCurrentSelection(line);
             w.showLineResizeHandles(line);
             w.onMouseDown(oThis.x+oEvent.x, oEvent.y+oThis.y);
             return;
           }
           
           if(this.isSelectable())
           {
             this.canvas.showResizeHandles(this);
             this.canvas.setCurrentSelection(this);
           }
    
           if(!this.isDraggable())
             return;

           this.ox = this.x;
           this.oy = this.y;
    
           this._allowDragDrop = this.onDragstart(x,y);
        };
        this._moveDrag = function (dx, dy) 
        {
           if(this.isSelectable()===false)
             return;
           
           if(this.isDraggable()===false)
             return;
    
           if(this._allowDragDrop===false)
             return;
             
           this.onDrag(dx,dy);
        };
        this._upDrag = function () 
        {
           if(!this.isDraggable())
             return;
    
           if(this._allowDragDrop===false)
             return;
    
            this.onDragend();
        };
        this.shape.drag(this._moveDrag, this._startDrag, this._upDrag,this,this,this);
    },
    

    /**
     * @method
     * Don't call them manually. This will be done by the framework.<br>
     * Will be called if the object are moved via drag and drop.
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>Figure.prototype.onDrag.call(this);</code>
     * @private
     * @param {Number} dx 
     * @param {Number} dy
     **/
    onDrag : function( dx,  dy)
    {
      this.x = this.ox+dx;
      this.y = this.oy+dy;

      // Adjust the new location if the object can snap to a helper
      // like grid, geometry, ruler,...
      //
      /*
      if(this.getCanSnapToHelper())
      {
        var p = new graphiti.geo.Point(this.x,this.y);
        p = this.getWorkflow().snapToHelper(this, p);
        this.x = p.x;
        this.y = p.y;
      }
      */
      this.setPosition(this.x, this.y);
      
      // enable the alpha blending of the first real move of the object
      //
      if(this.isMoving==false)
      {
       this.isMoving = true;
       this.setAlpha(0.5);
      }
      this.fireMoveEvent();
    },


    /**
     * @method
     * Will be called if the drag and drop action beginns. You can return [false] if you
     * want avoid that the figure can be move.
     * 
     * @param {Number} x the x-coordinate of the click event
     * @param {Number} y the y-coordinate of the click event
     * @return {boolean}
     **/
    onDragstart : function( x, y)
    {
      this.command = this.createCommand(new graphiti.EditPolicy(graphiti.EditPolicy.MOVE));
      return this.command!=null;
    },

    /**
     * @method
     * Will be called after a drag and drop action.<br>
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>this._super();</code>
     * 
     * @private
     **/
    onDragend : function()
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
      {
          this.setAlpha(1.0);
      }
      // Element ist zwar schon an seine Position, das Command muss aber trotzdem
      // in dem CommandStack gelegt werden damit das Undo funktioniert.
      //
      this.command.setPosition(this.x, this.y);
 //     this.canvas.commandStack.execute(this.command);
      this.command = null;
      this.isMoving = false;
 //     this.canvas.hideSnapToHelperLines();
      this.fireMoveEvent();
    },

    /**
     * @method
     * propagate all attributes like color, stroke,... to the shape element
     **/
    repaint: function()
    {
    },

    /**
     * @method
     * Set the alpha blending of this figure. 
     *
     * @template
     * @abstract
     * @param {Number} percent Value between [0..1].
     **/
    setAlpha:function( percent)
    {
    },


    /**
     * Set the flag if this object can snap to grid or geometry.
     * A window of dialog should set this flag to false.
     * @param {boolean} flag The snap to grid/geometry enable flag.
     *
     **/
    setCanSnapToHelper:function(/*:boolean */flag)
    {
      this.canSnapToHelper = flag;
    },

    /**
     * Returns true if the figure cna snap to any helper like a grid, guide, geometrie
     * or something else.
     *
     * @type boolean
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
     * The x-offset related to the parent figure or cnavas.
     * 
     * @return {Number} the x-offset to the parent figure
     **/
    getX :function()
    {
        return this.x;
    },


    /**
     * @return The Y coordinate in relation the Canvas.
     **/
    getAbsoluteY:function()
    {
      return this.y;
    },

    /**
     * @return The X coordinate in relation to the canvas
     **/
    getAbsoluteX:function()
    {
      return this.x;
    },

    /**
     * @method
     * Set the position of the object.
     *
     * @param {Number} xPos The new x coordinate of the figure
     * @param {Number} yPos The new y coordinate of the figure 
     **/
    setPosition:function(xPos , yPos )
    {
      this.x= xPos;
      this.y= yPos;

      this.repaint();

      // Update the resize handles if the user change the position of the element via an API call.
      //
      if(this.canvas!==null && this.canvas.getCurrentSelection()===this)
         this.canvas.moveResizeHandles(this);
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
      if(this.canvas!=null && this.canvas.getCurrentSelection()==this)  {
         this.canvas.moveResizeHandles(this);
      }
    },


    /**
     * @method
     * Detect whenever the handsover coordinate is inside the figure.
     * 
     * @param {Number} iX
     * @param {Number} iY
     * @returns {Boolean}
     */
    isOver : function ( iX , iY)
    {
        var x = this.getAbsoluteX();
        var y = this.getAbsoluteY();
        var iX2 = x + this.getWidth();
        var iY2 = y + this.getHeight();
        return (iX >= x && iX <= iX2 && iY >= y && iY <= iY2);
    },

    /**
     * @method
     * Returns the z-index of the element.
     * @return {Number} 
     **/
    getZOrder:function()
    {
    // TODO
//        return this.html.style.zIndex;
      return 1;
    },

    /**
     * @method
     * Change the z-order of the element.
     * @param {Number} index Set the new z-index of the element
     **/
    setZOrder:function( index)
    {
    // TODO
//        this.html.style.zIndex=index;
    },

    /**
     * @method
     * Switch on/off the drag drop behaviour of this object
     *
     * @param {Boolean} flag The new drag drop indicator
     **/
    setDraggable:function(/*:boolean*/flag)
    {
      this.draggable= flag;
    },

    /**
     * @method
     * Get the Drag drop enable flag
     *
     * @type boolean The new drag drop indicator
     **/
    isDraggable:function()
    {
      return this.draggable;
    },


    /**
     * @method
     * Returns the true if the figure can be resized.
     *
     * @see #setResizeable
     * @type boolean
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
     * @see #getResizeable
     * @param {boolean} flag The resizeable flag.
     **/
    setResizeable:function(/*:boolean*/ flag)
    {
      this.resizeable=flag;
    },

    /**
     * @method
     * Indicates whenever the element is selectable by user interaction or API.
     * @type boolean
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
    setSelectable:function(/*:boolean*/ flag)
    {
      this.selectable=flag;
    },

    /**
     * @method
     * Return true if the object doesn't care about the aspect ratio.
     * You can change the height and width independent.
     * @type boolean
     */
    isStrechable:function()
    {
      return true;
    },

    /**
     * @method
     * Return false if you avoid that the user can delete your figure.
     * Sub class can override this method.
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
     * @param {graphiti.Figure} figure The figure to monitor
     *
     **/
    attachMoveListener : function( figure)
    {
      if(figure==null || this.moveListener==null)
        return;

      this.moveListener.add(figure);
    },


    /**
     * @method
     * @param {graphiti.Figure} figure The figure to remove the monitor
     *
     **/
    detachMoveListener : function(/*:@NAMESPACE@Figure*/ figure) 
    {
      if(figure==null || this.moveListener==null)
        return;

      this.moveListener.remove(figure);
    },

    /**
     * @method
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
     * @private
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
      if(this.canvas!=null)
        this.canvas.setDocumentDirty();
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
      if(request.getPolicy() == graphiti.EditPolicy.MOVE)
      {
        if(!this.isDraggable())
          return null;
        return new graphiti.command.CommandMove(this);
      }

      if(request.getPolicy() == graphiti.EditPolicy.DELETE)
      {
        if(!this.isDeleteable())
           return null;
        return new graphiti.command.CommandDelete(this);
      }
      
      if(request.getPolicy() == graphiti.EditPolicy.RESIZE)
      {
        if(!this.isResizeable())
           return null;
        return new graphiti.command.CommandResize(this);
      }
      
      return null;
    },
    
    /**
     * @method
     * Called when a user clicks on the element
     * @template
     */
    onClick: function(){
        
    }
});

