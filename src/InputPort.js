
graphiti.InputPort = graphiti.Port.extend({

    /**
     * @constructor
     * 
     */
    init : function()
    {
        this._super();
    },

    onDragstart:function(/*:int*/ x, /*:int*/ y)
    {
      if(!this.canDrag)
        return false;
    
      return true;
    },
    
    /**
     *
     **/
    onDragEnter:function(/*:@NAMESPACE@Port*/ port)
    {
      // User drag&drop  a normal port
      if(port instanceof graphiti.OutputPort)
      {
        this._super(port);
      }
      // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
      else if (port instanceof graphiti.LineStartResizeHandle)
      {
        var line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getSource() instanceof graphiti.InputPort)
          this._super(line.getTarget());
      }
      // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
      else if (port instanceof graphiti.LineEndResizeHandle)
      {
        var line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getTarget() instanceof graphiti.InputPort)
           this._super(line.getSource());
      }
    },
    
    onDragLeave:function( port)
    {
      if(port instanceof graphiti.OutputPort)
      {
        this._super( port);
      }
      // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
      else if (port instanceof graphiti.LineStartResizeHandle)
      {
        var line = this.workflow.currentSelection;
        if(line instanceof graphiti.Connection && line.getSource() instanceof graphiti.InputPort)
           this._super(line.getTarget());
      }
      else if (port instanceof graphiti.LineEndResizeHandle)
      {
        var line = this.workflow.currentSelection;
        if(line instanceof graphiti.Connection && line.getTarget() instanceof graphiti.InputPort)
           this._super(line.getSource());
      }
    },
    
    
    /**
     * Returns the Command to perform the specified Request or null.<br>
     * Inherited figures can override this method to return the own implementation
     * of the request.<br>
     *
     * @param {graphiti.EditPolicy} request describes the Command being requested
     * @return {graphiti.command.Command} null or a valid command
     * @since 0.9.15
     **/
    createCommand:function( request)
    {
       // Connect request between two ports
       //
       if(request.getPolicy() ===graphiti.EditPolicy.CONNECT)
       {
         // loopback not supported at the moment
         if(request.source.parentNode.id === request.target.parentNode.id)
            return null;
    
         // InputPort can only connect to an OutputPort. InputPort/InputPort make no sense
         if(request.source instanceof graphiti.OutputPort)
            // This is the different to the OutputPort implementation of createCommand
            return new graphiti.command.CommandConnect(request.canvas,request.source,request.target);
    
         return null;
       }
    
       // ...else call the base class
       return this._super(request);
    }
});