/**
 * @class graphiti.command.CommandMove
 * Command for the movement of figures.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.command.Command
 */
graphiti.command.CommandMove = graphiti.command.Command.extend({
    
    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {graphiti.Figure} figure the figure to move
     * @param {Number} [x] the current x position
     * @param {Number} [y] the current y position
     */
    init : function(figure, x, y)
    {
        this._super("Move Figure");
        this.figure = figure;
        if (typeof x === "undefined")
        {
            this.oldX = figure.getX();
            this.oldY = figure.getY();
        }
        else
        {
            this.oldX = x;
            this.oldY = y;
        }
        this.oldCompartment = figure.getParent();
    },
    
  
    /**
     * @method
     * Set the initial position of the element
     *
     * @param {Number} x the new initial x position
     * @param {Number} y the new initial y position
     **/
    setStartPosition:function( x,  y)
    {
       this.oldX = x;
       this.oldY = y;
    },
    
    /**
     * @method
     * Set the target/final position of the figure move command.
     *
     * @param {Number} x the new x position
     * @param {Number} y the new y position
     **/
    setPosition:function( x,  y)
    {
       this.newX = x;
       this.newY = y;
       this.newCompartment = this.figure.getCanvas().getBestCompartmentFigure(x,y,this.figure);
    },

    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute:function()
    {
      // return false if we doesn't modify the model => NOP Command
      return this.newX!=this.oldX || this.newY!=this.oldY;
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
       this.redo();
    },
    
    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo:function()
    {
       this.figure.setPosition(this.oldX, this.oldY);
       if(this.newCompartment!==null)
          this.newCompartment.removeChild(this.figure);
    
       if(this.oldCompartment!==null)
          this.oldCompartment.addChild(this.figure);
    },
    
    /**
     * @method
     * Redo the move command after the user has undo this command
     *
     **/
    redo:function()
    {
       this.figure.setPosition(this.newX, this.newY);
       if(this.oldCompartment!==null)
          this.oldCompartment.removeChild(this.figure);
    
       if(this.newCompartment!==null)
          this.newCompartment.addChild(this.figure);
    }
});