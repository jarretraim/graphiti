/**
 * @class graphiti.command.Command
 * Generic support class for the undo/redo concept within graphiti.
 * All add,drag&drop,delete operations should be execute via Commands and the related CommandStack.
 */
graphiti.command.Command = Class.extend({
    
    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     * 
     * @param {String} label
     */
    init: function( label) {
        this.label = label;
    },
    
    
    /**
     * @method
     * Returns a label of the Command. e.g. "move figure".
     *
     * @final
     **/
    getLabel:function()
    {
       return this.label;
    },
    
    
    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
     * return false. Rhe execution of this Command doesn't modify the model.
     *
     * @type boolean
     **/
    canExecute:function()
    {
      return true;
    },
    
    /**
     * @method
     * Execute the command the first time.
     * Sup-classes must implement this method.
     **/
    execute:function()
    {
    },
    
    /**
     * @method
     * Will be called if the user cancel the operation.
     *
     **/
    cancel:function()
    {
    },
    
    /**
     * @method
     * Undo the command.
     * Sup-classes must implement this method.
     *
     **/
    undo:function()
    {
    },
    
    /** 
     * @method
     * Redo the command after the user has undo this command.
     * Sup-classes must implement this method.
     *
     **/
    redo:function()
    {
    }
});
