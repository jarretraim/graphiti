
/**
 * @class graphiti.shape.node.Start
 * 
 * A generic Node which has an OutputPort. Mainly used for demo and examples.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new graphiti.shape.node.Start();
 *     figure.setColor("#3d3d3d");
 *     
 *     canvas.addFigure(figure,50,10);
 *     
 * @extends graphiti.shape.basic.Rectangle
 */
graphiti.shape.node.Start = graphiti.shape.basic.Rectangle.extend({

    NAME : "graphiti.shape.node.Start",

	DEFAULT_COLOR : new graphiti.util.Color("#4D90FE"),

	init : function()
    {
        this._super();
        
        this.createPort("output");

        this.setDimension(50, 50);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.setColor(this.DEFAULT_COLOR.darker());
    }
    
    
});
