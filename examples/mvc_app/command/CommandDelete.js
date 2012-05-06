
example.mvc_simple.CommandDelete = graphiti.command.Command.extend({

	NAME : "examples.mvc_simple.CommandDelete", 
	
	/**
	 * @constructor
	 * @param {graphiti.AbstractObjectModel} node
	 */
	init : function( node) {
		this._super( "Delete Node Element");
		this.node = node;
		this.parent = this.node.getModelParent();
		this.connections = null;
	},

	/**
	 * Execute the command the first time
	 * 
	 **/
	execute : function() {
	    // remove all connections related to this element
	    //
	    this.connections = new graphiti.util.ArrayList();
	    var cons = this.node.getModelParent().getConnectionModels().clone();
	    var count = cons.getSize();
	    for ( var i = 0; i < count; i++) {
	        var con = cons.get(i);
	        if (con.getSourceModel() === this.node) {
	            con._tmpModelParent = con.getModelParent();
	            con.getModelParent().removeConnectionModel(con);
	            this.connections.add(con);
	        } else if (con.getTargetModel() === this.node) {
	            con._tmpModelParent = con.getModelParent();
	            con.getModelParent().removeConnectionModel(con);
	            this.connections.add(con);
	        }
	    }
	    this.parent.removeNode(this.node);
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
		this.parent.addNode(this.node);
		var count = this.connections.getSize();
		for ( var i = 0; i < count; i++) {
			var con = this.connections.get(i);
			con._tmpModelParent.addConnectionModel(con);
		}
	}
});
