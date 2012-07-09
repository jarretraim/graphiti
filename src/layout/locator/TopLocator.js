
/**
 * @class graphiti.layout.locator.TopLocator
 * 
 * A TopLocator  is used to place figures at the top/center of a parent shape.
 *
 * @author Andreas Herz
 * @extend graphiti.layout.locator.Locator
 */
graphiti.layout.locator.TopLocator= graphiti.layout.locator.Locator.extend({
    NAME : "graphiti.layout.locator.TopLocator",
    
    /**
     * @constructor
     * Constructs a ManhattanMidpointLocator with associated Connection c.
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
       var topCenter = boundingBox.getTopCenter();
       
       var targetBoundingBox = target.getBoundingBox();
       target.setPosition(topCenter.x-(targetBoundingBox.w/2),topCenter.y-2-targetBoundingBox.h);
    }
});
