
/**
 * @class graphiti.command.CommandAdd
 * 
 * Command to add a figure with CommandStack support.
 * 
 * @extends graphiti.command.Command
 */
graphiti.command.CommandAdd = graphiti.command.Command.extend({
    
    /**
     * @constructor
     * Create a add command for the given figure.
     * 
     * @param {graphiti.Canvas} canvas the canvas to use
     * @param {graphiti.Figure} figure the figure to add
     */
    init: function(canvas, figure, x,y)
    {
       this._super("Delete Figure");
       this.figure = figure;
       this.canvas = canvas;
       this.x = x;
       this.y = y;
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
       this.canvas.addFigure(this.figure, this.x, this.y);
    },
    
    /** 
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
        this.execute();
    },
    
    /**
     * @method
     * Undo the command
     *
     **/
    undo:function()
    {
        this.canvas.removeFigure(this.figure);
    }
    
});