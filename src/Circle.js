/**
 * @class graphiti.Circle
 * The base class for all visible elements inside a canvas.
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.Oval
 */
graphiti.Circle = graphiti.Oval.extend({
    
    
    init:function( radius)
    {
      this._super();
      if(radius)
        this.setDimension(radius,radius);
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
      if(w>h)
         this._super(w,w);
      else
         this._super(h,h);
    },
    
    /**
     * @method
     * A Circle can't streched. In this case this method returns always false. So - no resize handles at the top, 
     * bottom,left and the right are visible.<br>
     *
     * @return {boolean} Returns always false. It is not possible to strech a circle.
     */
    isStrechable:function()
    {
      return false;
    }

});