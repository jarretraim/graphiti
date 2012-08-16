
/**
 * @class graphiti.SetFigure
 * 
 * A SetFigure is a composition of different SVG elements.
 * 
 * @author Andreas Herz
 * @extends graphiti.shape.basic.Rectangle
 */
graphiti.SetFigure = graphiti.shape.basic.Rectangle.extend({
    
    NAME : "graphiti.SetFigure",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     */
    init: function( width, height) {
      // collection of SVG DOM nodes
      this.svgNodes=null;
      this.originalWidth = 1;
      this.originalHeight= 1;
      
      this._super( width, height);

 //     this.setResizeable(false);
      this.setStroke(0);
      this.setBackgroundColor(null); 
    },
    
    /**
     * @method
     * Set/Reset the cnavas for the element.
     * 
     * @param {graphiti.Canvas} canvas the canvas to use
     */
    setCanvas: function( canvas )
    {
      // remove the shape if we reset the canvas and the element
      // was already drawn
      if(canvas===null && this.svgNodes!==null){
         this.svgNodes.remove();
         this.svgNodes=null;
      }
      
      this._super(canvas);
     },
 
    /**
     * @method
     * propagate all attributes like color, stroke,... to the shape element
     **/
    repaint : function(attributes)
    {
        var scaleX =  this.width / this.originalWidth;
        var scaleY =  this.height / this.originalHeight;
        
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }
        
        if (typeof attributes === "undefined") {
            attributes = {};
        }
        
        if(this.svgNodes!==null){
            
            this.svgNodes.transform("s"+scaleX+","+scaleY+","+this.getAbsoluteX()+","+this.getAbsoluteY()+" t"+this.getAbsoluteX()+","+this.getAbsoluteY());
        }
        
        this._super(attributes);
    },

    /**
     * @private
     */
    createShapeElement : function()
    {
       // NOTE: don't change the order of the two calles. This defines the z-oder in the canvas.
       // The "set" should always be on top.
       var shape= this.canvas.paper.rect(this.getX(),this.getY(),this.getWidth(), this.getHeight());
       this.svgNodes = this.createSet();
       
       this.originalWidth = this.svgNodes.getBBox().width;
       this.originalHeight= this.svgNodes.getBBox().height;
       
       this.width  = this.originalWidth;
       this.height = this.originalHeight;

       return shape;
    },
    
    /**
     * @method
     * Override this method to add your own SVG elements. Ssee {@link graphiti.shape.basic.Label} as example.
     * 
     * @template
     */
    createSet: function()
    {
    	return this.canvas.paper.set(); // return empty set as default;
    },
    
});