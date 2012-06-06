/**
 * @class graphiti.shape.node.Between
 * A simple Node which has a  InputPort and OutputPort. Mainly used for demo and examples.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new graphiti.shape.node.Between();
 *     figure.setColor("#3d3d3d");
 *     
 *     canvas.addFigure(figure,50,10);
 *     
 * @extends graphiti.shape.basic.Rectangle
 */
graphiti.shape.node.Between = graphiti.shape.basic.Rectangle.extend({

    NAME : "graphiti.shape.node.Between",

    DEFAULT_COLOR : new graphiti.util.Color("#4D90FE"),

	init : function()
    {
        this._super();
        
        this.setDimension(50, 50);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.setColor(this.DEFAULT_COLOR.darker());

        this.createPort("output");
        this.createPort("input");
    }

});
