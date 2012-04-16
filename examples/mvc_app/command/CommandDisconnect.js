/**
 * @author Andreas Herz
 **/
example.mvc_simple.CommandDisconnect=graphiti.command.Command.extend({
    

    init : function(/* :draw2d.MountModel */connection)
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
        this.redo();
    },

    /**
     * Redo the command after the user has undo this command.
     */
    redo : function()
    {
        this.source.removeConnectionModel(this.connection);
    },

    /**
     * Undo the command.
     */
    undo : function()
    {
        this.source.addConnectionModel(this.connection);
    }
});
