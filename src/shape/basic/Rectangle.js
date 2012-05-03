
/**
 * @class graphiti.shape.basic.Rectangle
 * A Rectangle Figure.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var rect1 =  new graphiti.shape.basic.Rectangle();
 *     var rect2 =  new graphiti.shape.basic.Rectangle();
 *     
 *     canvas.addFigure(rect1,10,10);
 *     canvas.addFigure(rect2,100,10);
 *     
 *     rect2.setBackgroundColor("#f0f000");
 *     rect2.setAlpha(0.7);
 *     rect2.setDimension(100,60);
 *     rect2.setRadius(10);
 *     
 *     canvas.setCurrentSelection(rect2);
 *     
 * @author Andreas Herz
 * @extends graphiti.VectorFigure
 */
graphiti.shape.basic.Rectangle = graphiti.VectorFigure.extend({
    NAME : "graphiti.shape.basic.Rectangle", // only for debugging

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
        this.setDimension(50, 90);
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
    },
    
    
    
    /**
     * @method 
     * Return an objects with all important attributes for XML or JSON serialization
     * 
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        var memento = this._super();
        
        memento.radius = this.radius;
        
        return memento;
    }
});