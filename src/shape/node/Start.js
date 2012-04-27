
graphiti.shape.node.Start = graphiti.shape.basic.Rectangle.extend({

	DEFAULT_COLOR : new graphiti.util.Color("#4D90FE"),

	init : function()
    {
        this._super();
        this.outputPort = null;
        this.setDimension(50, 50);
        this.setResizeable(false);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.setColor(this.DEFAULT_COLOR.darker());
    },
    
    setCanvas : function(canvas)
    {
        this._super(canvas);

        if (canvas !== null && this.outputPort === null)
        {
            this.outputPort = new graphiti.OutputPort(canvas,"output");
            this.outputPort.setCanvas(canvas);
            this.addPort(this.outputPort, this.width,this.height/2);
        }
    }

});
