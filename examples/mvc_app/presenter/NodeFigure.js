
example.mvc_simple.NodeFigure = graphiti.shape.node.Between.extend({

    init : function()
    {
        this._super();

        this.setResizeable(false);
    },

    /**
     * @method
     * Create a standard InputPort for this element. Inherited class can override this
     * method to create its own type of ports.
     * 
     * @param {grpahiti.Canvas} canvas the canvas to use
     * @param {String} type the type of the requested port. possible ["input", "output"]
     * @param {String} [name] name of the port
     * @template
     */
    createPort: function(canvas, type, name){
    	switch(type){
    	case "input":
    		return new example.mvc_simple.InputPort(canvas);
    	case "output":
    		return new example.mvc_simple.OutputPort(canvas);
    	}
    	
    	throw "Unknown type ["+type+"] of port requested";
    },
 
    /**
     * 
     */
    updateViewFromModel : function() {
		this._super();
		var pos = this.getModel().getPosition();
		this.setPosition(pos.getX(), pos.getY());
	},

    /**
     * @method
     * Called if the user drop this element onto the dropTarget. <br>
     * In our case we split the connection and insert this element.
     * 
     * @param {graphiti.Figure} dropTarget The drop target.
     * @private
     **/
    onDrop:function(dropTarget)
    {
        if(dropTarget instanceof graphiti.Connection){
            var command = new example.mvc_simple.CommandInfix(dropTarget.getModel(), this.getModel());
            this.getCanvas().getCommandStack().execute(command);
        }
    },
    


    /**
	 * Returns the List of the connection model objects for which this Figure's
	 * model is the source. Callers must not modify the returned List. Only
	 * called if you use the MVC pattern of Draw2D
	 * 
	 * @type draw2d.ArrayList
	 * @return the List of model source connections
	 */
    getModelSourceConnections:function()
    {
       return this.getModel().getConnectionModels();
    },

    /**
     * @method
     * Returns the Command to perform the specified Request or null.
      *
     * @param {graphiti.EditPolicy} request describes the Command being requested
     * 
     * @return {graphiti.command.Command} null or a Command
     **/
	createCommand : function(request) {
		switch (request.getPolicy()) {

		case graphiti.EditPolicy.MOVE:
			return new example.mvc_simple.CommandMove(this.canvas, this.model);
		case graphiti.EditPolicy.DELETE:
			return new example.mvc_simple.CommandDelete(this.model);
		}

		return this._super(request);
	}

});
