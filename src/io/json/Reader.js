

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
        var node=null;
        var port=null;
        $.each(json, function(i, element){
            var o = eval("new "+element.type+"()");
            var source= null;
            var target=null;
            for(i in element){
                var val = element[i];
                if(i === "source"){
                    node = canvas.getFigure(val.node);
                    source = node.getPort(val.port);
                }
                else if (i === "target"){
                    node = canvas.getFigure(val.node);
                    target = node.getPort(val.port);
                }
                else {
                    o[i] = val;
                }
            }
            if(source!==null && target!==null){
                o.setSource(source);
                o.setTarget(target);
            }
            
            canvas.addFigure(o, element.x, element.y);
        });
    }
});