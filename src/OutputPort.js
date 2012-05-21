/**
 * @class graphiti.OutputPort
 * A OutputPort is the start anchor for a {@link graphiti.Connection}.
 * 
 * @author Andreas Herz
 * @extends graphiti.Port
 */ 
graphiti.OutputPort = graphiti.Port.extend({

    NAME : "graphiti.OutputPort",

    /**
     * @constructor
     * Create a new OutputPort element
     * 
     * @param {String} [name] the name for the Port. Required for MVC
     */
    init : function(name)
    {
        this._super(name);
       
        // responsive for the arrangement of the port 
        // calculates the x/y coordinates in relation to the parent node
        this.locator=new graphiti.layout.locator.OutputPortLocator();
    },

    
    /**
     * @inheritdoc
     * 
     * @param {graphiti.Figure} figure The figure which is currently dragging
     * @return {Boolean} true if this figure accepts the dragging figure for a drop operation
     */
    onDragEnter : function(figure)
    {
    	// Ports accepts only InputPorts as DropTarget
    	//
        if (figure instanceof graphiti.InputPort) {
            return this._super(figure);
        }
        
        if (figure instanceof graphiti.HybridPort) {
            return this._super(figure);
        }
        
        return false;
    },
    
    /**
     * @inheritdoc
     * 
     */
    onDragLeave:function( figure)
    {
	  // Ports accepts only InputPorts as DropTarget
	  //
      if(figure instanceof graphiti.InputPort){
        this._super( figure);
      }
      else if(figure instanceof graphiti.HybridPort){
        this._super( figure);
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
       if(request.getPolicy() === graphiti.EditPolicy.CONNECT)
       {
         if(request.source.getParent().getId() === request.target.getParent().getId()){
            return null;
         }
    
         if(request.source instanceof graphiti.InputPort){
            // This is the different to the InputPort implementation of createCommand.
            return new graphiti.command.CommandConnect(request.canvas,request.target,request.source);
         }
         if(request.source instanceof graphiti.HybridPort){
             // This is the different to the InputPort implementation of createCommand.
             return new graphiti.command.CommandConnect(request.canvas,request.target,request.source);
         }
    
         return null;
       }
    
       // ...else call the base class
       return this._super(request);
    }
});