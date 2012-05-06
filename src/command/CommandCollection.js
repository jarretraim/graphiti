
/**
 * @class graphiti.command.CommandCollection
 * 
 * A CommandCollection works a a single command. You can add more than one
 * Command to this CommandCollection and execute/undo them onto the CommandStack as a
 * single Command.
 *
 * @inheritable
 * @author Andreas Herz
 * 
 * @extends graphiti.command.Command
 */
graphiti.command.CommandCollection = graphiti.command.Command.extend({
    NAME : "graphiti.command.CommandCollection", 
    
    /**
     * @constructor
     * Create a new CommandConnect objects which can be execute via the CommandStack.
     *
     */
    init : function()
     {
       this._super("Execute Commands");
       
       this.commands = new graphiti.util.ArrayList();
    },
    
    
    /**
     * @method
     * Add a command to the collection.
     * 
     * @param {graphiti.command.Command} command
     */
    add: function(command){
    	this.command.add(command);
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
    	for( var i=0; i< this.commands.getSize();i++){
    		this.commands.get(i).execute();
    	}
    },
    
    /**
     * @method
     * Redo the command after the user has undo this command.
     *
     **/
    redo:function()
    {
    	for( var i=0; i< this.commands.getSize();i++){
    		this.commands.get(i).redo();
    	}
    },
    
    /** 
     * @method
     * Undo the command.
     *
     **/
    undo:function()
    {
    	for( var i=0; i< this.commands.getSize();i++){
    		this.commands.get(i).undo();
    	}
    }
});
