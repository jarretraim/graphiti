
/**
 * @class graphiti.shape.note.PostIt
 * 
 * Simple Post-it like figure with text. Can be used for annotations or documentation.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var shape =  new graphiti.shape.note.PostIt("This is a simple sticky note");
 *     shape.setColor("#000000");
 *     shape.setPadding(20);
 *          
 *     canvas.addFigure(shape,40,10);
 *     
 * @author Andreas Herz
 * @extends graphiti.shape.basic.Label
 */
graphiti.shape.note.PostIt= graphiti.shape.basic.Label.extend({

	NAME : "graphiti.shape.note.PostIt", // only for debugging

    /**
     * @constructor
     * Creates a new PostIt element.
     * 
     * @param {String} [text] the text to display
     */
    init : function(text)
    {
        this._super(text);
         
        this.setStroke(1);
        this.setBackgroundColor("#3d3d3d");
        this.setColor("#FFFFFF");
        this.setFontColor("#f0f0f0");
        this.setFontSize(18);
        this.setPadding(5);
        this.setRadius(5);
       
    }
});



