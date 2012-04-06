/**
 * @class graphiti.VectorFigure
 * The base class for all visible elements inside a canvas.
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.Figure
 */
graphiti.VectorFigure = graphiti.Figure.extend({
    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     */
    init: function( ) {
        this._super( );
        this.bgColor = null;
        this.shape = null;
        this.alpha =1;
        this.lineColor = new  graphiti.util.Color(0,0,0);
        this.stroke=1;
   },
      

   /**
    * @method
    * propagate all attributes like color, stroke,... to the shape element
    **/
    repaint : function(attributes)
    {
        if (this.shape === null)
            return;

        if(typeof attributes === "undefined" )
            attributes = {};
        
        this._super();

        attributes.x= this.x;
        attributes.y = this.y;
        attributes.opacity= this.alpha;
        attributes["stroke-width"] = this.stroke;
        attributes.fill = "#" + this.bgColor.hex();
        this.shape.attr(attributes);
    },

   /**
     * @method 
     * Set the alpha blending of this figure.
     * @param {Number} percent Value between [0..1].
     */
   setAlpha:function( percent)
   {
     this.alpha = percent;
     this.repaint();
   },

   /**
    * @method
    * Set the new background color of the figure. It is possible to hands over
    * <code>null</code> to set the background transparent.
    *
    * @param {graphiti.util.Color} color The new background color of the figure
    **/
   setBackgroundColor: function( color)
   {
     if(color == null)
       this.bgColor = new graphiti.util.Color(255,255,255,0.1);
     else
       this.bgColor = color;
       
     this.repaint();
   },

   /**
    * @method
    * The current used background color.
    * 
    * @return {graphiti.util.Color}
    */
   getBackgroundColor:function()
   {
     return this.bgColor;
   },

   /**
    * @method
    * Set the stroke to use.
    * 
    * @param {Number} w The new line width of the figure
    **/
   setLineWidth:function( w )
   {
     this.stroke=w;
     this.repaint();
   },

   /**
    * @method
    * The current use line width.
    * 
    * @type {Number}
    **/
   getLineWidth:function( )
   {
     return this.stroke;
   },

   /**
    * @method
    * Set the foreground color to use
    * 
    * @param {graphiti.util.Color} color The new line / border color of the figure.
    **/
   setColor: function(  color)
   {
     if(color == null)
       this.lineColor = new graphiti.util.Color(255,255,255,0);
     else
       this.lineColor = color;
       
     this.repaint();
   },

   /**
    * @method
    * The current used forground color
    * 
    * @returns {graphiti.util.Color}
    */
   getColor:function()
   {
     return this.lineColor;
   }

});

