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
     * @param {String} [name] the name for the Port.
     */
    init : function( name)
    {
        this._super( name);
        
        // responsive for the arrangement of the port 
        // calculates the x/y coordinates in relation to the parent node
        this.locator=new graphiti.layout.locator.InputPortLocator();
    },

    
    /**
     * @inheritdoc
     **/
    onDragEnter : function(figure)
    {
        // User drag&drop a normal port
        if (figure instanceof graphiti.OutputPort) {
            return this._super(figure);
        }
        // User drag&drop a normal port
        if (figure instanceof graphiti.HybridPort) {
            return this._super(figure);
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
      if(figure instanceof graphiti.OutputPort){
        this._super( figure);
      }
      
      else if(figure instanceof graphiti.HybridPort){
          this._super( figure);
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
    
         // InputPort can only connect to an OutputPort. InputPort->InputPort make no sense
         if(request.source instanceof graphiti.OutputPort){
            // This is the different to the OutputPort implementation of createCommand
            return new graphiti.command.CommandConnect(request.canvas,request.source,request.target);
         }
         
         if(request.source instanceof graphiti.HybridPort){
             // This is the different to the OutputPort implementation of createCommand
             return new graphiti.command.CommandConnect(request.canvas,request.source,request.target);
         }
      
         return null;
       }
    
       // ...else call the base class
       return this._super(request);
    }
});