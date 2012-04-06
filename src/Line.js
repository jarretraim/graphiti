/**
 * @class graphiti.Line
 * The base class for all visible elements inside a canvas.
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.Figure
 * @since 2.1
 */
graphiti.Line = graphiti.Figure.extend({

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     */
    init: function( ) {
        this._super( );
        
        this.width = this.getMinWidth();
        this.height = this.getMinHeight();
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
     * Set the new width and height of the figure.
     * 
     * @see #getMinWidth
     * @see #getMinHeight
     * @param {Number} w The new width of the figure
     * @param {Number} h The new height of the figure
     */
    setDimension:function(w,  h)
    {
      this.width = Math.max(this.getMinWidth(),w);
      this.height= Math.max(this.getMinHeight(),h);
      
      if(this.shape!==null)
      {
        var halfW = this.width/2;
        var halfH = this.height/2;
        this.shape.attr({rx: halfW, ry:halfH});
      }
      
      this.fireMoveEvent();
    
      // Update the resize handles if the user change the dimension via an API call
      //
      if(this.canvas!=null && this.canvas.getCurrentSelection()==this)
      {
         this.workflow.moveResizeHandles(this);
      }
    }

});

