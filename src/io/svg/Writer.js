

/**
 * @class graphiti.io.svg.Writer
 * 
 * Serialize the canvas document into a SVG document.
 * 
 *      // Create a SVG writer and convert the canvas into a SVG document.
 *      //
 *      var writer = new graphiti.io.svg.Writer();
 *      var svg = writer.marshal(canvas);
 *      
 *      // insert the svg string into a DIV for preview or post
 *      // it via ajax to the server....
 *      $("#svg").text(svg);
 *
 * 
 * @author Andreas Herz
 * @extends graphiti.io.Writer
 */
graphiti.io.svg.Writer = graphiti.io.Writer.extend({
    
    init:function(){
        this._super();
    },
    
    /**
     * @method
     * Export the content of the canvas into SVG. The SVG document can be loaded with Inkscape or any other SVG Editor.
     * 
      * @param {graphiti.Canvas} canvas
     * @returns {String} the SVG document
     */
    marshal: function(canvas){
        var s =canvas.getCurrentSelection();
        canvas.setCurrentSelection(null);
        var svg = canvas.getHtmlContainer().html()
                     .replace(/>\s+/g, ">")
                     .replace(/\s+</g, "<");
        svg = this.formatXml(svg);
        svg = svg.replace(/<desc>.*<\/desc>/g,"<desc>Create with graphiti JS graph library and RaphaelJS</desc>");
        
        canvas.setCurrentSelection(s);
        return svg;
    }
});