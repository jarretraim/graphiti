
/**
 * 
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
graphiti.LineResizeHandle = graphiti.ResizeHandle.extend({

    init: function( canvas, type) {
        this._super(canvas, 9);
        this.setDimension(10,10);
        this.setBackgroundColor(new  graphiti.util.Color(0,255,0));
        this.setZOrder(10000);
        this.currentTarget = null;
    },

    createDraggable:function()
    {
        this._startDrag = function (x,y,event) 
        {
           $.Event(event).stopPropagation();
           this.canvas.showMenu(null);
           if(!this.isDraggable())
             return;
             
           this.ox = this.x;
           this.oy = this.y;
        
           this.onDragstart(x,y);
        };
        this._moveDrag = function (dx, dy) 
        {
           if(this.isSelectable()===false)
             return;
           
           if(this.isDraggable()===false)
             return;
             
           this.onDrag(dx,dy);
           var port = this.getRelatedPort();
           if(port!==null)
           {
             target  = port.getDropTarget(this.getX(), this.getY());
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
           }
        };
        this._upDrag = function () 
        {
           if(!this.isDraggable())
             return;
        
           var port = this.getRelatedPort();
           if(port!==null)
           {
             target  = port.getDropTarget(this.getX(), this.getY());
             if(target!==null)
             {
                this.onDrop(target);
                target.onDragLeave(this);
             }
            }
            this.onDragend();
        };
        this.shape.drag(this._moveDrag, this._startDrag, this._upDrag,this,this,this);
    },
    
    /**
     * @template
     * @returns
     */
    getRelatedPort:function()
    {
      return null;
    },
    
    
    /**
     * Will be called if the drag and drop action beginns. You can return [false] if you
     * want avoid the that the figure can be move.
     *
     *
     * @param {int} x The x position where the mouse has been clicked in the figure
     * @param {int} y The y position where the mouse has been clicked in the figure
     * @type boolean
     **/
    onDragstart:function(/*:int*/ x, /*:int*/ y)
    {
      // This happens if the selected figure has set the "nonResizeable" flag
      // In this case the ResizeHandle can't be dragged. => no resize
      //
      if(!this.isDraggable())
        return false;
    
      this.ox = this.x;
      this.oy = this.y;
    
      this.command = this.getCanvas().getCurrentSelection().createCommand(new graphiti.EditPolicy(graphiti.EditPolicy.MOVE));
    
      return true;
    },
    
    
    /**
     * The LineResizeHandle didn't support the SnapToHelper feature if the
     * corresponding object is an Connection. A Connection is always bounded to
     * Port. In this case it makes no sense to use a Grid or Geometry for snapping.
     *
     * @type boolean
     * @public
     **/
    supportsSnapToHelper:function()
    {
      if(this.getCanvas().getCurrentSelection() instanceof graphiti.Connection)
    	return false;
    	
      return true;
    },
    
    
    /**
     * Will be called after a drag and drop action.<br>
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>Figure.prototype.onDragend.call(this);</code>
     * @private
     **/
    onDragend:function()
    {
      // A Connection glue at the corresponding port. Reset the position to the origin port
      // if we doesn't drop the ResizeHandle on a other port.
      //
      if(this.getCanvas().getCurrentSelection() instanceof graphiti.Connection)
      {
         if(this.command!=null)
            this.command.cancel();
      }
      //
      else
      {
         // An non draggable resizeHandle doesn't create a move/resize command.
         // This happens if the selected figure has set the "nonResizeable" flag.
         //
         if(this.command!=null)
           this.getCanvas().getCommandStack().execute(this.command);
      }
      this.command = null;
      this.getCanvas().hideSnapToHelperLines();
    }

});