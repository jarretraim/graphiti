/**
 * @class graphiti.command.CommandStackEventListener
 * 
 * Event class which will be fired for every CommandStack operation. Required for CommandStackListener.
 * 
 * @inherit
 * @author Andreas Herz
 */
graphiti.command.CommandStackEventListener = Class.extend({
    
    /**
     * @constructor
     * Creates a new Listener Object
     * 
     */
    init : function()
    {
    },
    
    /**
     * @method
     * Sent when an event occurs on the command stack. graphiti.command.CommandStackEvent.getDetail() 
     * can be used to identify the type of event which has occurred.
     * 
     * @template
     * 
     * @param {graphiti.command.CommandStackEvent} event
     **/
    stackChanged:function(event)
    {
    }

});
