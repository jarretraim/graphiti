
/**
 * @class graphiti.policy.VerticalEditPolicy
 * 
 * An EditPolicy for use with Figures. The constraint for RegionContraintPolicy is a Rectangle. It is
 * not possible to move the related figure outside this contrained area.
 * 
 * 
 * @author Andreas Herz
 * 
 * @extends graphiti.policy.DragDropEditPolicy
 */
graphiti.policy.VerticalEditPolicy = graphiti.policy.DragDropEditPolicy.extend({

    /**
     * @constructor 
     * Creates a new constraint object
     */
    init: function(){
        this._super();
    },


    /**
     * @method
     * It is only possible to drag&drop the element in a vertical line
     * 
     * @param figure
     * @param {Number|graphiti.geo.Point} x
     * @param {number} [y]
     * @returns {graphiti.geo.Point} the constraint position of the figure
     */
    apply : function(figure, x, y)
    {
        return new graphiti.geo.Point(figure.getX(),y);
    }
    
});