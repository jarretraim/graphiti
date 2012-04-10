/**
 * @class graphiti.command.CommandConnect
 * Command for the movement of figures.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.command.Command
 */
graphiti.command.CommandConnect = graphiti.command.Command.extend({
    
    /**
     * @constructor
     * Create a new CommandConnect objects which can be execute via the CommandStack.
     *
     * @param {graphiti.Figure} figure the figure to move
     * @param {graphiti.Port} source the source port for the connection to create
     * @param {graphiti.Port} target the target port for the connection to create
     */
    init : function(figure, source, target)
     {
       this._super("Move Figure");
       this.canvas = canvas;
       this.source   = source;
       this.target   = target;
       this.connection = null;
    },
    
    setConnection:function(connection)
    {
       this.connection=connection;
    },
    
    /**
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
       if(this.connection===null)
          this.connection = new graphiti.Connection();
       this.connection.setSource(this.source);
       this.connection.setTarget(this.target);
       this.canvas.addFigure(this.connection);
    },
    
    /**
     * Redo the command after the user has undo this command.
     *
     **/
    redo:function()
    {
       this.canvas.addFigure(this.connection);
       this.connection.reconnect();
    },
    
    /** 
     * Undo the command.
     *
     **/
    undo:function()
    {
        this.canvas.removeFigure(this.connection);
    }
});
