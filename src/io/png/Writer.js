

/**
 * @class graphiti.io.png.Writer
 * Convert the canvas document into a PNG Image.
 * 
 * @author Andreas Herz
 * @extends graphiti.io.Writer
 */
graphiti.io.png.Writer = graphiti.io.Writer.extend({
    
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
        
        var svg = canvas.getHtmlContainer().html().replace(/>\s+/g, ">").replace(/\s+</g, "<");

        var canvas = $('<canvas id="canvas" width="1000px" height="600px"></canvas>');
        $('body').append(canvas);
        canvg('canvas', svg, { ignoreMouse: true, ignoreAnimation: true});

        var img = document.getElementById('canvas').toDataURL("image/png");
        canvas.remove();
        return img;
    }
});