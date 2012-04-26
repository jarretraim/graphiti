
/**
 * @class graphiti.Node
 * 
 * A Node is the base class for all figures which can have {@link graphiti.Port}s. A {@link graphiti.Port} is the
 * anchor for a {@link graphiti.Connection} line.<br><br>A {@link graphiti.Port} is a green dot which can 
 * be dragged and dropped over another port.<br>
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.Figure 
 */
graphiti.Node = graphiti.Figure.extend({
    NAME : "graphiti.Node", // only for debugging

    /**
     * @constructor
     * Creates a new Node element which are not assigned to any canvas.
     */
    init: function( ) {
      this.bgColor = new  graphiti.util.Color(255,255,255);
      this.lineColor = new  graphiti.util.Color(128,128,255);
      this.lineStroke=1;
      this.ports = new graphiti.util.ArrayList();
      this._super();
    },
    

    /**
     * @method
     * Return all ports of the node.
     *
     * @return  {graphiti.util.ArrayList}
     **/
    getPorts: function()
    {
      return this.ports;
    },
    
    
    /**
     * @method
     * Return all input ports of the node.
     *
     * @return {graphiti.util.ArrayList}
     **/
    getInputPorts: function()
    {
      var result = new graphiti.util.ArrayList();
      for(var i=0;i<this.ports.getSize();i++)
      {
       var port = this.ports.get(i);
       if(port instanceof graphiti.util.InputPort){
          result.add(port);
       }
      }
      return result;
    },
    
    /**
     * @method
     * Return all output ports of the node.
     *
     * @return {graphiti.util.ArrayList}
     **/
    getOutputPorts: function()
    {
      var result = new graphiti.util.ArrayList();
      for(var i=0;i<this.ports.getSize();i++)
      {
       var port = this.ports.get(i);
       if(port instanceof graphiti.OutputPort){
          result.add(port);
       }
      }
      return result;
    },
    
    /**
     * @method
     * Return the port with the corresponding name.
     *
     * 
     * @param {String} portName The name of the port to return.
     * @return {graphiti.Port} Returns the port with the hands over name or null.
     **/
    getPort: function( portName)
    {
      for(var i=0;i<this.ports.getSize();i++)
      {
       var port = this.ports.get(i);
       if(port.getName() === portName){
          return port;
       }
      }
      
      return null;
    },
    
    /**
     * @method
     * Return the input port with the corresponding name.
     *
     * 
     * @param {String} portName The name of the port to return.
     * @return {graphiti.InputPort} Returns the port with the hands over name or null.
     **/
    getInputPort: function( portName)
    {
      for(var i=0;i<this.ports.getSize();i++)
      {
       var port = this.ports.get(i);
       if(port.getName() === portName && port instanceof graphiti.InputPort){
          return port;
       }
      }
      
      return null;
    },
    
    /**
     * @method
     * Return the output port with the corresponding name.
     *
     * @param {String} portName The name of the port to return.
     * @return {graphiti.OutputPort} Returns the port with the hands over name or null.
     **/
    getOutputPort: function( portName)
    {
      for(var i=0;i<this.ports.getSize();i++)
      {
       var port = this.ports.get(i);
       if(port.getName() === portName && port instanceof graphiti.OutputPort){
          return port;
       }
      }
      
      return null;
    },
    
    /**
     * @method
     * Add a port to this node at the given position.<br>
     *
     * @param {graphiti.Port} port The new port to add.
     * @param {Number} x The x position.
     * @param {Number} y The y position.
     **/
    addPort: function(port, x, y)
    {
      this.ports.add(port);
      port.setPosition(x,y);
      port.setParent(this);
      port.setCanvas(this.canvas);
      
      // You can't delete a port with the [DEL] key if a port is a child of a node
      port.setDeleteable(false);
    
      port.getShapeElement();
      if(this.canvas!==null)
      {
        this.canvas.registerPort(port);
      }
    },
    
    /**
     * @method
     * Removes a port and all related connections from this node.<br>
     *
     * @param {graphiti.Port} port The port to remove.
     **/
    removePort : function(port)
    {
        this.ports.remove(port);

        if (port.getCanvas() !== null) {
            port.getCanvas().unregisterPort(port);
            // remove the related connections of the port too.
            var connections = port.getConnections();
            for ( var i = 0; i < connections.getSize(); ++i) {
                port.getCanvas().removeFigure(connections.get(i));
            }
        }

        port.setCanvas(null);
    },
    
    /**
     * @private
     **/
    setCanvas : function(canvas)
    {
        var i = 0;
        var oldCanvas = this.canvas;
        this._super(canvas);

        if (oldCanvas !== null) {
            for (i = 0; i < this.ports.getSize(); i++) {
                oldCanvas.unregisterPort(this.ports.get(i));
            }
        }

        if (this.canvas !== null) {
            for (i = 0; i < this.ports.getSize(); i++) {
                this.canvas.registerPort(this.ports.get(i));
            }
        }
    },
    

    /**
     * @method
     * Returns the List of the connection model objects for which this Figure's model is the source. 
     * Callers must not modify the returned List. <br>
     * Only called if you use the MVC pattern of Draw2D<br>
     *
     * @return {graphiti.util.ArrayList} the List of model source connections
     * @template
     */
    getModelSourceConnections: function()
    {
       return graphiti.util.ArrayList.EMPTY_LIST;
    },
    
    /**
     * @method
     * Only called if you use the MVC pattern of Draw2D
     * 
     * @private
     * @final
     */
    refreshConnections: function()
    {
       // notify the view that the element has been changed
       if(this.canvas!==null){
          this.canvas.refreshConnections(this);
       }
    }
});