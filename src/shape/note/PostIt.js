
/**
 * @class graphiti.shape.note.PostIt
 * Simple Post-it like figure with text.
 * 
 * @author Andreas Herz
 * @extends graphiti.Label
 */
graphiti.shape.note.PostIt= graphiti.Label.extend({

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
        this.setBackgroundColor("#d3d3d3");
        this.setColor("#000000");
        this.setFontSize(18);
        this.setPadding(5);
       
    }
});



