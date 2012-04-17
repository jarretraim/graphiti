
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
        // set the back link
        node.setModelParent(this);
        
        // inform all listener, mainly the visual representation, about the changes.
        this.firePropertyChange(graphiti.mvc.Event.ELEMENT_ADDED, null, node);
    },
	
    /**
     * @method
     * Remove the node from the data model. The UI will synch automaticlly.
     * 
     * @param {graphiti.AbstrobObjectModel} node the node to remove
     **/
    removeNode:function(node)
    {
       if(this.nodes.remove(node)!==null)
       {
         node.setModelParent(null);
         // inform all listener, mainly the visual representation, about the changes.
         this.firePropertyChange(graphiti.mvc.Event.ELEMENT_REMOVED,node,null);
       }
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
	 * @method
	 * Return the table model with the hands over id.
	 *
	 * @param {String} id the unique id of the requested node model
     * @return {graphiti.AbstractObjectModel}
	 **/
	getNodeModel:function( id)
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
	 * Return all connections from the model.
	 *
	 * @return graphiti.util.ArrayList
	 **/
	getConnectionModels:function()
	{
	  var result = new graphiti.util.ArrayList();
	  var count = this.nodes.getSize();

	  for(var i=0; i<count;i++)
	  {
	     var model = this.nodes.get(i);
	     result.addAll(model.getConnectionModels());
	  }

	  return result;
	},
	
	
    /**
     * @method
     * Return the root element of the model.
     *
     * @return {graphiti.AbstractObjectModel}
     **/
    getCircuitModel:function()
    {
       return this;
    }

});
