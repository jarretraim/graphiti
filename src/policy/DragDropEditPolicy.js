
/**
 * @class graphiti.policy.DragDropEditPolicy
 * 
 * Called by the framework if the user edit the position of a figure with a drag drop operation.
 *
 * @author  Andreas Herz
 * @extends graphiti.policy.EditPolicy
 */
graphiti.policy.DragDropEditPolicy = graphiti.policy.EditPolicy.extend({

    /**
     * @constructor 
     * Creates a new Router object
     */
    init: function(){
        this._super();
    },
    
    /**
     * @method
     * Return the role of the edit policy
     * 
     * @template
     * @return the role of the policy.
     */
    getRole:function(){
        return graphiti.policy.EditPolicy.Role.PRIMARY_DRAG_ROLE;
    },
    
    /**
     * @method
     * Adjust the coordinates to the rectangle/region of this constraint.
     * 
     * @param figure
     * @param {Number|graphiti.geo.Point} x
     * @param {number} [y]
     * @returns {graphiti.geo.Point} the constraint position of the figure
     * 
     * @template
     */
    apply: function(figure, x,y){
        // do nothing per default implementation
        if(x instanceof graphiti.geo.Point){
            return x;
        }
        
        return new graphiti.geo.Point(x,y);
    }


});