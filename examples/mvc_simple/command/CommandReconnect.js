
example.mvc_simple.CommandReconnect= graphiti.command.Command.extend({
    
    init:function(/*:draw2d.MountModel*/ con)
    {
       this._super("Reconnect Node");
       this.con = con;
       this.oldSourceModel = con.getSourceModel();
       this.oldTargetModel = con.getTargetModel();
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
      return true;
    },
    
    /**
     * called by the framework
     **/
    setNewPorts:function(/*:draw2d.Port*/ source, /*:draw2d.Port*/ target)
    {
      this.newSourceModel = source.getParent().getModel();
      this.newTargetModel = target.getParent().getModel();
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
     * Execute the command the first time
     * 
     **/
    cancel:function()
    {
      this.con.setSourceModel(this.oldSourceModel);
      this.con.setTargetModel(this.oldTargetModel);
    },
    
    /**
     * Undo the command
     *
     **/
    undo:function()
    {
      this.con.setSourceModel(this.oldSourceModel);
      this.con.setTargetModel(this.oldTargetModel);
    },
    
    /** 
     * Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
      this.con.setSourceModel(this.newSourceModel);
      this.con.setTargetModel(this.newTargetModel);
    }
});