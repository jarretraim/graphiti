/**
 * @class graphiti.HybridPort
 * A OutputPort is the start anchor for a {@link graphiti.Connection}.
 * 
 * @author Andreas Herz
 * @extends graphiti.Port
 */ 
graphiti.HybridPort = graphiti.Port.extend({

    NAME : "graphiti.HybridPort",

    /**
     * @constructor
     * Create a new HybridPort element
     * 
     * @param {String} [name] the name for the Port.
     */
    init : function(name)
    {
        this._super(name);
    },

    
    /**
     * @inheritdoc
     * 
     * @param {graphiti.Figure} figure The figure which is currently dragging
     * @return {Boolean} true if this figure accepts the dragging figure for a drop operation
     */
    onDragEnter : function(figure)
    {
    	// Ports accepts only Ports as DropTarget
    	//
    	if(!(figure instanceof graphiti.Port)){
    		return false;
    	}
 
    	var line = null;

    	// Accept any kind of port
        if (figure instanceof graphiti.Port) {
            return this._super(figure);
        }
        // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
        else if (figure instanceof graphiti.shape.basic.LineStartResizeHandle) {
            line = this.getCanvas().getCurrentSelection();
            if (line instanceof graphiti.Connection && line.getSource() instanceof graphiti.OutputPort) {
                return this._super(line.getTarget());
            }
        }
        // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
        else if (figure instanceof graphiti.shape.basic.LineEndResizeHandle) {
            line = this.getCanvas().getCurrentSelection();
            if (line instanceof graphiti.Connection && line.getTarget() instanceof graphiti.OutputPort) {
                return this._super(line.getSource());
            }
        }
        return false;
    },
    
    /**
     * @inheritdoc
     * 
     */
    onDragLeave:function( figure)
    {
	  // Ports accepts only Ports as DropTarget
	  //
	  if(!(figure instanceof graphiti.Port)){
		 return;
	  }

	  var line = null;
	  
	  // accept any kind of port
      if(figure instanceof graphiti.Port){
        this._super( figure);
      }
      // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
      else if (figure instanceof graphiti.shape.basic.LineStartResizeHandle){
        line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getSource() instanceof graphiti.OutputPort){
           this._super( line.getTarget());
        }
      }
      else if (figure instanceof graphiti.shape.basic.LineEndResizeHandle){
        line = this.getCanvas().getCurrentSelection();
        if(line instanceof graphiti.Connection && line.getTarget() instanceof graphiti.OutputPort){
           this._super( line.getSource());
        }
      }
    },

    /**
     * @inheritdoc
     *
     * @param {graphiti.EditPolicy} request describes the Command being requested
     * @return {graphiti.command.Command} null or a valid command
     **/
    createCommand:function(request)
    {
       // Connect request between two ports
       //
       if(request.getPolicy() === graphiti.EditPolicy.CONNECT) {
           
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