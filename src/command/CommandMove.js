/**
 * @class graphiti.command.CommandMove
 * 
 * Generic support class for the undo/redo concept within graphiti.
 * All add,drag&drop,delete operations should be execute via Commands and the related CommandStack.
 */
graphiti.command.CommandMove = graphiti.command.Command.extend({
    
    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     * 
     * @param {String} label
     */
    init : function(figure, x, y)
    {
        this._super("move figure");
        this.figure = figure;
        if (x == undefined)
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
     * Set the initial position of the element
     *
     **/
    setStartPosition:function( x,  y)
    {
       this.oldX = x;
       this.oldY = y;
    },
    
    /**
     * Set the target/final position of the figure move command.
     * 
     **/
    setPosition:function( x,  y)
    {
       this.newX = x;
       this.newY = y;
       this.newCompartment = this.figure.getCanvas().getBestCompartmentFigure(x,y,this.figure);
    },
    
    /**
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @type boolean
     **/
    canExecute:function()
    {
      // return false if we doesn't modify the model => NOP Command
      return this.newX!=this.oldX || this.newY!=this.oldY;
    },
    
    /**
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
       this.redo();
    },
    
    /**
     * Undo the command
     *
     **/
    undo:function()
    {
       this.figure.setPosition(this.oldX, this.oldY);
       if(this.newCompartment!==null)
          this.newCompartment.removeChild(this.figure);
    
       if(this.oldCompartment!==null)
          this.oldCompartment.addChild(this.figure);
    
       this.figure.getCanvas().moveResizeHandles(this.figure);
    },
    
    /** Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
       this.figure.setPosition(this.newX, this.newY);
       if(this.oldCompartment!==null)
          this.oldCompartment.removeChild(this.figure);
    
       if(this.newCompartment!==null)
          this.newCompartment.addChild(this.figure);
    
       this.figure.getCanvas().moveResizeHandles(this.figure);
    },
});