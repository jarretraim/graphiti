

graphiti.command.CommandDelete = graphiti.command.Command.extend({
    
    init: function(/*:graphiti.Figure*/ figure)
    {
       this._super("Delete Figure");
       this.parent   = figure.getParent();
       this.figure   = figure;
       this.canvas = figure.getCanvas();
       this.connections = null;
       this.compartmentDeleteCommands = null; 
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
        if(this.figure instanceof graphiti.CompartmentFigure)
        {
           for(var i=0; i<this.compartmentDeleteCommands.getSize();i++)
           {
             var deleteCommand = this.compartmentDeleteCommands.get(i);
             // add the figure to the compartment figure
             this.figure.addChild(deleteCommand.figure);
             // add the figure to the canvas
             this.canvas.getCommandStack().undo();
           }
        }
        this.canvas.addFigure(this.figure);
        if(this.figure instanceof graphiti.Connection)
           this.figure.reconnect();
    
        this.canvas.setCurrentSelection(this.figure);
        if(this.parent!==null)
          this.parent.addChild(this.figure);
        for (var i = 0; i < this.connections.getSize(); ++i)
        {
           this.canvas.addFigure(this.connections.get(i));
           this.connections.get(i).reconnect();
        }
    },
    
    /** Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
        // We must delete all children of this figure if this element an
        // compartment figure.
        //
        if(this.figure instanceof graphiti.CompartmentFigure)
        {
          if(this.compartmentDeleteCommands===null)
          {
             this.compartmentDeleteCommands = new graphiti.util.ArrayList();
             var children = this.figure.getChildren().clone();
             for(var i=0; i<children.getSize();i++)
             {
               var child = children.get(i);
               this.figure.removeChild(child);
               var deleteCommand = new graphiti.CommandDelete(child);
               this.compartmentDeleteCommands.add(deleteCommand);
               this.canvas.getCommandStack().execute(deleteCommand);
             }
          }
          else
          {
             for(var i=0; i<this.compartmentDeleteCommands.getSize();i++)
             {
                this.canvas.redo();
             }
          }
        }
    
        this.canvas.setCurrentSelection(null);
        if(this.figure instanceof graphiti.Node && this.connections===null)
        {
          this.connections = new graphiti.util.ArrayList();
          var ports = this.figure.getPorts();
          for(var i=0; i<ports.getSize(); i++)
          {
            var port = ports.get(i);
            // Do NOT add twice the same connection if it is linking ports from the same node
            for (var c = 0, c_size = port.getConnections().getSize() ; c< c_size ; c++)
            {
                if(!this.connections.contains(port.getConnections().get(c)))
                {
                  this.connections.add(port.getConnections().get(c));
                }
            }
          }
          for(var i=0; i<ports.getSize(); i++)
          {
            var port = ports.get(i);
            port.setCanvas(null);
          }
        }
        this.canvas.removeFigure(this.figure);
    
       if(this.connections===null)
          this.connections = new graphiti.util.ArrayList();
    
        // remove this figure from the parent CompartmentFigure
        //
        if(this.parent!==null)
          this.parent.removeChild(this.figure);
    
       for (var i = 0; i < this.connections.getSize(); ++i)
       {
          this.canvas.removeFigure(this.connections.get(i));
       }
    }
});