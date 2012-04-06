/**
 * @class graphiti.command.CommandStackEventListener
 * @inherit
 * Event class which will be fired for every CommandStack operation. Required for CommandStackListener.
 */
graphiti.command.CommandStackEventListener = Class.extend({
    
    /**
     * @constructor
     * Create a new CommandStack objects which can be execute via the CommandStack.
     * @param {graphiti.command.Command} command the related command
     * @param {Number} details the current state of the command execution
     * 
     */
    init : function(command, details)
    {
    },
    
    /**
     * @method
     * Sent when an event occurs on the command stack. graphiti.command.CommandStackEvent.getDetail() 
     * can be used to identify the type of event which has occurred.
     * 
     * @abstract
     * @param {graphiti.command.CommandStackEvent} event
     **/
    stackChanged:function(event)
    {
    }

});
