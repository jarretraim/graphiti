
/**
 * @class graphiti.command.CommandStackEvent
 * Event class which will be fired for every CommandStack operation. Required for CommandStackListener.
 */
graphiti.command.CommandStackEvent = Class.extend({
    NAME : "graphiti.command.CommandStackEvent", 

    /**
     * @constructor
     * Create a new CommandStack objects which can be execute via the CommandStack.
     * @param {graphiti.command.Command} command the related command
     * @param {Number} details the current state of the command execution
     * 
     */
    init : function(stack, command, details)
    {
    	this.stack = stack;
        this.command = command;
        this.details = details;
    },
    
    
    /**
     * @method
     * Return the corresponding stack of the event.
     * 
     * @return {graphiti.command.CommandStack}
     **/
    getStack:function()
    {
       return this.stack;
    },
    
    
    /**
     * @method
     * Returns null or a Command if a command is relevant to the current event.
     * 
     * @return {graphiti.command.Command}
     **/
    getCommand:function()
    {
       return this.command;
    },
    
    /**
     * @method
     * Returns an integer identifying the type of event which has occurred.
     * Defined by {#link graphiti.command.CommandStack}.
     * 
     * @return {Number}
     **/
    getDetails:function()
    {
       return this.details;
    },
    
    /**
     * @method
     * Returns true if this event is fired after the stack having changed.
     *
     * @return {boolean} true if post-change event
     **/
    isPostChangeEvent:function()
    {
       return 0 != (this.getDetails() & graphiti.command.CommandStack.POST_MASK);
    },
    
    /**
     * @method
     * Returns true if this event is fired prior to the stack changing.
     * 
     * @return {boolean} true if pre-change event
     **/
    isPreChangeEvent:function()
    {
       return 0 != (this.getDetails() & graphiti.command.CommandStack.PRE_MASK);
    }
});