

/**
 * @class graphiti.io.json.Writer
 * Serialize the canvas document into a JSON object which can be read from the corresponding
 * {#link graphiti.io.json.Reader}.
 * 
 * @author Andreas Herz
 * @extends graphiti.io.Writer
 */
graphiti.io.json.Writer = graphiti.io.Writer.extend({
    
    init:function(){
        this._super();
    },
    
    /**
     * @method
     * Export the content to the implemented data format. Inherit class implements
     * content specific writer.
     * 
     * @template
     * @param {graphiti.Canvas} canvas
     * @returns {Object}
     */
    marshal: function(canvas){
        
        var result = [];
        var figures = canvas.getFigures();
        var i =0;
        var f= null;
        
        // conventional iteration over an array
        //
        for(i=0; i< figures.getSize(); i++){
            f = figures.get(i);
             result.push(f.getPersistentAttributes());
        }
        
        // jQuery style to iterate
        //
        var lines = canvas.getLines();
        lines.each(function(i, element){
            result.push(element.getPersistentAttributes());
        });
        
        return result;
    }
});