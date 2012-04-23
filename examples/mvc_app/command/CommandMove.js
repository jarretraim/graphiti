
example.mvc_simple.CommandMove= graphiti.command.Command.extend({
	

	/**
	 * @constructor
	 * Creates a command for the movement of an model object
	 * 
	 * @param {graphiti.mvc.AbstractObjectModel} model
	 */
	init: function(model){
		this._super("Move Element");
		
		this.oldX  = model.getPosition().getX();
		this.oldY  = model.getPosition().getY();
		this.model = model;
	},

	/**
	 * @method
	 * Update the target postion fo the command.
	 * 
	 * @param {Number} x the new x coordinate
	 * @param {Number} y the new y coordinate
	 **/
	setPosition:function( x, y)
	{
	   this.newX = x;
	   this.newY = y;
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
	  return this.newX!==this.oldX || this.newY!==this.oldY;
	},
	
	/**
	 * @method
	 * Execute the command the first time
	 * 
	 **/
	execute:function()
	{
      this.model.setPosition(this.newX, this.newY);
	},
	
    /**
     * Redo the command after the user has undo this command.
     *
     **/
    redo : function() {
        this.execute();
    },

	/**
	 * @method
	 * Undo the command
	 *
	 **/
	undo:function()
	{
	   this.model.setPosition(this.oldX, this.oldY);
	}
	
});