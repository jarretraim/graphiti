
/**
 * @class graphiti.command.CommandReconnect
 * 
 * Reconnects two ports. This command is used during the DragDrop operation of a graphiti.Connection.
 *
 * @inheritable
 * @author Andreas Herz
 * 
 * @extends graphiti.command.Command
 */
graphiti.command.CommandReconnect = graphiti.command.Command.extend({
    NAME : "graphiti.command.CommandReconnect", // only for debug


    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {graphiti.Connection} con the related Connection which is currently in the drag&drop operation
     */
    init : function(con){
       this.con      = con;
       this.oldSourcePort  = con.getSource();
       this.oldTargetPort  = con.getTarget();
       this.oldRouter      = con.getRouter();
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
      return true;
    },
    
    /**
     * @method
     * The new ports to use during the execute of this command.
     * 
     * @param {graphiti.Port} source
     * @param {graphiti.Port} target
     */
    setNewPorts:function(source,  target)
    {
      this.newSourcePort = source;
      this.newTargetPort = target;
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
     * @method
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
     * @method
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
