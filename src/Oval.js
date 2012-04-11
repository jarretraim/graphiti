/**
 * @class graphiti.Oval
 * The base class for all visible elements inside a canvas.
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.VectorFigure
 */
graphiti.Oval = graphiti.VectorFigure.extend({
    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     */
    init: function( ) {
        this._super( );
        this.setBackgroundColor(new graphiti.util.Color(200,255,120));
        this.setDimension(50,50);
   },
      

   /** 
    * @private
    **/
   createShapeElement : function()
   {
     var halfW = this.getWidth()/2;
     var halfH = this.getHeight()/2;
     return this.canvas.paper.ellipse(this.getX()+halfW, this.getY()+halfH, halfW, halfH);
   },

   /**
    * @method
    * propagate all attributes like color, stroke,... to the shape element
    **/
   repaint: function(attributes)
   {
       if(typeof attributes === "undefined"){
           attributes = {rx: this.width/2, ry: this.height/2 };
       }
       
       // don't override cx/cy if inherited class has set the center already.
       if(typeof attributes.cx === "undefined"){
           attributes.cx = this.x+attributes.rx;
           attributes.cy = this.y+attributes.ry;
       }
       
       this._super(attributes);
   }
    
});

