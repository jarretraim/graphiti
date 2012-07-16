

/**
 * @class graphiti.command.CommandType
 * 
 * EditPolicies should determine an Figures editing capabilities. 
 * It is possible to implement an Figure such that it handles all editing 
 * responsibility.<br> 
 * However, it is much more flexible and object-oriented to use 
 * EditPolicies. Using policies, you can pick and choose the editing behavior for 
 * an Figure without being bound to its class hierarchy. Code reuse is increased, 
 * and code management is easier. 
 * 
 * @author Andreas Herz
 */
graphiti.command.CommandType = Class.extend({
	
    NAME : "graphiti.command.CommandType",

    /**
     * @constructor
     * Create a new edit policy object
     * 
     * @param {String} policy 
     */
    init: function( policy) {
       this.policy = policy;
    },

    /**
     * @method
     * Return the String representation of the policy
     * 
     * @return {String}
     **/
    getPolicy:function()
    {
       return this.policy;
    }
});
 
graphiti.command.CommandType.DELETE         = "DELETE";
graphiti.command.CommandType.MOVE           = "MOVE";
graphiti.command.CommandType.CONNECT        = "CONNECT";
graphiti.command.CommandType.MOVE_BASEPOINT = "MOVE_BASEPOINT";
graphiti.command.CommandType.RESIZE         = "RESIZE";


