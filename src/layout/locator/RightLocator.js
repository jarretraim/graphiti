
/**
 * @class graphiti.layout.locator.RightLocator
 * 
 * A RightLocator is used to place figures to the right of a parent shape.
 *
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     var end = new graphiti.shape.node.End();
 *     end.addFigure(new graphiti.shape.basic.Label("Right Label"), new graphiti.layout.locator.RightLocator(end));	
 *     canvas.addFigure( end, 50,50);
 *
 *     
 * @author Andreas Herz
 * @extend graphiti.layout.locator.Locator
 */
graphiti.layout.locator.RightLocator = graphiti.layout.locator.Locator.extend({
    NAME : "graphiti.layout.locator.RightLocator",
    
    /**
     * @constructor
     * Constructs a locator with associated parent.
     * 
     * @param {graphiti.Figure} parent the parent associated with the locator
     */
    init: function(parent)
    {
      this._super(parent);
    },
    
    
    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {graphiti.Figure} target The figure to relocate
     **/
    relocate:function(index, target)
    {
       var parent = this.getParent();
       var boundingBox = parent.getBoundingBox();
       var topRight = boundingBox.getTopRight();
       
       var targetBoundingBox = target.getBoundingBox();
       target.setPosition(topRight.x+5,topRight.y+(boundingBox.h/2)-(targetBoundingBox.h/2));
    }
});
