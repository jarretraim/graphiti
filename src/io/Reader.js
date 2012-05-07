
/**
 * @class graphiti.io.Reader
 * Template class for general import of a document into the canvas.
 * 
 * @author andreas Herz
 */

graphiti.io.Reader = Class.extend({
    
    /**
     * @constructor
     * @private
     */
    init: function(){
        
    },
    
    /**
     * @method
     * 
     * Restore the canvas from a given String.
     * 
     * @param {graphiti.Canvas} canvas the canvas to restore
     * @param {Object} document the document to read
     * @template
     */
    unmarshal: function(canvas, document){
        // do nothing. Inherit classes must implement this method
    }
});