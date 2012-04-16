
/**
 * @class example.mvc_simple.CircuitModel
 * A model which represent a electric circuit.
 * 
 * @author Andreas Herz
 * @extend graphiti.mvc.AbstractObjectModel
 */
example.mvc_simple.CircuitModel= graphiti.mvc.AbstractObjectModel.extend({

	NAME : "example.mvc_simple.CircuitModel", // just for debugging

	/**
	 * @constructor
	 * Creates a new circuit element. A circuit can have nodes as children.
	 * 
	 */
	init: function(){
		this._super();

		this.nodes = new graphiti.util.ArrayList();
	},
	
	/**
	 * @method
	 * Add a node to the circuit.
	 * 
	 * @param {example.mvc_simple.NodeModel} node
	 */
	addNode : function(node)
    {
        this.nodes.add(node);
        node.setModelParent(this);
        
        // inform all listener, mainly the visual representation, about the changes.
        this.firePropertyChange(graphiti.mvc.Event.ELEMENT_ADDED, null, node);
    },
	
	/**
	 * @method
	 * Return all children of this model
	 * 
	 * @return {graphiti.util.ArrayList}
	 **/
	getModelChildren:function()
	{
	   return this.nodes;
	},


	/**
	 * Return the table model with the hands over name.
	 *
	 * @type draw2d.AbstractCloudNodeModel
	 **/
	getNodeModel:function(/*:String*/ id)
	{
	   var count=this.nodes.getSize();
	   for(var i=0;i<count;i++)
	   {
	      var source = this.nodes.get(i);
	      if(source.getId()==id)
	      {
	         return source;
	      }
	   }
	   return null;
	},

    /**
     * Return the root  element of the model.
     *
     * @type draw2d.VirtualNetworkCloudModel
     **/
    getCircuitModel:function()
    {
       return this;
    }

});
