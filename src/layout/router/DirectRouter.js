graphiti.layout.router.DirectRouter = graphiti.layout.router.AbstractRouter.extend({

    init: function(){
    },
    
    
    /**
     * Invalidates the given Connection.
     * @param connection The connection to be invalidated
     */
    invalidate:function()
    {
    },
    
    /**
     * Routes the Connection.
     * @param connection The Connection to route
     */
    route:function(/*:@NAMESPACE@Connection*/ connection)
    {
       connection.addPoint(connection.getStartPoint());
       connection.addPoint(connection.getEndPoint());
    }
});
