
example.connection_drop.BetweenFigure = graphiti.Rectangle.extend({

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
                this.outputPort = new graphiti.OutputPort(canvas);
            this.addPort(this.outputPort, this.width,this.height/2);

            if(this.inputPort===null)
            	this.inputPort = new graphiti.InputPort(canvas);
            this.addPort(this.inputPort, 0,this.height/2);
        }
        else if(this.outputPort!==null){
            this.outputPort.setCanvas(null);
            this.inputPort.setCanvas(null);
        }
    },
    
    /**
     * @method
     * Called if the user drop this element onto the dropTarget. 
     * 
     * @param {graphiti.Figure} dropTarget The drop target.
     * @private
     **/
    onDrop:function(dropTarget)
    {
    	if(dropTarget instanceof graphiti.Connection){
    		var oldSource = dropTarget.getSource();
    		dropTarget.setSource(this.outputPort);
   		
    		var additionalConnection = new graphiti.Connection();
    		this.getCanvas().addFigure(additionalConnection);
    		additionalConnection.setSource(oldSource);
    		additionalConnection.setTarget(this.inputPort);
    	}
    }
    


});
