
graphiti.OutputPort = graphiti.Port.extend({

    /**
     * @constructor
     * 
     */
    init : function()
    {
        this._super();
        this.maxFanOut = 100; // the maximimum connections which goes out of this port
    },

    onDragEnter:function( port)
    {
      if(this.getMaxFanOut()<=this.getFanOut())
        return;
    
      if(port instanceof graphiti.InputPort)
      {
        this._super( port);
      }
      // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
      else if (port instanceof graphiti.LineStartResizeHandle)
      {
        var line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getSource() instanceof graphiti.OutputPort)
          this._super(line.getTarget());
      }
      // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
      else if (port instanceof graphiti.LineEndResizeHandle)
      {
        var line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getTarget() instanceof graphiti.OutputPort)
           this._super( line.getSource());
      }
    },
    
    onDragLeave:function( port)
    {
      if(port instanceof graphiti.InputPort)
      {
        this._super( port);
      }
      // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
      else if (port instanceof graphiti.LineStartResizeHandle)
      {
        var line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getSource() instanceof graphiti.OutputPort)
           this._super( line.getTarget());
      }
      else if (port instanceof graphiti.LineEndResizeHandle)
      {
        var line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getTarget() instanceof graphiti.OutputPort)
           this._super( line.getSource());
      }
    },
    
    /**
     * @private
     **/
    onDragstart:function(/*:int*/ x, /*:int*/ y)
    {
      if(!this.canDrag)
        return false;
    
      if(this.maxFanOut===-1)
        return true;
    
      if(this.getMaxFanOut()<=this.getFanOut())
        return false;
    
      return true;
    },
    
    
    setMaxFanOut:function(count)
    {
      this.maxFanOut = count;
    },
    
    getMaxFanOut:function()
    {
      return this.maxFanOut;
    },
    
    /**
     * @type int
     **/
    getFanOut:function()
    {
      if(this.getParent().getCanvas()===null)
        return 0;
    
      var count =0;
      var lines = this.getParent().getCanvas().getLines();
      var size=lines.getSize();
      for(var i=0;i< size;i++)
      {
        var line = lines.get(i);
        if(line instanceof graphiti.Connection)
        {
          if(line.getSource()==this)
            count++;
          else if(line.getTarget()==this)
            count++;
        }
      }
      return count;
    },
    
    /**
     * Returns the Command to perform the specified Request or null.<br>
     * Inherited figures can override this method to return the own implementation
     * of the request.<br>
     *
     * @param {graphiti.EditPolicy} request describes the Command being requested
     * @return {graphiti.command.Command} null or a valid command
     **/
    createCommand:function(request)
    {
       // Connect request between two ports
       //
       if(request.getPolicy() === graphiti.EditPolicy.CONNECT)
       {
         if(request.source.parentNode.id === request.target.parentNode.id)
            return null;
    
         if(request.source instanceof graphiti.InputPort)
            // This is the different to the InputPort implementation of createCommand.
            return new graphiti.command.CommandConnect(request.canvas,request.target,request.source);
    
         return null;
       }
    
       // ...else call the base class
       return this._super(request);
    }
});