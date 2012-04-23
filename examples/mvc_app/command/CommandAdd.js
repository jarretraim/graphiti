
example.mvc_simple.CommandAdd = graphiti.command.Command.extend({

	NAME : "examples.mvc_simple.CommandAdd", // only for debugging
	
	/**
	 * @constructor
	 * @param {graphiti.AbstractObjectModel} parent
	 * @param {graphiti.AbstractObjectModel} node
	 */
	init : function(parent, node) {
		this._super( "Add Node Element");
		this.parent = parent;
		this.node = node;
	},

	/**
	 * Execute the command the first time
	 * 
	 **/
	execute : function() {
        this.parent.addNode(this.node);
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
		this.parent.removeNode(this.node);
	}
});

