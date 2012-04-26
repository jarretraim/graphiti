/**
 * @class graphiti.OutputPort
 * A OutputPort is the start anchor for a {@link graphiti.Connection}.
 * 
 * @author Andreas Herz
 * @extends graphiti.Port
 */ 
graphiti.OutputPort = graphiti.Port.extend({

    NAME : "graphiti.OutputPort", // only for debugging

    /**
     * @constructor
     * Create a new OutputPort element
     * 
     * @param {graphiti.Canvas} canvas
     * @param {String} [name] the name for the Port. Required for MVC
     */
    init : function(canvas, name)
    {
        this._super(canvas, name);
      
        this.maxFanOut = 100; // the maximimum connections which goes out of this port
    },

    
    /**
     * @private
     **/
    onDragStart:function()
    {
   
      if(this.getMaxFanOut()===-1){
        return this._super(x,y);
      }
    
      if(this.getMaxFanOut()<=this.getFanOut()){
        return false;
      }
    
      return this._super();
    },
    
    
    /**
     * @method
     * 
     * @param {graphiti.Figure} figure The figure which is currently dragging
     * 
     * @return {Boolean} true if this figure accepts the dragging figure for a drop operation
     * @param port
     */
    onDragEnter : function(figure)
    {
    	// Ports accepts only Ports as DropTarget
    	//
    	if(!(figure instanceof graphiti.Port)){
    		return false;
    	}
 
    	var line = null;
        if (this.getMaxFanOut() <= this.getFanOut()) {
            return false;
        }

        if (figure instanceof graphiti.InputPort) {
            return this._super(figure);
        }
        // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
        else if (figure instanceof graphiti.LineStartResizeHandle) {
            line = this.getCanvas().getCurrentSelection();
            if (line instanceof graphiti.Connection && line.getSource() instanceof graphiti.OutputPort) {
                return this._super(line.getTarget());
            }
        }
        // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
        else if (figure instanceof graphiti.LineEndResizeHandle) {
            line = this.getCanvas().getCurrentSelection();
            if (line instanceof graphiti.Connection && line.getTarget() instanceof graphiti.OutputPort) {
                return this._super(line.getSource());
            }
        }
        return false;
    },
    
    onDragLeave:function( figure)
    {
	  // Ports accepts only Ports as DropTarget
	  //
	  if(!(figure instanceof graphiti.Port)){
		 return;
	  }

	  var line = null;
      if(figure instanceof graphiti.InputPort)
      {
        this._super( figure);
      }
      // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
      else if (figure instanceof graphiti.LineStartResizeHandle)
      {
        line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getSource() instanceof graphiti.OutputPort){
           this._super( line.getTarget());
        }
      }
      else if (figure instanceof graphiti.LineEndResizeHandle)
      {
        line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getTarget() instanceof graphiti.OutputPort){
           this._super( line.getSource());
        }
      }
    },

    setMaxFanOut:function(count)
    {
      this.maxFanOut = count;
    },
    
    /**
     * @method 
     * @returns {Number}
     */
    getMaxFanOut:function()
    {
      return this.maxFanOut;
    },
    
    /**
     * @return {Number}
     **/
    getFanOut:function()
    {
      if(this.getParent().getCanvas()===null){
        return 0;
      }
    
      var count =0;
      var lines = this.getParent().getCanvas().getLines();
      var size=lines.getSize();
      for(var i=0;i< size;i++)
      {
        var line = lines.get(i);
        if(line instanceof graphiti.Connection)
        {
          if(line.getSource()===this){
            count++;
          }
          else if(line.getTarget()===this){
            count++;
          }
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
         if(request.source.getParent().getId() === request.target.getParent().getId()){
            return null;
         }
    
         if(request.source instanceof graphiti.InputPort){
            // This is the different to the InputPort implementation of createCommand.
            return new graphiti.command.CommandConnect(request.canvas,request.target,request.source);
         }
    
         return null;
       }
    
       // ...else call the base class
       return this._super(request);
    }
});