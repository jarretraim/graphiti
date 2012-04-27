
example.connection_drop.BetweenFigure = graphiti.shape.node.Between.extend({

    init : function()
    {
        this._super();
    },

  
    /**
     * @method
     * Called if the user drop this element onto the dropTarget. 
     * 
     * @param {graphiti.Figure} dropTarget The drop target.
     * @private
     **/
    onDrop:function(dropTarget)
    {
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
