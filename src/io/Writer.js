

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
     * @returns {String}
     */
    marshal: function(canvas){
        
        return "";
    }
});