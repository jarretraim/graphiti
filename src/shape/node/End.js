
graphiti.shape.node.End = graphiti.shape.basic.Rectangle.extend({

	DEFAULT_COLOR : new graphiti.util.Color("#4D90FE"),
	
    init : function()
    {
        this._super();
        this.inputPort = null;
        this.setDimension(50, 50);
        this.setResizeable(false);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.setColor(this.DEFAULT_COLOR.darker());
    },
    
    setCanvas : function(canvas)
    {
        this._super(canvas);

        if (canvas !== null && this.inputPort === null)
        {
            this.inputPort = new graphiti.InputPort(canvas,"input");
            this.inputPort.setCanvas(canvas);
            this.addPort(this.inputPort, 0, this.height / 2);
        }
    }

});
