/**
 * @class graphiti.command.CommandResize
 * 
 * Generic support class for the undo/redo concept within graphiti.
 * All add,drag&drop,delete operations should be execute via Commands and the related CommandStack.
 */
graphiti.command.CommandResize = graphiti.command.Command.extend({
    
    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     * 
     * @param {String} label
     */
    init : function(figure, width, height)
    {
        this._super("Resize Figure");
        this.figure = figure;
        
        if (typeof width === "undefined")
        {
            this.oldWidth = figure.getWidth();
            this.oldHeight = figure.getHeight();
        }
        else
        {
            this.oldWidth = width;
            this.oldHeight = height;
        }
    },
  
    /**
     * Execute the command the first time
     * 
     **/
    setDimension:function(/*:int*/ width, /*:int*/ height)
    {
       this.newWidth  = width;
       this.newHeight = height;
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
      return this.newWidth!=this.oldWidth || this.newHeight!=this.oldHeight;
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
       this.figure.setDimension(this.oldWidth, this.oldHeight);
       this.figure.getCanvas().moveResizeHandles(this.figure);
    },
    
    /** Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
       this.figure.setDimension(this.newWidth, this.newHeight);
       this.figure.getCanvas().moveResizeHandles(this.figure);
    }
});