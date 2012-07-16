
/**
 * @class graphiti.policy.EditPolicy
 * 
 *
 * @author Andreas Herz
 */
graphiti.policy.EditPolicy = Class.extend({

    /**
     * @constructor 
     * Creates a new Router object
     */
    init: function(){
    },
    
    /**
     * @method
     * Return the role of the edit policy
     * 
     * @template
     * @return the role of the policy.
     */
    getRole:function(){
        
    }
    
});

/**
 * The key used to install a primary drag EditPolicy. 
 */
graphiti.policy.EditPolicy.Role = 
        { 
           // The key used to install a primary drag EditPolicy.
           PRIMARY_DRAG_ROLE : 0 ,
           
           // The key used to install a direct edit EditPolicy. 
           DIRECT_EDIT_ROLE:1,
           
           // The key used to install a selection feedback EditPolicy. 
           SELECTION_FEEDBACK_ROLE:2
        };