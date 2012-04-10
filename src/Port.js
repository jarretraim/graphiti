/**
 * @class graphiti.Port
 * A Port is the anchor for a {@link graphiti.Connection}. A {@link graphiti.Connection} must have a start and a end Port.
 * 
 * @author Andreas Herz
 * @constructor
 */
      
graphiti.Port = graphiti.Circle.extend({

    /**
     * @constructor
     * Creates a new Node element which are not assigned to any canvas.
     * 
     */
    init : function()
    {
        this._super();
        
        // Inner Class for the port corona. Why?! The runtime increment the alpha value from 0-1 if you add
        // an element to the canvas if you have set workflow.setSmoothFigureHandling(true). But the corona should have max. alpha=0.3.
        //

        this.hideIfConnected = false;

        this.parentNode = null;
        this.relativOrigin = new graphiti.geo.Point(0, 0); // the fix point of the port relative to its parent.
        this.coronaWidth = 10; // the corona width for the isOver method. Usefull during drag&drop of ports. Better SnapTo behaviour.
        this.corona = null; // Circle
        this.currentTarget = null; // Port

        this.setDimension(8, 8);
        this.setBackgroundColor(new graphiti.util.Color(100, 180, 100));
        this.setColor(new graphiti.util.Color(90, 150, 90));
    },
    
    /** 
     * @private
     **/
    createDraggable:function()
    {
        this._startDrag = function (x,y,event) 
        {
           $.Event(event).stopPropagation();
           this.canvas.showMenu(null);
               
          this.originalSnapToGrid = this.parentNode.getCanvas().getSnapToGrid();
          this.originalSnapToGeometry = this.parentNode.getCanvas().getSnapToGeometry();
          this.parentNode.getCanvas().setSnapToGrid(false);
          this.parentNode.getCanvas().setSnapToGeometry(false);
        
          this.ox = this.x;
          this.oy = this.y;
          this.getShapeElement().toFront();
          this.onDragstart(x,y);
        };
        
        this._moveDrag=function (dx, dy) 
        {
           this.onDrag(dx,dy);
           var target=this.getDropTarget(this.x,this.y);
           if(target!==null && this.currentTarget===null)
           {
             target.onDragEnter(this);
           }
           else if(target===null && this.currentTarget!==null)
           {
             this.currentTarget.onDragLeave(this);
           }
           else if(target!==this.currentTarget && this.currentTarget!==null)
           {
             this.currentTarget.onDragLeave(this);
           }
           this.currentTarget=target;         
        };
        
        this._upDrag = function () 
        { 
          this.parentNode.getCanvas().setSnapToGrid(this.originalSnapToGrid );
          this.parentNode.getCanvas().setSnapToGeometry( this.originalSnapToGeometry );
        
          this.onDragend();
          if(this.currentTarget!==null)
          {
             this.onDrop(this.currentTarget);
             this.currentTarget.onDragLeave(this);
             this.currentTarget=null;
          }
        };
        this.shape.drag(this._moveDrag, this._startDrag, this._upDrag,this,this,this);
        this.shape.hover(function (event) {
            this.onMouseEnter();
        }, function (event) {
            this.onMouseLeave();
        }, this, this);
     },
    
     repaint:function(attributes){
         if(typeof attributes === "undefined")
             attributes= {};
         
         // a port did have the 0/0 coordinate i the center and not in the top/left corner
         //
         attributes.cx = this.x ;
         attributes.cy = this.y;
         
         this._super(attributes);
     },
     
    /**
     * Hide the port if a connector has been attach to this.
     * The port doesn't change the functonality. You can drag&drop the port. 
     * It hide's only the UI Representation!
     **/
    setHideIfConnected:function(/*:boolean*/ flag)
    {
      this.hideIfConnected = flag;
    },
    
    /**
     * @method
     * Callback method for the mouse enter event. Usefull for mouse hover-effects.
     * Override this method for yourown effects. Don't call them manually.
     *
     * @private
     **/
    onMouseEnter:function()
    {
        this.setLineWidth(2);
    },
    
    
    /**
     * @method
     * Callback method for the mouse leave event. Usefull for mouse hover-effects.
     * 
     * @private
     **/
    onMouseLeave:function()
    {
        this.setLineWidth(0);
    },
    
    
    /**
     * method
     * Set the dimension of this port.
     *
     * @param {Number} width The new width of the object
     * @param {Number} heightThe new height of the object
     **/
    setDimension:function(width, height)
    {
      this._super(width, height);

      // adjust the position
 //     this.setPosition(this.x, this.y);
    },
    


    /**
     * @method
     * Returns a array of <code>graphiti.Connection</code> of all related connections to this port.
     *
     * @type graphiti.util.ArrayList
     **/
    getConnections:function()
    {
      var result = new graphiti.util.ArrayList();
    
      // Return all Connections which are bounded to this port
      // In this case this are all movement listener
    
      var size= this.moveListener.getSize();
      for(var i=0;i<size;i++)
      {
        var target = this.moveListener.get(i);
        if(target instanceof graphiti.Connection)
           result.add(target);
      }
      return result;
    },
    
    
    /**
     * @method
     * Set the parentNode of this port.
     * Call {@link graphiti.Node.addPort} if you want to a port to node. Don't call this method directly.
     *
     * @private
     */
    setParent:function(parentNode)
    {
      if(this.parentNode!==null)
        this.parentNode.detachMoveListener(this);
    
      this.parentNode = parentNode;
      if(this.parentNode!==null)
      {
        this.parentNode.attachMoveListener(this);
      }
    },
    

    attachMoveListener : function(figure)
    {
        this._super(figure);
//        if (this.hideIfConnected == true)
//            this.setUiRepresentation(this.connectedUIRepresentation);
    },

    detachMoveListener : function(figure)
    {
        this._super(figure);
//        if (this.getConnections().getSize() == 0)
//            this.setUiRepresentation(this.disconnectedUIRepresentation);
    },
    
    
    /**
     * @method
     * Return the parentNode {@link graphiti.Node} of this port.
     * 
     * @return {graphiti.Node}
     **/
    getParent:function()
    {
      return this.parentNode;
    },
    
    
    /**
     * @method
     * Returns the corona width of the Port. The corona width will be used during the
     * drag&drop of a port.
     *
     * @return {Number}
     **/
    getCoronaWidth:function()
    {
       return this.coronaWidth;
    },
    
    
    /**
     * @method
     * Set the corona width of the Port. The corona width will be used during the
     * drag&drop of a port. You can drop a port in the corona of this port to create
     * a connection. It is not neccessary to drop exactly on the port.
     *
     * @param {Number} width The new corona width of the port
     **/
    setCoronaWidth:function( width)
    {
       this.coronaWidth = width;
    },
    
    /**
     * @method
     * Will be called if the drag and drop action begins. You can return [false] if you
     * want avoid that the figure can be move.
     * 
     * @param {int} x the x-coordinate of the click event
     * @param {int} y the y-coordinate of the click event
     * @return {boolean}
     **/
    onDragstart:function(x, y)
    {
      return true;
    },
    
    /**
     * @private
     **/
    onDrag:function(/*:int*/ dx, /*:int*/ dy)
    {
      this._super( dx, dy);
    
    //  this.parentNode.canvas.showConnectionLine(this.getX(), this.getAbsoluteY(),this.relativOrigin.getX()+this.parentNode.getX(), this.relativOrigin.getY()+this.parentNode.getY());
      this.parentNode.getCanvas().showConnectionLine(this.x, this.y, this.getAbsoluteX(), this.getAbsoluteY());
    },
    
    
    /**
     * @private
     **/
    onDragend:function()
    {
      // Don't call the parent implementation. This will create an CommandMove object
      // and store them o the CommandStack for the undo operation. This makes no sense for a
      // port.
      // graphiti.Rectangle.prototype.onDragend.call(this); DON'T call the super implementation!!!
    
      this.setAlpha(1.0);
    
      // 1.) Restore the old Position of the node
      //
      this.setPosition(this.getAbsoluteX(), this.getAbsoluteY());
    
      // 2.) Remove the bounding line from the canvas
      //
      this.parentNode.getCanvas().hideConnectionLine();
    },
    
    /**
     * @param {graphiti.Port} port The port under the current drag object
     * @private
     **/
    onDragEnter:function(/*:graphiti.Port*/ port)
    {
      // Create a CONNECT Command to determine if we can show a Corona. Only valid
      // dropTarget did have a corona
      var request = new graphiti.EditPolicy(graphiti.EditPolicy.CONNECT);
      request.canvas = this.parentNode.workflow;
      request.source = port;
      request.target = this;
      var command = this.createCommand(request);
      if(command===null)
        return;
    
      this.parentNode.getCanvas().connectionLine.setColor(new  graphiti.util.Color(0,150,0));
      this.parentNode.getCanvas().connectionLine.setLineWidth(3);
      this.showCorona(true);
    },
    
    /**
     * @param {graphiti.Port} port The port which we leave with the drag object.
     * @private
     **/
    onDragLeave:function(/*:graphiti.Port*/ port)
    {
      this.parentNode.getCanvas().connectionLine.setColor(new  graphiti.util.Color(0,0,0));
      this.parentNode.getCanvas().connectionLine.setLineWidth(1);
      this.showCorona(false);
    },
    
    /**
     * @param {graphiti.Port} port The drop target.
     * @private
     **/
    onDrop:function(/*:graphiti.Port*/ port)
    {
        var request = new graphiti.EditPolicy(graphiti.EditPolicy.CONNECT);
        request.canvas = this.parentNode.getCanvas();
        request.source = port;
        request.target = this;
        var command = this.createCommand(request);
        if(command !==null)
           this.parentNode.getCanvas().getCommandStack().execute(command);
    },
   
    setOrigin:function(/*:int*/ xPos, /*:int*/ yPos)
    {
      // The origin must be set before the base class will be called.
      // Reason: The base class fires a onFigureMoved event. And the listener needs sometimes
      //         the originX/originY coordinates. (e.g. Port and Connection).
      this.relativOrigin=new graphiti.geo.Point(xPos,yPos); // the fix point of the point.
    },
    
    
    /**
     * @method
     * Return the origin relativ to the parent of the port.
     * 
     * @returns {graphiti.geo.Point}
     */
    getOrigin:function()
    {
      // The origin must be set before the base class will be called.
      // Reason: The base class fires a onFigureMoved event. And the listener needs sometimes
      //         the originX/originY coordinates. (e.g. Port and Connection).
      return this.relativOrigin;
    },

    
    /**
     * Returns the absolute y-position of the port.
     *
     * @type graphiti.geo.Point
     **/
    getAbsolutePosition:function()
    {
      return new graphiti.geo.Point(this.getAbsoluteX(), this.getAbsoluteY());
    },
    
    /**
     * Returns the absolute y-position of the port.
     *
     * @type graphiti.geo.Dimension
     **/
    getAbsoluteBounds:function()
    {
      return new graphiti.geo.Dimension(this.getAbsoluteX(), this.getAbsoluteY(),this.getWidth(),this.getHeight());
    },
    
    
    /**
     * Returns the absolute x-position of the port. NOT the DragDrop position of the
     * point. It is the fix point.
     *
     * @type int 
     **/
    getAbsoluteX:function()
    {
      return this.relativOrigin.getX()+this.parentNode.getX();
    },
    
    /**
     * Returns the absolute y-position of the port.NOT the DragDrop position of the
     * point. It is the fix point.
     *
     * @type int
     **/
    getAbsoluteY:function()
    {
      return this.relativOrigin.getY()+this.parentNode.getY();
    },
    
    
    /**
     * Callback method of the movemoent of a figure
     * @see graphiti.Figure#attachMoveListener
     * @param {graphiti.Figure} figure The figure which has been moved
     **/
    onOtherFigureMoved:function(/*:graphiti.Figure*/ figure)
    {
      this.setPosition(this.relativOrigin.getX()+figure.getX(),this.relativOrigin.getY()+figure.getY());
      // Falls sich der parentNode bewegt hat, dann muss der Port dies seinen
      // Connections mitteilen
      this.fireMoveEvent();
    },
    
    /**
     * Return the name of this port.
     *
     * @see graphiti.Node#getPort
     * @type String
     **/
    getName:function()
    {
      return this.name;
    },
    
    /**
     * Set the name of this port.
     *
     * @see graphiti.Node#getPort
     * @param {String} name The new name of this port.
     **/
    setName:function(/*:String*/ name)
    {
      this.name=name;
    },
    
    isOver:function (/*:int*/ iX ,/*:int*/ iY)
    {
        var x = this.getAbsoluteX()-this.coronaWidth-this.getWidth()/2;
        var y = this.getAbsoluteY()-this.coronaWidth-this.getHeight()/2;
        var iX2 = x + this.width + (this.coronaWidth*2)+this.getWidth()/2;
        var iY2 = y + this.height + (this.coronaWidth*2)+this.getHeight()/2;
        return (iX >= x && iX <= iX2 && iY >= y && iY <= iY2);
    },
    
    /**
     *
     * @private
     */
    showCorona:function (/*:boolean*/ flag, /*:float*/ diameter)
    {
      if(flag===true)
      {
       this.corona = new graphiti.Corona();
       this.corona.setAlpha(0.3);
       this.corona.setBackgroundColor(new  graphiti.util.Color(0,125,125));
       this.corona.setColor(null);
       this.corona.setDimension(this.getWidth()+(this.getCoronaWidth()*2),this.getWidth()+(this.getCoronaWidth()*2));
       this.parentNode.getCanvas().addFigure(this.corona,this.getAbsoluteX()-this.getCoronaWidth()-this.getWidth()/2, this.getAbsoluteY()-this.getCoronaWidth()-this.getHeight()/2);
      }
      else if(flag===false && this.corona!==null)
      {
       this.parentNode.getCanvas().removeFigure(this.corona);
       this.corona = null;
      }
    },
    
    /**
     * Returns the Command to perform the specified Request or null.<br>
     * Inherited figures can override this method to return their own implementation
     * of the request.<br>
     *
     * @param {graphiti.EditPolicy} request describes the Command being requested
     * @return null or a graphiti.Command
     * @type graphiti.Command 
     **/
    createCommand:function(/*:graphiti.EditPolicy*/ request)
    {
       // the port has its own implementation of the CommandMove
       //
       if(request.getPolicy() ===graphiti.EditPolicy.MOVE)
       {
         if(!this.canDrag)
            return null;
         return new graphiti.command.CommandMovePort(this);
       }
       // Connect request between two ports
       //
       if(request.getPolicy() ===graphiti.EditPolicy.CONNECT)
       {
         if(request.source.parentNode.id === request.target.parentNode.id)
            return null;
         else
            return new graphiti.command.CommandConnect(request.canvas,request.source,request.target);
       }
    
       return null;
    },
    
    getDropTarget: function (/*:int*/ x ,/*:int*/  y )
    {
      for(var i=0;i<this.targets.getSize();i++)
      {
        var target = this.targets.get(i);
        if (target.isOver(x, y) && target!==this)
        {
            return target;
        }
      }
      return null;
    }
});


graphiti.Corona = graphiti.Circle.extend({

    /**
     * @constructor
     * Creates a new Node element which are not assigned to any canvas.
     * 
     */
    init : function()
    {
        this._super();
    },
    
    setAlpha : function(percent)
    {
        this._super(Math.min(0.3, percent));
        this.setDeleteable(false);
        this.setDraggable(false);
        this.setResizeable(false);
        this.setSelectable(false);
    }
});
