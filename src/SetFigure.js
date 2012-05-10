
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
    init: function() {
      this._super();

      this.setResizeable(false);
      this.setStroke(0);
      this.setBackgroundColor(null); 
      // collection of SVG DOM nodes
      this.svgNodes=null;
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
        if(this.shape===null){
            return;
        }
        
        if (typeof attributes === "undefined") {
            attributes = {};
        }
        
        if(this.svgNodes!==null){
            this.svgNodes.transform("t"+this.x+","+this.y);
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
       var shape= this.canvas.paper.rect(this.getX(),this.getY(),this.getWidth(), this.getHeight());;
       this.svgNodes = this.createSet();
       
       return shape;
    },
    
    /**
     * @method
     * Override this method to add your own SVG elements. Ssee {@link graphiti.shape.basic.Label} as example.
     * 
     * @template
     */
    createSet: function(){
    	return this.canvas.paper.set(); // return empty set as default;
    },
    
    /**
     * @method
     * Return the calculate width of the set. This calculates the bounding box of all elements.
     * 
     * @return {Number} the calculated width of the label
     **/
	getWidth : function() {
		if (this.shape === null) {
			return 0;
		}
		return Math.max(this.svgNodes.getBBox().width,this.shape.getBBox().width);
	},
    
    /**
     * @method
     * Return the calculated height of the set. This calculates the bounding box of all elements.
     * 
	 * @return {Number} the calculated height of the label
	 */
    getHeight:function()
    {
        if (this.shape === null) {
            return 0;
        }
        return Math.max(this.svgNodes.getBBox().height,this.shape.getBBox().height);
    }

});