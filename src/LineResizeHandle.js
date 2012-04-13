
/**
 * 
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
graphiti.LineResizeHandle = graphiti.Circle.extend({
    NAME : "graphiti.LineResizeHandle", // only for debugging

    init : function(canvas, type)
    {
        this._super();

        if (canvas.isTouchDevice()) {
            this.setDimension(20, 20);
        }
        else {
            this.setDimension(10, 10);
        }

        this.setBackgroundColor(new graphiti.util.Color(0, 255, 0));
        this.setZOrder(10000);
        this.currentTarget = null;

        this.setSelectable(false);
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
     * @method
     * Init the repaint of the element
     * 
     * @template
     * @param attributes
     */
    repaint:function(attributes){
        if(typeof attributes === "undefined"){
            attributes= {};
        }
        
        // a port did have the 0/0 coordinate i the center and not in the top/left corner
        //
       attributes.fill="r(.4,.3)#b4e391-#61c419:60-#299a0b";
        
        this._super(attributes);
    },

    /**
     * Will be called if the drag and drop action beginns. You can return [false] if you
     * want avoid the that the figure can be move.
     *
     * @param {Number} x The x position where the mouse has been clicked in the figure
     * @param {Number} y The y position where the mouse has been clicked in the figure
     * @type {boolean}
     **/
    onDragstart : function()
    {
        this.ox = this.x;
        this.oy = this.y;

        this.command = this.getCanvas().getCurrentSelection().createCommand(new graphiti.EditPolicy(graphiti.EditPolicy.MOVE_BASEPOINT));

        return true;
    },
    
     
    /**
     * @method
     * Called from the framework during a drag&drop operation
     * 
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @return {boolean}
     **/
    onDrag : function(dx, dy)
    {
        this.setPosition(this.ox+dx,this.oy+dy );
        
        var port = this.getOppositeSidePort();

        if (port !== null) {
            target = port.getDropTarget(this.getX(), this.getY(), null);

            // the hovering element has been changed
            if (target !== this.currentTarget) {
                if (this.currentTarget !== null) {
                    this.currentTarget.onDragLeave(port);
                }
                if (target !== null) {
                    target.onDragEnter(port);
                }
            }
            this.currentTarget = target;
        }
        return true;
    },
    
    /**
     * @method Will be called after a drag and drop action.<br>
     *         Sub classes can override this method to implement additional stuff. Don't forget to call the super implementation via <code>Figure.prototype.onDragend.call(this);</code>
     */
    onDragend : function()
    {
        if (!this.isDraggable()) {
            return false;
        }

        var port = this.getOppositeSidePort();
        if (port !== null) {
            target = port.getDropTarget(this.getX(), this.getY(), port);
            if (target !== null) {
                this.onDrop(target);
                target.onDragLeave(port);
            }
        }

        // A Connection is stuck to the corresponding ports. So we must reset the position
        // to the origin port if we doesn't drop the ResizeHandle on a other port.
        //
        if (this.getCanvas().getCurrentSelection() instanceof graphiti.Connection) {
            if (this.command !== null) {
                this.command.cancel();
            }
        }
        //
        else {
            // An non draggable resizeHandle doesn't create a move/resize command.
            // This happens if the selected figure has set "isResizeable=false".
            //
            if (this.command !== null) {
                this.getCanvas().getCommandStack().execute(this.command);
            }
        }
        this.command = null;
        this.getCanvas().hideSnapToHelperLines();

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
      if(this.getCanvas().getCurrentSelection() instanceof graphiti.Connection){
        return false;
      }
        
      return true;
    },
    
    /**
     * @method
     * Show the ResizeHandle and add it to the canvas.<br>
     * Additional bring it in to the front of other figures.
     *
     * @param {graphiti.Canvas} canvas the canvas to use
     * @param {Number} x the x-positin
     * @param {Number} y the y-position
     **/
    show:function(canvas, x, y)
    {
      // don't call the parent function. The parent functions delete this object
      // and a resize handle can't be deleted.
      if(this.shape===null) {
         this.setCanvas(canvas);
         if(this.dragDropHandlingByCanvas===false){
             this.createDraggable();
         }
      }
      
      this.setPosition(x,y);
      this.shape.toFront();
    },
    
    /**
     * @method
     * Hide the resize handle and remove it from the cnavas.
     *
     **/
    hide:function()
    {
      // don't call the parent function. The parent functions delete this object
      // and a resize handle shouldn't be deleted.
      if(this.shape===null){
        return;
      }
        
      this.setCanvas(null);
    },
    
    /**
     * @method
     * Override this method and redirect them to the canvas. A ResizeHandle didn't support
     * Keyboard interaction at the moment.
     *
     * @param {Number} keyCode the id of the pressed key
     * @param {boolean} ctrl true if the user has pressed the CTRL/STRG key as well.
     **/
    onKeyDown:function(keyCode, ctrl)
    {
      // don't call the parent function. The parent functions delete this object
      // and a resize handle can't be deleted.
      this.canvas.onKeyDown(keyCode,ctrl);
    },
    
    
    fireMoveEvent:function()
    {
      // A resizeHandle doesn't fire this event.
      // Normally this set the document dirty. This is not necessary for a ResizeHandle.
    }
});