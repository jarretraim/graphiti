
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

	    // adjust the figure with the width/2 and height/2
        // In this case we have droped the figure centerd
        var addedFigure = this.canvas.getFigure(this.node.getId());

        var layouter = new graphiti.layout.mesh.ExplodeLayouter();
        this.proposedChanges = layouter.add(this.canvas, addedFigure);

        var nx = this.x-addedFigure.getWidth()/2;
        var ny = this.y-addedFigure.getHeight()/2;
        this.node.setPosition(nx,ny);

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
	    
	    for(var i=0; i< this.proposedChanges.getSize(); i++){
	    	var c = this.proposedChanges.get(i);
	    	var f=c.getFigure();
		    var myTweenable = new Tweenable();
		    myTweenable.figure = f;
		    myTweenable.tween({
		    	  from:       {x:f.getX()          , y: f.getY() }, 
		    	  to:         {x:f.getX()+c.getX() , y: f.getY()+c.getY()  },
		    	  duration:   300,
		    	  easing:     'easeInOutExpo', 
		    	  step: $.proxy(function (s) {
		    		  this.figure.setPosition(s.x,s.y);
		    	  }, myTweenable)
		    	});
		    	
	    }
	    this.canvas.setCurrentSelection(null);


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
	    for(var i=0; i< this.proposedChanges.getSize(); i++){
	    	var c = this.proposedChanges.get(i);
	    	c.getFigure().translate(-c.getX(),-c.getY());
	    }
	}
});

