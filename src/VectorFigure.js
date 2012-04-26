
/**
 * @class graphiti.VectorFigure
 * The base class for all visible elements inside a canvas.
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.Node
 */
graphiti.VectorFigure = graphiti.Node.extend({
    NAME : "graphiti.VectorFigure", // only for debugging

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     */
    init : function()
    {
        this.bgColor =  new graphiti.util.Color(100, 100, 100);
        this.color = new graphiti.util.Color(0, 0, 0);
        this.stroke = 1;

        this._super();
    },
      

   /**
    * @method
    * propagate all attributes like color, stroke,... to the shape element
    **/
    repaint : function(attributes)
    {
        if (this.shape === null){
            return;
        }

        if(typeof attributes === "undefined" ){
            attributes = {};
        }

        attributes.x= this.getAbsoluteX();
        attributes.y = this.getAbsoluteY();
        attributes.stroke = "#" + this.color.hex();
        attributes["stroke-width"] = this.stroke;
        
        if(typeof attributes.fill === "undefined"){
           if(this.bgColor!==null){
        	   attributes.fill = "#" + this.bgColor.hex();
           }
           else{
               attributes.fill ="none";
           }
        }
     
        this._super(attributes);
    },


   /**
    * @method
    * Set the new background color of the figure. It is possible to hands over
    * <code>null</code> to set the background transparent.
    *
    * @param {graphiti.util.Color} color The new background color of the figure
    **/
    setBackgroundColor : function(color)
    {
        if (color instanceof graphiti.util.Color) {
            this.bgColor = color;
        }
        else if (typeof color === "string") {
            this.bgColor = new graphiti.util.Color(color);
        }
        else {
            this.bgColor = null;
        }

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
   setStroke:function( w )
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
    * @mehod
    * Set the color of the line.
    * This method fires a <i>document dirty</i> event.
    * 
    * @param {graphiti.util.Color} color The new color of the line.
    **/
   setColor:function( color)
   {
     if(color instanceof graphiti.util.Color){
         this.color = color;
     }
     else if(typeof color === "string"){
         this.color = new graphiti.util.Color(color);
     }
     else{
         // set good default
         this.color = new graphiti.util.Color(0,0,0);
     }
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
     return this.color;
   }

});

