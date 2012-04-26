
/**
 * @class graphiti.Oval
 * Oval figure.
 * 
 * {@img Oval.png Oval Figure}
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.VectorFigure
 */
graphiti.Oval = graphiti.VectorFigure.extend({
    NAME : "graphiti.Oval", // only for debugging

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
    * @inheritdoc
    * 
    * @template
    **/
   createShapeElement : function()
   {
     var halfW = this.getWidth()/2;
     var halfH = this.getHeight()/2;
     return this.canvas.paper.ellipse(this.getAbsoluteX()+halfW, this.getAbsoluteY()+halfH, halfW, halfH);
   },

   /**
    * @inheritdoc
    * 
    * @template
    **/
   repaint: function(attributes)
   {
       if(this.shape===null){
           return;
       }

       if(typeof attributes === "undefined"){
           attributes = {};
       }
       
       
       // don't override cx/cy if inherited class has set the center already.
       if(typeof attributes.rx === "undefined"){
           attributes.rx = this.width/2;
           attributes.ry = this.height/2;
       }
 
       // don't override cx/cy if inherited class has set the center already.
       if(typeof attributes.cx === "undefined"){
           attributes.cx = this.getAbsoluteX()+attributes.rx;
           attributes.cy = this.getAbsoluteY()+attributes.ry;
       }
      
       this._super(attributes);
   }
    
});

