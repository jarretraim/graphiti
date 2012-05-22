
/**
 * @class graphiti.layout.connection.ConnectionRouter
 * Routes a {@link graphiti.Connection}, possibly using a constraint.
 *
 * @author Andreas Herz
 */
graphiti.layout.connection.ConnectionRouter = Class.extend({

	/**
	 * @constructor 
	 * Creates a new Router object
	 */
    init: function(){
    },
    
    /**
     * @method
     * Returns the direction the point <i>p</i> is in relation to the given rectangle.
     * Util method for inherit router implementations.
     * 
     * <p>
     * Possible values:
     * <ul>
     *   <li>up -&gt; 0</li>
     *   <li>right -&gt; 1</li>
     *   <li>down -&gt; 2</li>
     *   <li>left -&gt; 3</li>
     * </ul>
     * <p>
     * 
     * @param {graphiti.geo.Dimension} r the rectangle
     * @param {graphiti.geo.Point} p the point in relation to the given rectangle
     * 
     * @return {Number} the direction from <i>r</i> to <i>p</i>
     */
    getDirection:function( r,  p) 
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
    
    /**
     * @method
     * Returns the direction for the connection in relation to the given port and it's parent.
     * 
     * <p>
     * Possible values:
     * <ul>
     *   <li>up -&gt; 0</li>
     *   <li>right -&gt; 1</li>
     *   <li>down -&gt; 2</li>
     *   <li>left -&gt; 3</li>
     * </ul>
     * <p>
     * 
     * @param {graphiti.Connection} conn the connection with the end port to examine
     * 
     * @return {Number} the direction
     */
    getEndDirection:function( conn)
    {
       var p = conn.getEndPoint();
       var rect = conn.getTarget().getParent().getBoundingBox();
       
       return this.getDirection(rect, p);
    },
    
    
    /**
     * @method
     * Returns the **direction** for the connection in relation to the given port and it's parent.
     * 
     * <p>
     * Possible values:
     * <ul>
     *   <li>up -&gt; 0</li>
     *   <li>right -&gt; 1</li>
     *   <li>down -&gt; 2</li>
     *   <li>left -&gt; 3</li>
     * </ul>
     * <p>
     * 
     * @param {graphiti.Connection} conn the connection with the start port to examine
     * 
     * @return {Number} the direction.
     */
    getStartDirection:function( conn)
    {
       var p = conn.getStartPoint();
       var rect = conn.getSource().getParent().getBoundingBox();
       return this.getDirection(rect, p);
    },
    
    /**
     * @method
     * Routes the Connection.
     * 
     * @param {graphiti.Connection} connection The Connection to route
     * @template
     */
    route:function( connection)
    {
    	throw "subclasses must implement the method [ConnectionRouter.route]";
    },
    
    /**
     * @method
     * Called after all routings has been done. This can be used to smoth the edges or add some 
     * bridges on connections crossings. 
     * Don't change the routing! This method will be called for ALL connections in the canvas at every StackChangeEvent.
     * 
     * @param {graphiti.Connection} relatedConnection The Connection to postprocess
     * @param {graphiti.Canvas} canvas the related canvas.
     * @param {Object} postprocessCache Cache to use during this postprocess cycle.
     */
    postProcess: function(relatedConnection, canvas, postprocessCache){
        // calculate all intersections of all connections
    	// ....but only once
    	if(typeof postprocessCache.intersetions === "undefined"){
	    	var lines = canvas.getLines().clone();
	    	postprocessCache.intersetions = new graphiti.util.ArrayList();
	    	while(lines.getSize()>0){
	    		var l1 = lines.removeElementAt(0);
    			lines.each(function(ii,l2){
    				var partInter =l1.intersection(l2);
    				partInter.each(function(iii,p){
    				    l1.addBridge(p);	
    				});
    				postprocessCache.intersetions.addAll(partInter);
    			});
	    	}
    	}
    }
});