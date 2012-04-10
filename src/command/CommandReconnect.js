graphiti.command.CommandReconnect = graphiti.command.Command.extend({
    

    init : function(con){
       this.con      = con;
       this.oldSourcePort  = con.getSource();
       this.oldTargetPort  = con.getTarget();
       this.oldRouter      = con.getRouter();
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
    
    setNewPorts:function(/*:@NAMESPACE@Port*/ source, /*:@NAMESPACE@Port*/ target)
    {
      this.newSourcePort = source;
      this.newTargetPort = target;
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
       var start  = this.con.sourceAnchor.getLocation(this.con.targetAnchor.getReferencePoint());
       var end    = this.con.targetAnchor.getLocation(this.con.sourceAnchor.getReferencePoint());
       this.con.setStartPoint(start.x,start.y);
       this.con.setEndPoint(end.x,end.y);
       this.con.getCanvas().showLineResizeHandles(this.con);
       this.con.setRouter(this.oldRouter);
    },
    
    /**
     * Undo the command
     *
     **/
    undo:function()
    {
      this.con.setSource(this.oldSourcePort);
      this.con.setTarget(this.oldTargetPort);
      this.con.setRouter(this.oldRouter);
      if(this.con.getCanvas().getCurrentSelection()==this.con)
         this.con.getCanvas().showLineResizeHandles(this.con);
    },
    
    /** 
     * Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
      this.con.setSource(this.newSourcePort);
      this.con.setTarget(this.newTargetPort);
      this.con.setRouter(this.oldRouter);
      if(this.con.getCanvas().getCurrentSelection()==this.con)
         this.con.getCanvas().showLineResizeHandles(this.con);
    }

});
