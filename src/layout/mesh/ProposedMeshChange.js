
/**
 * @class graphiti.layout.mesh.ProposedMeshChange
 * Change proposal for grid/mesh layout changes.
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
     * Return the related figure.
     * 
     * @return {graphiti.Figure} the figure to the related change proposal
     */
    getFigure:function( )
    {
    	return this.figure;
    },
    
    /**
     * @method
     * The proposed x-coordinate.
     * 
     * @return {Number}
     */
    getX: function(){
    	return this.x;
    },
    
    /**
     * @method
     * The proposed y-coordinate
     * 
     * @return {Number}
     */
    getY: function(){
    	return this.y;
    }
    
});