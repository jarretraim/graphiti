
/**
 * @class graphiti.shape.basic.Diamond
 * A Diamond Figure.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var d1 =  new graphiti.shape.basic.Diamond();
 *     var d2 =  new graphiti.shape.basic.Diamond();
 *     
 *     canvas.addFigure(d1,10,10);
 *     canvas.addFigure(d2,100,10);
 *     
 *     d2.setBackgroundColor("#f0f000");
 *     d2.setAlpha(0.7);
 *     d2.setDimension(100,60);
 *     
 *     canvas.setCurrentSelection(d2);
 *     
 * @author Andreas Herz
 * @extends graphiti.VectorFigure
 */
graphiti.shape.basic.Diamond = graphiti.VectorFigure.extend({
    NAME : "graphiti.shape.basic.Diamond",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     */
    init: function( width, height) {
      this._super();
    
      this.setBackgroundColor( new graphiti.util.Color(100,100,150));
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
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }
        
        if (typeof attributes === "undefined") {
            attributes = {};
        }
        
        var box = this.getBoundingBox();
        var path = ["M",box.x+(box.w/2)," ",box.y];         // Go to the top center..
        path.push("L", box.x+box.w, " ", box.y+box.h/2);    // ...draw line to the right middle
        path.push("L", box.x+box.w/2, " ", box.y+ box.h);   // ...bottom center...
        path.push("L", box.x, " ", box.y+box.h/2);          // ...left middle...
        path.push("L", box.x+box.w/2, " ", box.y);          // and close the path
        attributes.path = path.join("");

        this._super(attributes);
    },


    /**
     * @method
     * Called by the framework. Don't call them manually.
     * 
     * @private
     **/
    createShapeElement:function()
    {
      // create dummy line
      return this.canvas.paper.path("M0 0L1 1");
    }
    
});