
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
	    
	    var dropTarget = this.canvas.getBestLine(this.x, this.y);

	    // check if the user has dropped the node onto a connection -> infix
	    // this node into the existing connection
	    //
	    var addedFigure = this.canvas.getFigure(this.node.getId());
	    var layouter = new graphiti.layout.mesh.ExplodeLayouter();
	    
	    this.proposedChanges = layouter.add(this.canvas, addedFigure);

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
		    	  from:       {x:f.getX() , y: f.getY() },            // Object.  Contains the properties to tween.  Must all be `Number`s.  Note: This object's properties are modified by the tween.
		    	  to:         {x:f.getX()+c.getX() , y: f.getY()+c.getY()  },            // Object.  The "destination" `Number`s that the properties in `from` will tween to.
		    	  duration:   300,            // Number.  How long the tween lasts for, in milliseconds.
		    	  easing:     'swingFromTo',        // String or Object.  Easing equation(s) to use.  You can specify any easing method that was attached to `Tweenable.prototype.formula`.
		    	  start:      function () {},  // Function.  Runs as soon as the tween begins.  Handy when used with the `queue` extension.
		    	  step:       $.proxy(function (s) {
		    		 // console.log(this);
		    		  this.figure.setPosition(s.x,s.y);
		    	  }, myTweenable),  // Function.  Runs each "frame" that the tween is updated.
		    	  callback:   function () {}   // Function.  Runs when the tween completes.
		    	});
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
	    for(var i=0; i< this.proposedChanges.getSize(); i++){
	    	var c = this.proposedChanges.get(i);
	    	c.getFigure().translate(-c.getX(),-c.getY());
	    }
	}
});

