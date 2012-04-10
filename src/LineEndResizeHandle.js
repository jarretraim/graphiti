
/**
 * TODO: Split the LineEndResizeHandle to ConnectionEndResizeHandle and LineEndResizeHandle!!!!
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 * @private
 * @final
 */
graphiti.LineEndResizeHandle = graphiti.LineResizeHandle.extend({

    init: function( canvas) {
        this._super(canvas);
    },

    
    getRelatedPort:function()
    {
       var line = this.getCanvas().getCurrentSelection();
       
       if(line instanceof graphiti.Connection)
         return line.getTarget();
         
      return null;
    },
    
    /**
     *
     **/
    onDrag:function(/*:int*/ dx, /*:int*/ dy)
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