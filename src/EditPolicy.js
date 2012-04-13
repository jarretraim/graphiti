

/**
 * @class
 * EditPolicies should determine an Figures editing capabilities. 
 * It is possible to implement an Figure such that it handles all editing 
 * responsibility.<br> 
 * However, it is much more flexible and object-oriented to use 
 * EditPolicies. Using policies, you can pick and choose the editing behavior for 
 * an Figure without being bound to its class hierarchy. Code reuse is increased, 
 * and code management is easier. 
 */
graphiti.EditPolicy = Class.extend({
    NAME : "graphiti.EditPolicy", // only for debugging

    /**
     * @constructor
     * Create a new Color object
     * 
     * @param {String} policy 
     */
    init: function( policy) {
       this.policy = policy;
    },

    /**
     * @method
     * Return the String representation of the policy
     * @return {String}
     **/
    getPolicy:function()
    {
       return this.policy;
    }
});
 
graphiti.EditPolicy.DELETE    = "DELETE";
graphiti.EditPolicy.MOVE      = "MOVE";
graphiti.EditPolicy.CONNECT   = "CONNECT";
graphiti.EditPolicy.MOVE_BASEPOINT = "MOVE_BASEPOINT";
graphiti.EditPolicy.RESIZE    = "RESIZE";


