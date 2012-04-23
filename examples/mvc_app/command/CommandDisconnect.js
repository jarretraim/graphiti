/**
 * @author Andreas Herz
 **/
example.mvc_simple.CommandDisconnect=graphiti.command.Command.extend({
    
    /**
     * 
     * @param {example.mvc_simple.ConnectionModel} connection
     */
    init : function(connection)
    {
        this._super("Disconnect Storage");

        this.connection = connection;
        this.source = this.connection.getModelParent();
    },

    /**
     * Execute the command the first time
     */
    execute : function()
    {
        this.source.removeConnectionModel(this.connection);
    },

    /**
     * Redo the command after the user has undo this command.
     *
     **/
    redo : function() {
        this.execute();
    },

    /**
     * Undo the command.
     */
    undo : function()
    {
        this.source.addConnectionModel(this.connection);
    }
});
