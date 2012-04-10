
/**
 * @class 
 * Routes a {@link @NAMESPACE@Connection}, possibly using a constraint.
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
graphiti.layout.router.AbstractRouter = Class.extend({

    init: function(){
    },
    
    /**
     * Returns the direction the point <i>p</i> is in relation to the given rectangle.
     * Possible values are LEFT (-1,0), RIGHT (1,0), UP (0,-1) and DOWN (0,1).
     * 
     * @param r the rectangle
     * @param p the point
     * @return the direction from <i>r</i> to <i>p</i>
     */
    getDirection:function(/*:@NAMESPACE@Dimension*/ r, /*:@NAMESPACE@Point*/ p) 
    {
        //  up     -> 0
        //  right  -> 1
        //  down   -> 2
        //  left   -> 3
       var distance = Math.abs(r.x - p.x);
       var direction = 3;
    
       var i=Math.abs(r.y - p.y);
       if (i <= distance) 
       {
          distance = i;
          direction = 0;
       }
    
       i = Math.abs(r.getBottom() - p.y);
       if (i <= distance) 
       {
          distance = i;
          direction = 2;
       }
    
       i = Math.abs(r.getRight() - p.x);
       if (i < distance) 
       {
          distance = i;
          direction = 1;
       }
    
       return direction;
    },
    
    getEndDirection:function(/*:@NAMESPACE@Connection*/ conn)
    {
       var p = conn.getEndPoint();
       var rect = conn.getTarget().getParent().getBounds();
       return this.getDirection(rect, p);
    },
    
    
    getStartDirection:function(/*:@NAMESPACE@Connection*/ conn)
    {
       var p = conn.getStartPoint();
       var rect = conn.getSource().getParent().getBounds();
       return this.getDirection(rect, p);
    },
    
    
    /**
     * Routes the Connection.
     * @param connection The Connection to route
     */
    route:function(/*:@NAMESPACE@Connection*/ connection)
    {
    }
});