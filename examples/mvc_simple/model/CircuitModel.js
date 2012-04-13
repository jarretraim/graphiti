
example.mvc_simple.CircuitModel= graphiti.mvc.AbstractObjectModel.extend({

	NAME : "example.mvc_simple.CircuitModel", // just for debugging

	init: function(){
		this._super();

		this.nodes = new graphiti.util.ArrayList();
	
		this.nodes.add(new example.mvc_simple.NodeModel());
	},
	

	/**
	 *
	 **/
	getModelChildren:function()
	{
	   return this.nodes;
	}

});
