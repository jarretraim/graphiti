
/**
 * @class graphiti.shape.node.End
 * A simple Node which has a InputPort. Mainly used for demo and examples.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new graphiti.shape.node.End();
 *     figure.setColor("#3d3d3d");
 *     
 *     canvas.addFigure(figure,50,10);
 *     
 * @extends graphiti.shape.basic.Rectangle
 */
graphiti.shape.node.End = graphiti.shape.basic.Rectangle.extend({

	DEFAULT_COLOR : new graphiti.util.Color("#4D90FE"),
	
    init : function()
    {
        this.inputPort = null;

        this._super();

        this.setDimension(50, 50);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.setColor(this.DEFAULT_COLOR.darker());
    },
    
    setCanvas : function(canvas)
    {
        this._super(canvas);

        if (canvas !== null && this.inputPort === null)
        {
            this.inputPort = this.createPort(canvas,"input","input");
            this.inputPort.setCanvas(canvas);
            this.addPort(this.inputPort,0, this.height / 2);
        }
    },
    
    /**
     * @inheritdoc
     *
     * @param {Number} w The new width of the figure
     * @param {Number} h The new height of the figure
     **/
    setDimension:function(w, h)
    {
    	this._super(w,h);
    	
    	if(this.inputPort !==null){
            this.inputPort.setPosition(0, this.height / 2);
    	}
    }

});
