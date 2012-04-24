
/**
 * @class graphiti.layout.connection.ConnectionRouter
 * Routes a {@link graphiti.Connection}, possibly using a constraint.
 *
 * @author Andreas Herz
 */
graphiti.layout.mesh.ProposedMeshChange = Class.extend({

	/**
	 * @constructor 
	 * Createschange object.
	 */
    init: function(figure, x, y){
    	this.figure = figure;
    	this.x = x;
    	this.y = y;
    },
    
    /**
     * @method
     * Return the related figure
     * 
     * @return {graphiti.Figure} the figure to the related change proposal
     */
    getFigure:function( )
    {
    	return this.figure;
    },
    
    getX: function(){
    	return this.x;
    },
    
    getY: function(){
    	return this.y;
    }
    
});