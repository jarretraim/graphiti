
example.connection_drop.End = graphiti.Rectangle.extend({

    init : function()
    {
        this._super();
        this.inputPort = null;
        this.setDimension(50, 50);
        this.setResizeable(false);
        this.setAlpha(0.5);
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
