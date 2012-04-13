
/**
 * @class graphiti.layout.router.DirectRouter
 * Router for direct connections between two ports. Beeline
 * 
 * @inheritable
 * @author Andreas Herz
 * 
 * @extends  graphiti.layout.router.AbstractRouter
 */
graphiti.layout.router.DirectRouter = graphiti.layout.router.AbstractRouter.extend({

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
     * @param {graphiti.Connection] connection The Connection to route
     */
    route:function( connection)
    {
       connection.addPoint(connection.getStartPoint());
       connection.addPoint(connection.getEndPoint());
    }
});
