/**
 * @class graphiti.Oval
 * The base class for all visible elements inside a canvas.
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.VectorFigure
 * @since 2.1
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
     this.shape= this.canvas.paper.ellipse(this.getX()+halfW, this.getY()+halfH, halfW, halfH);

     this.repaint();
     
     return this.shape;
   },

   /**
    * @method
    * propagate all attributes like color, stroke,... to the shape element
    **/
   repaint: function()
   {
     if(this.shape===null)
        return;
        
     var halfW = this.width/2;
     var halfH = this.height/2;
     this._super({rx: halfW, ry:halfH, cx: this.x+halfW, cy:this.y+halfH});
   },
    
});

