/**
 * @class graphiti.shape.node.Between
 * A simple Node which has a  InputPort and OutputPort.
 * 
 * @extends graphiti.shape.basic.Rectangle
 */
graphiti.shape.node.Between = graphiti.shape.basic.Rectangle.extend({

	DEFAULT_COLOR : new graphiti.util.Color("#4D90FE"),

	init : function()
    {
        this.outputPort = null;
        this.inputPort = null;

        this._super();
        
        this.setDimension(50, 50);
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
                this.outputPort = this.createPort(canvas,"output","output");
            this.addPort(this.outputPort, this.width,this.height/2);

            if(this.inputPort===null)
                this.inputPort = this.createPort(canvas,"input","input");
            this.addPort(this.inputPort, 0,this.height/2);
        }
        else if(this.outputPort!==null){
            this.outputPort.setCanvas(null);
            this.inputPort.setCanvas(null);
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

    	if(this.outputPort !==null){
            this.outputPort.setPosition(this.width,this.height/2);
    	}
   }

});
