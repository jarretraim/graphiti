
/**
 * @class graphiti.Line
 * The base class for all visible elements inside a canvas.
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.Figure
 */
graphiti.Line = graphiti.Figure.extend({
    NAME : "graphiti.Line", // only for debugging

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     */
    init: function( ) {
        this._super();
        
        this.lineColor = new graphiti.util.Color(0,0,0);
        this.stroke=1;
        
        this.startX = 30;
        this.startY = 30;
        
        this.endX   = 100;
        this.endY   = 100;
       
        // click area for the line hit test
        this.corona = 20;

        // a figure can store additional, user defined, properties
        this.properties = {} ; /*:Map<name,value>*/

        this.setSelectable(true);
        this.setDeleteable(true);
   },
      

   /**
    * Set the width for the click hit test of this line.
    *
    * @param {Number} width the width of the line hit test.
    **/
   setCoronaWidth:function(/*:int*/ width)
   {
      this.corona = width;
   },


   /**
    * @method
    * Called by the framework. Don't call them manually.
    * 
    * @private
    **/
   createShapeElement:function()
   {
     return this.canvas.paper.path("M"+this.getStartX()+" "+this.getStartY()+"L"+this.getEndX()+" "+this.getEndY());
   },

   /**
    * @method
    * Trigger the repaint of the element.
    * 
    */
   repaint:function()
   {
       if(this.shape===null){
           return;
       }

       this._super({"stroke":"#"+this.lineColor.hex(),
                  "stroke-width":this.stroke,
                  "path":"M"+this.getStartX()+" "+this.getStartY()+"L"+this.getEndX()+" "+this.getEndY()});
   },
   
   /**
    * A figure can store user defined attributes. This method returns all properties stored in this figure.<br>
    *
    * @see #setProperty
    * @returns All user defined properties of the figure
    * @type Map
    **/
   getProperties:function()
   {
     return this.properties;
   },

   /**
    * A figure can store user defined attributes. This method returns the requested property.<br>
    *
    * @see #setProperty
    * @returns The user defined property of this figure.
    * @type String
    **/
   getProperty:function(/*:String*/ key)
   {
     return this.properties[key];
   },


   /**
    * A figure can store any type of information. You can use this to attach any String or Object to this
    * figure.
    *
    * @see #getProperty
    * @param {String} key The key of the property.
    * @param {String} value The value of the property.
    **/
   setProperty:function(/*:String*/ key,/*:String*/ value)
   {
     this.properties[key]=value;
     this.setDocumentDirty();
   },


   /**
    * You can't drag&drop the resize handles if the line not resizeable.
    * @type boolean
    **/
   isResizeable:function()
   {
     return true;
   },


   /**
    * Set the line width. This enforce a repaint of the line.
    * This method fires a <i>document dirty</i> event.
    *
    * @param {Number} w The new line width of the figure.
    **/
   setLineWidth:function(/*:int*/ w)
   {
     this.stroke=w;
     this.setDocumentDirty();
     
     this.repaint();
   },


   /**
    * @mehod
    * Set the color of the line.
    * This method fires a <i>document dirty</i> event.
    * 
    * @param {graphiti.util.Color} color The new color of the line.
    **/
   setColor:function( color)
   {
     this.lineColor = color;
     this.setDocumentDirty();

     this.repaint();
   },

   /**
    * @method
    * Return the current paint color.
    * 
    * @return {graphiti.util.Color} The paint color of the line.
    **/
   getColor:function()
   {
     return this.lineColor;
   },

   /**
    * @method
    * Set the start point of the line.
    * This method fires a <i>document dirty</i> event.
    *
    * @param {Numer} x the x coordinate of the start point
    * @param {Number} y the y coordinate of the start point
    **/
   setStartPoint:function( x, y)
   {
     if(this.startX===x && this.startY===y){
        return;
     }

     this.startX = x;
     this.startY = y;
     this.repaint();
     this.setDocumentDirty();
   },

   /**
    * Set the end point of the line.
    * This method fires a <i>document dirty</i> event.
    *
    * @param {Number} x the x coordinate of the end point
    * @param {Number} y the y coordinate of the end point
    **/
   setEndPoint:function(/*:int*/x, /*:int*/ y)
   {
     if(this.endX===x && this.endY===y){
        return;
     }

     this.endX = x;
     this.endY = y;
     this.repaint();
     this.setDocumentDirty();
   },

   /**
    * @method
    * Return the x coordinate of the start.
    * 
    * @return {Number}
    **/
   getStartX:function()
   {
     return this.startX;
   },

   /**
    * @method
    * Return the y coordinate of the start.
    * 
    * @return {Number}
    **/
   getStartY:function()
   {
     return this.startY;
   },

   /**
    * @method
    * Return the start point.
    * 
    * @return {graphiti.geo.Point}
    **/
   getStartPoint:function()
   {
     return new graphiti.geo.Point(this.startX,this.startY);
   },


   /**
    * @method
    * Return the x coordinate of the end point
    * 
    * @return {Number}
    **/
   getEndX:function()
   {
     return this.endX;
   },

   /**
    * @method
    * Return the y coordinate of the end point.
    * 
    * @return {Number}
    **/
   getEndY:function()
   {
     return this.endY;
   },

   /**
    * @method
    * Return the end point.
    * 
    * @return {graphiti.geo.Point}
    **/
   getEndPoint:function()
   {
     return new graphiti.geo.Point(this.endX,this.endY);
   },


   /**
    * @method
    * Returns the length of the line.
    * 
    * @return {Number}
    **/
   getLength:function()
   {
     // call native path method if possible
     if(this.shape!==null){
       return this.shape.getTotalLength();
     }
       
     return Math.sqrt((this.startX-this.endX)*(this.startX-this.endX)+(this.startY-this.endY)*(this.startY-this.endY));
   },

   /**
    * @method
    * Returns the angle of the line in degree
    *
    * <pre>
    *                                 270°
    *                               |
    *                               |
    *                               |
    *                               |
    * 180° -------------------------+------------------------> +X
    *                               |                        0°
    *                               |
    *                               |
    *                               |
    *                               V +Y
    *                              90°
    * </pre>
    * @return {Number}
    **/
   getAngle:function()
   {
     var length = this.getLength();
     var angle = -(180/Math.PI) *Math.asin((this.startY-this.endY)/length);

     if(angle<0)
     {
        if(this.endX<this.startX){
          angle = Math.abs(angle) + 180;
        }
        else{
          angle = 360- Math.abs(angle);
        }
     }
     else
     {
        if(this.endX<this.startX){
          angle = 180-angle;
        }
     }
     return angle;
   },

   /**
    * @method
    * Returns the Command to perform the specified Request or null.
    *
    * @param {graphiti.EditPolicy} request describes the Command being requested
    * @return {graphiti.command.Command} null or a Command
    **/
   createCommand:function( request)
   {
     if(request.getPolicy() == graphiti.EditPolicy.MOVE)
     {
       var x1 = this.getStartX();
       var y1 = this.getStartY();
       var x2 = this.getEndX();
       var y2 = this.getEndY();
       return new graphiti.command.CommandMoveLine(this,x1,y1,x2,y2);
     }
     if(request.getPolicy() == graphiti.EditPolicy.DELETE)
     {
        if(this.isDeleteable()===false){
           return null;
        }
        return new graphiti.command.CommandDelete(this);
     }
     return null;
   },

   /**
    * @method
    * Checks if the hands over coordinate close to the line. The 'corona' is considered
    * for this test. This means the point isn't direct on the line. Is it only close to the
    * line!
    *
    * @param {Number} px the x coordinate of the test point
    * @param {Number} py the y coordinate of the test point
    * @return {boolean}
    **/
   hitTest: function( px, py)
   {
     return graphiti.Line.hit(this.corona, this.startX,this.startY, this.endX, this.endY, px,py);
   }

});

