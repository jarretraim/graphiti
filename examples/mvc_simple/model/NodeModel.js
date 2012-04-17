

example.mvc_simple.NodeModel= graphiti.mvc.AbstractObjectModel.extend({
	
	NAME : "example.mvc_simple.NodeModel", // just for debugging
	
	/**
	 * @constructor
	 * 
	 * @param {String} id The unique id of the node.
	 */
	init: function( id){
	   this._super();
		
	   this.id = id;
	   this.pos= new graphiti.geo.Point(0,0);
	   this.connections = new graphiti.util.ArrayList();
	},
	
	/**
	 * @method
	 * Update the position of the model.
	 * 
	 * @param {Number} x
	 * @param {Number} y
	 */
	setPosition:function(x ,y)
	{
	  var save = this.pos;
	  
	  // Don't move ELements outside the left or top canvas border
	  //
	  this.pos = new graphiti.geo.Point( Math.max(0,x),Math.max(0,y));
	  
	  this.firePropertyChange(graphiti.mvc.Event.POSITION_CHANGED,save, this.pos);
	},
	
	/**
	 * @method
	 * Return the position of the model object.
	 * 
	 * @return {graphiti.geo.Point}
	 */
	getPosition: function(){
		return this.pos;
	},

	/**
	 * @method
	 * Return all connections from the record source model.
	 *
	 * @return {graphiti.util.ArrayList}
	 **/
	getConnectionModels:function()
	{
	  return this.connections;
	},

	/**
	 * Add a connection between two columns of two different tables
	 *
     * @param {graphiti.mvc.AbstractConnectionModel} connection
	 **/
	addConnectionModel:function( connection)
	{
      if(!(connection instanceof graphiti.mvc.AbstractConnectionModel))
	  {
	    throw "Invalid parameter type in [NodeModel.addConnectionModel]";
	  }

	  if(this.connections.indexOf(connection)===-1)
	  {
	    this.connections.add(connection);
	    connection.setModelParent(this);
	    // inform all listener, mainly the visual representation, about the changes.
	    this.firePropertyChange(graphiti.mvc.Event.CONNECTION_ADDED,null,connection);
	  }
	},

	/**
	 * Remove a connection between two columns of two different tables
	 *
	 * @param {graphiti.mvc.AbstractConnectionModel} connection
	 **/
	removeConnectionModel:function( connection)
	{
	  if(!(connection instanceof graphiti.mvc.AbstractConnectionModel))
	  {
	        throw "Invalid parameter type in [NodeModel.removeConnectionModel]";
	  }

	  if(this.connections.remove(connection)!==null)
	  {
	    connection.setModelParent(null);
	    // inform all listener, mainly the visual representation, about the changes.
	    this.firePropertyChange(graphiti.mvc.Event.CONNECTION_REMOVED,connection,null);
	  }
	},

    /**
     * Return the root  element of the model.
     *
     * @type draw2d.VirtualNetworkCloudModel
     **/
    getCircuitModel:function()
    {
       return this.getModelParent().getCircuitModel();
    }
});
