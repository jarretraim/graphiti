
/**
 * @class graphiti.io.Writer
 * Serialize the canvas to an external format. This is only a template/interface class.
 * Inherit classes must implement the export format.
 * 
 * @author Andreas Herz
 */
graphiti.io.Writer = Class.extend({
    
    init:function(){
        
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
        
        return "";
    }
});