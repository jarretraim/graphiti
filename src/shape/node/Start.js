
/**
 * @class graphiti.shape.node.Start
 * 
 * A simple Node which has an OutputPort.
 * 
 * @extends graphiti.shape.basic.Rectangle
 */
graphiti.shape.node.Start = graphiti.shape.basic.Rectangle.extend({

	DEFAULT_COLOR : new graphiti.util.Color("#4D90FE"),

	init : function()
    {
        this.outputPort = null;

        this._super();
        
        this.setDimension(50, 50);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.setColor(this.DEFAULT_COLOR.darker());
    },
    
    /**
     * @inheritdoc
     *
     **/
     setCanvas : function(canvas)
    {
        this._super(canvas);

        if (canvas !== null && this.outputPort === null)
        {
            this.outputPort = this.createPort(canvas,"output","output");
            this.outputPort.setCanvas(canvas);
            this.addPort(this.outputPort,this.width,this.height/2);
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
    	if(this.outputPort !==null){
            this.outputPort.setPosition(this.width,this.height/2);
    	}
    }


});