/**
 * Static util function to determine is a point(px,py) on the line(x1,y1,x2,y2)
 * A simple hit test.
 * 
 * @return {boolean}
 * @static
 * @private
 * @param {Number} coronaWidth the accepted corona for the hit test
 * @param {Number} X1 x coordinate of the start point of the line
 * @param {Number} Y1 y coordinate of the start point of the line
 * @param {Number} X2 x coordinate of the end point of the line
 * @param {Number} Y2 y coordinate of the end point of the line
 * @param {Number} px x coordinate of the point to test
 * @param {Number} py y coordinate of the point to test
 **/
graphiti.Line.hit= function( coronaWidth, X1, Y1,  X2,  Y2, px, py)
{
  // Adjust vectors relative to X1,Y1
  // X2,Y2 becomes relative vector from X1,Y1 to end of segment
  X2 -= X1;
  Y2 -= Y1;
  // px,py becomes relative vector from X1,Y1 to test point
  px -= X1;
  py -= Y1;
  var dotprod = px * X2 + py * Y2;
  var projlenSq;
  if (dotprod <= 0.0) {
      // px,py is on the side of X1,Y1 away from X2,Y2
      // distance to segment is length of px,py vector
      // "length of its (clipped) projection" is now 0.0
      projlenSq = 0.0;
  } else {
      // switch to backwards vectors relative to X2,Y2
      // X2,Y2 are already the negative of X1,Y1=>X2,Y2
      // to get px,py to be the negative of px,py=>X2,Y2
      // the dot product of two negated vectors is the same
      // as the dot product of the two normal vectors
      px = X2 - px;
      py = Y2 - py;
      dotprod = px * X2 + py * Y2;
      if (dotprod <= 0.0) {
          // px,py is on the side of X2,Y2 away from X1,Y1
          // distance to segment is length of (backwards) px,py vector
          // "length of its (clipped) projection" is now 0.0
          projlenSq = 0.0;
      } else {
          // px,py is between X1,Y1 and X2,Y2
          // dotprod is the length of the px,py vector
          // projected on the X2,Y2=>X1,Y1 vector times the
          // length of the X2,Y2=>X1,Y1 vector
          projlenSq = dotprod * dotprod / (X2 * X2 + Y2 * Y2);
      }
  }
    // Distance to line is now the length of the relative point
    // vector minus the length of its projection onto the line
    // (which is zero if the projection falls outside the range
    //  of the line segment).
    var lenSq = px * px + py * py - projlenSq;
    if (lenSq < 0) {
        lenSq = 0;
    }
    return Math.sqrt(lenSq)<coronaWidth;
};