/**
 * @class graphiti.InputPort
 * A OutputPort is the end anchor for a {@link graphiti.Connection}.
 * 
 * @author Andreas Herz
 * @extend graphiti.Port
 */ 
graphiti.InputPort = graphiti.Port.extend({

    NAME : "graphiti.InputPort",

    /**
     * @constructor
     * Create a new InputPort element
     * 
     * @param {String} [name] the name for the Port. Required for MVC
     */
    init : function( name)
    {
        this._super( name);
    },

    
    /**
     * @inheritdoc
     **/
    onDragEnter : function(figure)
    {
    	// Ports accepts only Ports as DropTarget
    	//
    	if(!(figure instanceof graphiti.Port)){
    		return false;
    	}
 
    	var line = null;

        // User drag&drop a normal port
        if (figure instanceof graphiti.OutputPort) {
            return this._super(figure);
        }
        // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
        else if (figure instanceof graphiti.shape.basic.LineStartResizeHandle) {
            line = this.getCanvas().getCurrentSelection();
            if (line instanceof graphiti.Connection && line.getSource() instanceof graphiti.InputPort) {
                return this._super(line.getTarget());
            }
        }
        // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
        else if (figure instanceof graphiti.shape.basic.LineEndResizeHandle) {
            line = this.getCanvas().getCurrentSelection();
            if (line instanceof graphiti.Connection && line.getTarget() instanceof graphiti.InputPort) {
                return this._super(line.getSource());
            }
        }
        
        return false;
    },
    
    /**
     * @inheritdoc
     * 
     * @param {graphiti.Figure} figure
     */
    onDragLeave:function( figure)
    {
  	  // Ports accepts only Ports as DropTarget
  	  //
  	  if(!(figure instanceof graphiti.Port)){
  		 return;
  	  }

  	  var line = null;
      if(figure instanceof graphiti.OutputPort)
      {
        this._super( figure);
      }
      // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
      else if (figure instanceof graphiti.shape.basic.LineStartResizeHandle)
      {
        line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getSource() instanceof graphiti.InputPort){
           this._super(line.getTarget());
        }
      }
      else if (figure instanceof graphiti.shape.basic.LineEndResizeHandle)
      {
        line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getTarget() instanceof graphiti.InputPort){
           this._super(line.getSource());
        }
      }
    },
    
    
    /**
     * @method
     * Returns the Command to perform the specified Request or null.<br>
     * Inherited figures can override this method to return the own implementation
     * of the request.<br>
     *
     * @param {graphiti.EditPolicy} request describes the Command being requested
     * @return {graphiti.command.Command} null or a valid command
     **/
    createCommand:function( request)
    {
       // Connect request between two ports
       //
       if(request.getPolicy() ===graphiti.EditPolicy.CONNECT)
       {
         // loopback not supported at the moment
         if(request.source.getParent().getId() === request.target.getParent().getId()){
            return null;
         }
    
         // InputPort can only connect to an OutputPort. InputPort/InputPort make no sense
         if(request.source instanceof graphiti.OutputPort){
            // This is the different to the OutputPort implementation of createCommand
            return new graphiti.command.CommandConnect(request.canvas,request.source,request.target);
         }
    
         return null;
       }
    
       // ...else call the base class
       return this._super(request);
    }
});