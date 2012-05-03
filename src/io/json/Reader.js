

graphiti.io.json.Reader = graphiti.io.Reader.extend({
    
    init: function(){
        this._super();
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
    unmarshal: function(canvas, json){
        $.each(json, function(i, element){
            var o = eval("new "+element.type+"()");
            for(i in element){
                o[i] = element[i];
            }
            canvas.addFigure(o, element.x, element.y);
        });
    }
});