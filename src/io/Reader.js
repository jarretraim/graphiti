

graphiti.io.Reader = Class.extend({
    
    init: function(){
        
    },
    
    /**
     * @method
     * 
     * Restore the canvas from a given String.
     * 
     * @param {graphiti.Canvas} canvas the canvas to restore
     * @param {String} document the document to read
     * @template
     */
    unmarshal: function(canvas, document){
        // do nothing. Inherit classes must implement this method
    }
});