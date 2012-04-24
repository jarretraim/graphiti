
/**
 * @class graphiti.layout.connection.ConnectionRouter
 * Routes a {@link graphiti.Connection}, possibly using a constraint.
 *
 * @author Andreas Herz
 */
graphiti.layout.mesh.MeshLayouter = Class.extend({

	/**
	 * @constructor 
	 * Creates a new layouter object.
	 */
    init: function(){
    },
    
    /**
     * @method
     * Return a changes list for an existing mesh/canvas to ensure that the element to insert 
     * did have enough space.
     * 
     * @param {graphiti.Canvas} canvas the canvas to use for the analytic
     * @param {graphiti.Figure} figure The figure to add to the exising canvas
     * @param {Number} x requested x-position for the figure
     * @param {Number} y requested y-position for the figure
     * 
     * 
     * @return {graphiti.util.ArrayList} a list of changes to apply if the user want to insert he figure.
     */
    add:function( canvas, figure, x, y)
    {
    	return new graphiti.util.ArrayList();
    }
});