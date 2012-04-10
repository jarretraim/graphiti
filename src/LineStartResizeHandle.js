
graphiti.LineStartResizeHandle = graphiti.LineResizeHandle.extend({

    init: function( canvas) {
        this._super(canvas);
    },
    
    getRelatedPort:function()
    {
       var line = this.getCanvas().getCurrentSelection();
       if(line instanceof graphiti.Connection)
         return line.getSource();
         
      return null;
    },
    
    /**
     *
     * @private
     **/
    onDrag:function(/* :int */ dx, /* :int */ dy)
    {
      var oldX = this.getX();
      var oldY = this.getY();
      this._super(dx, dy);
      var diffX = oldX-this.getX();
      var diffY = oldY-this.getY();
    
      var line = this.getCanvas().getCurrentSelection();
      
      var objPos = line.getStartPoint();
    
      line.setStartPoint(objPos.x-diffX, objPos.y-diffY);
      line.isMoving = true;
    },
    
    /**
     * Resizehandle has been drop on a InputPort/OutputPort.
     * @private
     **/
    onDrop:function(/*: @NAMESPACE@Port*/ dropTarget)
    {
      var line = this.getCanvas().getCurrentSelection();
      line.isMoving=false;
    
      // The ResizeHandle of a Connection has been droped on a Port
      // This will enforce a ReconnectCommand
      if(line instanceof graphiti.Connection)
      {
         this.command.setNewPorts(dropTarget, line.getTarget());
         this.getCanvas().getCommandStack().execute(this.command);
      }
      this.command = null;
    }

});