
example.mvc_simple.ConnectionModel = graphiti.mvc.AbstractConnectionModel.extend({

    NAME : "example.mvc_simple.ConnectionModel", // just for debugging
   
    init: function( /*:String*/ sourceNodeId, /*:String*/ targetNodeId, /*:String*/ id)
    {
      this._super();
    
      this.sourceNodeId = sourceNodeId;
      this.sourcePort = "output";
    
      this.targetNodeId = targetNodeId;
      this.targetPort = "input";
    
       this.id = id;
    },
     
    /**
     * @param {example.mvc_simple.NodeModel} model
     **/
    setSourceModel:function( model)
    {
       this.sourceNodeId = model.getId();
   
       // inform all listener, mainly the visual representation, about the changes.
       this.firePropertyChange(graphiti.mvc.Event.SOURCE_CHANGED,null, model);
    },
    
    /**
     *
     * @return {example.mvc_simple.NodeModel} model
     **/
    getSourceModel:function()
    {
       return this.getCircuitModel().getNodeModel(this.sourceNodeId);
    },
    
    
    /**
     *
     * @param {example.mvc_simple.NodeModel} model
    **/
    setTargetModel:function( model)
    {
       this.targetNodeId = model.getId();
    
       // inform all listener, mainly the visual representation, about the changes.
       this.firePropertyChange(graphiti.mvc.Event.TARGET_CHANGED,null, model);
    },
    
    
    /**
     *
     * @return {example.mvc_simple.NodeModel} model
     **/
    getTargetModel:function()
    {
       return this.getCircuitModel().getNodeModel(this.targetNodeId);
    },
    
    
    /**
     *
     * @type String
     **/
    getSourcePortName:function()
    {
       return this.sourcePort;
    },
    
    /**
     *
     * @type String
     **/
    getTargetPortName:function()
    {
       return this.targetPort;
    },
   
    /**
     * @return {example.mvc_simple.CircuitModel} 
     **/
    getCircuitModel:function()
    {
       return this.getModelParent().getCircuitModel();
    }
});
