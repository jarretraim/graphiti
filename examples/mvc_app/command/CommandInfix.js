
example.mvc_simple.CommandInfix = graphiti.command.Command.extend({

	NAME : "examples.mvc_simple.CommandInfix", // only for debugging
	
	/**
	 * @constructor
	 * @param {graphiti.AbstractObjectModel} parent
	 * @param {graphiti.AbstractObjectModel} node
	 */
	init : function(connectionModel, nodeModel) {
        
 		this._super( "Infix Node Element");
		this.conn = connectionModel;
		this.node =  nodeModel;
		
		this.newConn = null;
	},

	/**
	 * Execute the command the first time
	 * 
	 **/
	execute : function() {
	    var oldTargetModel = this.conn.getTargetModel();
	    
	    this.conn.setTargetModel(this.node);
	    
	    if(this.newConn===null)
	        this.newConn= new example.mvc_simple.ConnectionModel(this.node.getId(), oldTargetModel.getId());
	    
	    this.node.addConnectionModel(this.newConn);
	},

    /**
     * Redo the command after the user has undo this command.
     *
     **/
    redo : function() {
        this.execute();
    },

	/** 
	 * Undo the command.
	 *
	 **/
	undo : function() {
        var oldTargetModel = this.newConn.getTargetModel();
        
        this.conn.setTargetModel(oldTargetModel);
        
        this.node.removeConnectionModel(this.newConn);
	}
});

