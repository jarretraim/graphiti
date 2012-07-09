
/**
 * @class graphiti.layout.locator.ManhattanMidpointLocator
 * 
 * A ManhattanMidpointLocator that is used to place figures at the midpoint of a Manhatten routed
 * connection.
 *
 * @author Andreas Herz
 * @extend graphiti.layout.locator.ConnectionLocator
 */
graphiti.layout.locator.ManhattanMidpointLocator= graphiti.layout.locator.ConnectionLocator.extend({
    NAME : "graphiti.layout.locator.ManhattanMidpointLocator",
    
    /**
     * @constructor
     * Constructs a ManhattanMidpointLocator with associated Connection c.
     * 
     * @param {graphiti.Connection} c the connection associated with the locator
     */
    init: function(c)
    {
      this._super(c);
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
       var conn = this.getParent();
       var points = conn.getPoints();
       
       var index = Math.floor((points.getSize() -2) / 2);
       if (points.getSize() <= index+1)
          return; 
    
       var p1 = points.get(index);
       var p2 = points.get(index + 1);
    
       var x = parseInt((p2.x - p1.x) / 2 + p1.x +5);
       var y = parseInt((p2.y - p1.y) / 2 + p1.y +5);
    
       target.setPosition(x,y);
    }
});
