
/**
 * @class graphiti.shape.widget.Widget
 * Base class for all diagrams.
 * 
 * @extends graphiti.SetFigure
 */
graphiti.shape.widget.Widget = graphiti.SetFigure.extend({
    
    init: function( width, height){
        this._super( width, height);
    },
    

    /**
     * @method
     * Return the calculate width of the set. This calculates the bounding box of all elements.
     * 
     * @return {Number} the calculated width of the label
     **/
    getWidth : function() {
        return this.width;
    },
    
    /**
     * @method
     * Return the calculated height of the set. This calculates the bounding box of all elements.
     * 
     * @return {Number} the calculated height of the label
     */
    getHeight:function(){
       return this.height;
    }
});