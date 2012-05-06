
/**
 * @class graphiti.command.CommandConnect
 * 
 * Connects two ports with a connection.
 *
 * @inheritable
 * @author Andreas Herz
 * 
 * @extends graphiti.command.Command
 */
graphiti.command.CommandConnect = graphiti.command.Command.extend({
    NAME : "graphiti.command.CommandConnect", 
    
    /**
     * @constructor
     * Create a new CommandConnect objects which can be execute via the CommandStack.
     *
     * @param {graphiti.Canvas} canvas the canvas to user
     * @param {graphiti.Port} source the source port for the connection to create
     * @param {graphiti.Port} target the target port for the connection to create
     */
    init : function(canvas, source, target)
     {
       this._super("Connecting Ports");
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
     * @method
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
     * @method
     * Redo the command after the user has undo this command.
     *
     **/
    redo:function()
    {
       this.canvas.addFigure(this.connection);
       this.connection.reconnect();
    },
    
    /** 
     * @method
     * Undo the command.
     *
     **/
    undo:function()
    {
        this.canvas.removeFigure(this.connection);
    }
});
