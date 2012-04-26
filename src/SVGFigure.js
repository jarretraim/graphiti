
/**
 * @class graphiti.SVGFigure
 * Abstract class which can handle plain SVG content. Inherit class must override the method
 * <code>getSVG()</code>.
 * 
 * @author Andreas Herz
 * @extends graphiti.Rectangle
 */
graphiti.SVGFigure = graphiti.SetFigure.extend({
    
    NAME : "graphiti.SVGFigure", // only for debugging

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     */
    init: function() {
      this._super();

    },

    /**
     * @private
     * @returns
     */
    createSet : function() {
		return this.importSVG(this.canvas, this.getSVG());
	},
    
	
    /**
     * @private
     */
    importSVG : function (canvas, rawSVG) {
      
        var set = canvas.paper.set();
        
       
      try {
        if (typeof rawSVG === 'undefined'){
          throw 'No data was provided.';
        }
        
        rawSVG = rawSVG.replace(/\n|\r|\t/gi, '');
        
        if (!rawSVG.match(/<svg(.*?)>(.*)<\/svg>/i)){
          throw "The data you entered doesn't contain valid SVG.";
        }
        
        var findDim   = new RegExp('<svg width="(.*?)" height="(.*?)" .*?>','gi');
        if(match=findDim.exec(rawSVG)){
            this.setDimension(parseInt(match[1]), parseInt(match[2]));
        }
        
        var findAttr  = new RegExp('([a-z\-]+)="(.*?)"','gi');
        var findStyle = new RegExp('([a-z\-]+) ?: ?([^ ;]+)[ ;]?','gi');
        var findNodes = new RegExp('<(rect|polyline|circle|ellipse|path|polygon|image|text).*?\/>','gi');
        
        while(match = findNodes.exec(rawSVG)){      
          var shape=null;
          var style=null;
          var attr = { 'fill':'#000' };
          var node = RegExp.$1;
          
          while(findAttr.exec(match)){
            switch(RegExp.$1) {
              case 'stroke-dasharray':
                attr[RegExp.$1] = '- ';
              break;
              case 'style':
                style = RegExp.$2;
              break;
              default:
                attr[RegExp.$1] = RegExp.$2;
              break;
            }
          };
          
          if (typeof attr['stroke-width'] === 'undefined'){
            attr['stroke-width'] = (typeof attr['stroke'] === 'undefined' ? 0 : 1);
          }
          
          if ( style !== null){
            while(findStyle.exec(style))
              attr[RegExp.$1] = RegExp.$2;
          }
         switch(node) {
            case 'rect':
              shape = canvas.paper.rect();
            break;
            case 'circle':
              shape = canvas.paper.circle();
            break;
            case 'ellipse':
              shape = canvas.paper.ellipse();
            break;
            case 'path':
              shape = canvas.paper.path(attr['d']);
            break;
            case 'polygon':
              shape = canvas.paper.polygon(attr['points']);
            break;
            case 'image':
              shape = canvas.paper.image();
              break;
            break;
            //-F case 'text':
            //-F   shape = this.text();
            //-F break;
          }
          if(shape!=null){
              shape.attr(attr);
              set.push(shape);
          }
        };
      } catch (error) {
        alert('The SVG data you entered was invalid! (' + error + ')');
      }
      return set;
    }

});