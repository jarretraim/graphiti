
graphiti.shape.node.Between = graphiti.shape.basic.Rectangle.extend({

	DEFAULT_COLOR : new graphiti.util.Color("#4D90FE"),

	init : function()
    {
        this._super();
        this.outputPort = null;
        this.inputPort = null;
        this.setDimension(50, 50);
        this.setResizeable(false);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.setColor(this.DEFAULT_COLOR.darker());
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
    }
    

});
