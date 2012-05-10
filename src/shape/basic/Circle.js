

/**
 * @class graphiti.shape.basic.Circle
 * A circle figure with basic background and stroke API. <br>
 * A circle can not be streched. <strong>The aspect ration is always 1:1</strong>.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var shape =  new graphiti.shape.basic.Circle();
 *     shape.setStroke(3);
 *     shape.setColor("#3d3d3d");
 *     shape.setBackgroundColor("#3dff3d");
 *     
 *     canvas.addFigure(shape,40,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.shape.basic.Oval
 */
graphiti.shape.basic.Circle = graphiti.shape.basic.Oval.extend({
    
    NAME : "graphiti.shape.basic.Circle", 
    
    /**
     * @constructor
     * Create a new circle figure.
     * 
     * @param {Number} [radius] the initial radius for the circle
     */
    init:function( radius)
    {
      this._super();
      if(typeof radius === "number"){
        this.setDimension(radius,radius);
      }
      else {
         this.setDimension(40,40);
      }
    },
    
    
    /**
     * @method
     * It is not possible to set different values width and height for a circle. The 
     * greater value of w and h will be used only.
     * 
     * @param {Number} w The new width of the circle.
     * @param {Number} h The new height of the circle.
     **/
    setDimension:function( w,  h)
    {
      if(w>h){
         this._super(w,w);
      }
      else{
         this._super(h,h);
      }
    },
    
    /**
     * @method
     * A Circle can't be streched. The aspect ratio is always 1:1<br>
     *
     * @return {boolean} Returns always false. It is not possible to strech a circle.
     */
    isStrechable:function()
    {
      return false;
    }

});