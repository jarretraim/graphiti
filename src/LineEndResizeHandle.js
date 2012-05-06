
/**
 * @class graphiti.shape.basic.LineEndResizeHandle
 * Selection handle for connections and normal lines.
 * 
 * TODO: Split the LineEndResizeHandle to ConnectionEndResizeHandle and LineEndResizeHandle!!!!
 *
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.shape.basic.LineResizeHandle 
 */
graphiti.shape.basic.LineEndResizeHandle = graphiti.shape.basic.LineResizeHandle.extend({
    NAME : "graphiti.shape.basic.LineEndResizeHandle",

    init: function( canvas) {
        this._super(canvas);
    },

    
    /**
     * @method
     * Return the Port below the ResizeHandle
     * 
     * @return {graphiti.Port}
     */
    getRelatedPort:function()
    {
       var line = this.getCanvas().getCurrentSelection();
       
       if(line instanceof graphiti.Connection){
         return line.getTarget();
       }
         
      return null;
    },
    
    /**
     * @method
     * Return the Port on the opposite side of the ResizeHandle
     * 
     * @returns
     */
    getOppositeSidePort:function()
    {
       var line = this.getCanvas().getCurrentSelection();
       
       if(line instanceof graphiti.Connection){
         return line.getSource();
       }
         
      return null;
    },
    
 
    /**
     * @method
     * Called from the framework during a drag&drop operation
     * 
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @return {boolean}
     **/
    onDrag:function( dx, dy)
    {
      var oldX = this.getX();
      var oldY = this.getY();
      this._super(dx,dy);
      var diffX = oldX-this.getX();
      var diffY = oldY-this.getY();
    
      var line = this.getCanvas().getCurrentSelection();
    
      var objPos = line.getEndPoint();
    
      line.setEndPoint(objPos.x-diffX, objPos.y-diffY);
      line.isMoving = true;
      this.detachMoveListener(line);
      
      return true;
    },
    
    /**
     * Resizehandle has been drop on a InputPort/OutputPort.
     * @private
     **/
    onDrop:function( dropTarget)
    {
      var line = this.getCanvas().getCurrentSelection();
      line.isMoving=false;
      
      if(line instanceof graphiti.Connection)
      {
         this.command.setNewPorts(line.getSource(),dropTarget);
         this.getCanvas().getCommandStack().execute(this.command);
      }
      this.command = null;
    }
});