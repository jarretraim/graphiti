
example.mvc_simple.CommandDrop = graphiti.command.Command.extend({

	NAME : "examples.mvc_simple.CommandDrop", // only for debugging
	
	/**
	 * @constructor
	 * @param {graphiti.AbstractObjectModel} parent
	 * @param {graphiti.AbstractObjectModel} node
	 */
	init : function(canvas, parent, droppedDomNode, x,y) {
        
 		this._super( "Dropped Node Element");
 		this.canvas = canvas;
		this.parent = parent;
		this.node =  new example.mvc_simple.NodeModel();
		this.x = x;
		this.y = y;
		
		// for undo operation
	    this.oldConnectionModel = null;
        this.oldTargetModel = null;
        this.additionalConnection = null;
	},

	/**
	 * Execute the command the first time
	 * 
	 **/
	execute : function() {
	    // add the new node to the model
	    //
	    this.node.setPosition(this.x,this.y);
	    this.parent.addNode(this.node);
	    
   
	    // check if the user has dropped the node onto a connection -> infix
	    // this node into the existing connection
	    //
	    var dropTarget = this.canvas.getBestLine(this.x, this.y);
	    if(dropTarget instanceof graphiti.Connection){
	        this.oldConnectionModel = dropTarget.getModel();
	        this.oldTargetModel = this.oldConnectionModel.getTargetModel();
	        
	        this.oldConnectionModel.setTargetModel(this.node);
	        
	        if(this.additionalConnection===null){
	            this.additionalConnection= new example.mvc_simple.ConnectionModel(this.node.getId(), this.oldTargetModel.getId());
	        }
	        
	        this.node.addConnectionModel(this.additionalConnection);
	    }
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
	    // restore old connection
	    //
        var source =  this.additionalConnection.getModelParent();
        source.removeConnectionModel(this.additionalConnection);
        this.oldConnectionModel.setTargetModel(this.oldTargetModel);
        
		this.parent.removeNode(this.node);
	}
});

