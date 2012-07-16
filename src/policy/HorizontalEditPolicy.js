
/**
 * @class graphiti.policy..HorizontalEditPolicy
 * 
 * An EditPolicy for use with Figures. The constraint for RegionContraintPolicy is a Rectangle. It is
 * not possible to move the related figure outside this constrained area.
 * 
 * 
 * @author Andreas Herz
 * 
 * @extends graphiti.policy.DragDropEditPolicy
 */
graphiti.policy.HorizontalEditPolicy = graphiti.policy.DragDropEditPolicy.extend({

    /**
     * @constructor 
     * Creates a new constraint object
     * 
     */
    init: function(){
        this._super();
    },


    /**
     * @method
     * It is only possible to drag&drop the element in a horizontal line
     * 
     * @param figure
     * @param {Number|graphiti.geo.Point} x
     * @param {number} [y]
     * @returns {graphiti.geo.Point} the constraint position of the figure
     */
    apply : function(figure, x, y)
    {
        return new graphiti.geo.Point(x,figure.getY());
    }
    
});