
/**
 * @class graphiti.layout.connection.DirectRouter
 * Router for direct connections between two ports. Beeline
 * 
 * @inheritable
 * @author Andreas Herz
 * 
 * @extends  graphiti.layout.connection.ConnectionRouter
 */
graphiti.layout.connection.DirectRouter = graphiti.layout.connection.ConnectionRouter.extend({

	/**
	 * @constructor 
	 * Creates a new Router object
	 */
    init: function(){
    },
    
    
    /**
     * @method
     * Invalidates the given Connection
     */
    invalidate:function()
    {
    },
    
    /**
     * @method
     * Routes the Connection in air line (beeline).
     * 
     * @param {graphiti.Connection} connection The Connection to route
     */
    route:function( connection)
    {
       var start =connection.getStartPoint();
       var end = connection.getEndPoint();
       
       // required for hit tests
       //
       connection.addPoint(start);
       connection.addPoint(end);
       
       // calculate the path
       var path = ["M",start.x," ",start.y];
       path.push("L", end.x, " ", end.y);

       connection.svgPathString = path.join("");

    }
});
