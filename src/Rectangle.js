
/**
 * @class graphiti.Rectangle
 * A Rectangle Figure.
 * 
 * @author Andreas Herz
 * @extends graphiti.VectorFigure
 */
graphiti.Rectangle = graphiti.VectorFigure.extend({
    NAME : "graphiti.Rectangle", // only for debugging

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     */
    init: function( width, height) {
      this._super();

      // corner radius
      this.radius = 2;
      
      this.setBackgroundColor( new graphiti.util.Color(0,0,0));
      this.setColor(new graphiti.util.Color(50,50,50));

      // set some good defaults
      //
      if(typeof width === "undefined"){
        this.setDimension(10, 10);
      }
      else{
        this.setDimension(width, height);
      }
    },
    
    /**
     * @inheritdoc
     **/
    repaint : function(attributes)
    {
        if(this.shape===null){
            return;
        }
        
        if (typeof attributes === "undefined") {
            attributes = {};
        }

        attributes.width = this.getWidth();
        attributes.height = this.getHeight();
        attributes.r = this.radius;
        this._super(attributes);
    },

    /**
     * @inheritdoc
     */
    createShapeElement : function()
    {
       return this.canvas.paper.rect(this.getX(),this.getY(),this.getWidth(), this.getHeight());
    },

    /**
     * @method
     * Sets the corner radius for rectangles with round corners. 
     * 
     * @param {Number} radius
     */
     setRadius: function(radius){
        this.radius = radius;
        this.repaint();
    },
    
    /**
     * @method
     * Indicates the corner radius for rectangles with round corners. The default is 2. 
     * 
     * @return {Number}
     */
    getRadius:function(){
        return this.radius;
    }
});