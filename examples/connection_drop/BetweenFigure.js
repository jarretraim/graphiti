
example.connection_drop.BetweenFigure = graphiti.shape.node.Between.extend({

    init : function()
    {
        this._super();
        this.setBackgroundColor("#F9BF4A");
    },

  
    /**
     * @method
     * Called if the user drop this element onto the dropTarget. 
     * 
     * In this Example we create a "smart insert" of an existing connection.
     * COOL and fast network editing.
     * 
     * @param {graphiti.Figure} dropTarget The drop target.
     * @private
     **/
    onDrop:function(dropTarget)
    {
    	// Activate a "smart insert" If the user drop this figure on connection
    	//
    	if(dropTarget instanceof graphiti.Connection){
    		var oldSource = dropTarget.getSource();
    		dropTarget.setSource(this.outputPort);
   		
    		var additionalConnection = new graphiti.Connection();
    		this.getCanvas().addFigure(additionalConnection);
    		additionalConnection.setSource(oldSource);
    		additionalConnection.setTarget(this.inputPort);
    	}
    }
    


});
