
/**
 * @class graphiti.shape.note.PostIt
 * Simple Post-it like figure with text.
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



