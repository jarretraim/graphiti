/**
 * @class graphiti.geo.Rectangle
 * 
 * Util class for geometrie handling.
 * 
 * @inheritable
 * @author Andreas Herz
 * 
 * @extends graphiti.geo.Point
 */
graphiti.geo.Rectangle = graphiti.geo.Point.extend({

    /**
     * @constructor 
     * Creates a new Point object with the hands over coordinates.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    init : function( x, y,  w, h)
    {
    	this._super(x,y);
        this.w = w;
        this.h = h;
    },
	
	/**
	 * @method
	 * Moves this Rectangle horizontally by dx and vertically by dy, then returns 
	 * this Rectangle for convenience.<br>
	 * <br>
	 * The method return the object itself. This allows you to do command chaining, where 
	 * you can perform multiple methods on the same elements.
	 *
	 * @param {Number} dx  Shift along X axis
	 * @param {Number} dy  Shift along Y axis
	 * 
	 * @return  {graphiti.geo.Rectangle} The method return the object itself
	 **/
	translate:function( dx,  dy)
	{
	  this.x +=dx;
	  this.y +=dy;
	  return this;
	},
	
	/**
	 * @method
	 * Resizes this Rectangle by the values supplied as input and returns this for 
	 * convenience. This Rectangle's width will become this.width + dw. This 
	 * Rectangle's height will become this.height + dh.
	 * <br>
	 * The method return the object itself. This allows you to do command chaining, where 
	 * you can perform multiple methods on the same elements.
	 *
	 *
	 * @param {Number} dw  Amount by which width is to be resized
	 * @param {Number} dh  Amount by which height is to be resized
	 * 
	 * @return  {graphiti.geo.Rectangle} The method return the object itself
	 **/
	resize:function(/*:int*/ dw, /*:int*/ dh)
	{
	  this.w +=dw;
	  this.h +=dh;
	  return this;
	},
	
	/**
	 * Sets the parameters of this Rectangle from the Rectangle passed in and
	 * returns this for convenience.<br>
	 * <br>
	 * The method return the object itself. This allows you to do command chaining, where 
	 * you can perform multiple methods on the same elements.
	 *
	 * @param {graphiti.geo.Rectangle} Rectangle providing the bounding values
	 * 
	 * @return  {graphiti.geo.Rectangle} The method return the object itself
	 */
	setBounds:function( rect)
	{
	   this.x = rect.x;
	   this.y = rect.y;
	   this.w = rect.w;
	   this.h = rect.h;
	   return this;
	},
	
	/**
	 * @method
	 * Returns <code>true</code> if this Rectangle's width or height is less than or
	 * equal to 0.
	 * 
	 * @return {Boolean}
	 */
	isEmpty:function()
	{
	  return this.w <= 0 || this.h <= 0;
	},
	
	/**
	 * @method
	 * The width of the dimension element.
	 * 
	 * @return {Number}
	 **/
	getWidth:function()
	{
	  return this.w;
	},
	
	/**
	 * @method
	 * The height of the dimension element.
	 * 
	 * @return {Number}
	 **/
	getHeight:function()
	{
	  return this.h;
	},
	
	/**
	 * @method
	 * The x coordinate of the right corner.
	 * 
	 * @return {Number}
	 **/
	getRight:function()
	{
	  return this.x+this.w;
	},
	
	/**
	 * @method
	 * The y coordinate of the bottom.
	 * 
	 *@return {Number}
	 **/
	getBottom:function()
	{
	  return this.y+this.h;
	},
	
	/**
	 * @method
	 * The top left corner of the dimension object.
	 * 
	 * @return {graphiti.geo.Point} a new point objects which holds the coordinates
	 **/
	getTopLeft:function()
	{
	  return new graphiti.geo.Point(this.x,this.y);
	},
	
	/**
	 * @method
	 * The center of the dimension object
	 * 
	 * @return {graphiti.geo.Point} a new point which holds the center of the object
	 **/
	getCenter:function()
	{
	  return new graphiti.geo.Point(this.x+this.w/2,this.y+this.h/2);
	},
	
	
	/**
	 * @method
	 * Bottom right corner of the object
	 * 
	 * @return {graphiti.geo.Point} a new point which holds the bottom right corner
	 **/
	getBottomRight:function()
	{
	  return new graphiti.geo.Point(this.x+this.w,this.y+this.h);
	},
	
	
	/**
	 * @method
	 * Compares two Dimension objects
	 * 
	 * @param {graphiti.geo.Rectangle}
	 *@return {Boolean}
	 **/
	equals:function( o)
	{
	  return this.x==o.x && this.y==o.y && this.w==o.w && this.h==o.h;
	}

});
