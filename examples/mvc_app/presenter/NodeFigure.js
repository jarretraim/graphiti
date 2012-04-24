
example.mvc_simple.NodeFigure = graphiti.Rectangle.extend({

    init : function()
    {
        this._super();
        this.outputPort = null;
        this.inputPort = null;
        this.setDimension(50, 50);
        this.setResizeable(false);
        this.setAlpha(0.5);
    },


    /**
     * @method
     * Set the canvas for this figure. This is the best point to ad some Ports
     * 
     * @param {graphiti.Canvas} canvas
     */
    setCanvas : function(canvas)
    {
        this._super(canvas);

        if (canvas !== null)
        {
            if(this.outputPort===null)
                this.outputPort = new example.mvc_simple.OutputPort(canvas);
            this.addPort(this.outputPort, this.width,this.height/2);

            if(this.inputPort===null)
            	this.inputPort = new example.mvc_simple.InputPort(canvas);
            this.addPort(this.inputPort, 0,this.height/2);
        }
        else if(this.outputPort!==null){
            this.outputPort.setCanvas(null);
            this.inputPort.setCanvas(null);
        }
    },


    updateViewFromModel : function() {
		this._super();
		var pos = this.getModel().getPosition();
		this.setPosition(pos.getX(), pos.getY());
		// this.initPorts();
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
