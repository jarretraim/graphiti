
/**
 * @class graphiti.shape.node.Node
 * 
 * A Node is the base class for all figures which can have {@link graphiti.Port}s. A {@link graphiti.Port} is the
 * anchor for a {@link graphiti.Connection} line.<br><br>A {@link graphiti.Port} is a green dot which can 
 * be dragged and dropped over another port.<br>
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.Figure 
 */
graphiti.shape.node.Node = graphiti.Figure.extend({
 
	NAME : "graphiti.shape.node.Node",

    /**
     * @constructor
     * Creates a new Node element which are not assigned to any canvas.
     */
    init: function( ) {
      this.bgColor   = new  graphiti.util.Color(255,255,255);
      this.lineColor = new  graphiti.util.Color(128,128,255);
      this.lineStroke=1;
      
      this.inputPorts = new graphiti.util.ArrayList();
      this.outputPorts= new graphiti.util.ArrayList();
      
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
      // TODO: expensive! Find another solution.
      var result = this.inputPorts.clone();
      return result.addAll(this.outputPorts);
    },
    
    
    /**
     * @method
     * Return all input ports of the node.
     *
     * @return {graphiti.util.ArrayList}
     **/
    getInputPorts: function()
    {
      return this.inputPorts.clone();
    },
    
    /**
     * @method
     * Return all output ports of the node.
     *
     * @return {graphiti.util.ArrayList}
     **/
    getOutputPorts: function()
    {
      return this.outputPorts.clone();
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
        for ( var i = 0; i < this.outputPorts.getSize(); i++) {
            var port = this.outputPorts.get(i);
            if (port.getName() === portName) {
                return port;
            }
        }

        for ( var i = 0; i < this.inputPorts.getSize(); i++) {
            var port = this.inputPorts.get(i);
            if (port.getName() === portName) {
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
     * @param {String/Number} portName The name or numeric index of the port to return.
     * @return {graphiti.InputPort} Returns the port with the hands over name or null.
     **/
    getInputPort: function( portName)
    {
        if(typeof portName === "number"){
            return this.inputPorts.get(portName);
        }
        
        for ( var i = 0; i < this.inputPorts.getSize(); i++) {
            var port = this.inputPorts.get(i);
            if (port.getName() === portName) {
                return port;
            }
        }
      
        return null;
    },
    
    /**
     * @method
     * Return the output port with the corresponding name.
     *
     * @param {String/Number} portName The name or the numeric index of the port to return.
     * @return {graphiti.OutputPort} Returns the port with the hands over name or null.
     **/
    getOutputPort: function( portName)
    {
        if(typeof portName === "number"){
            return this.outputPorts.get(portName);
        }
        
         for ( var i = 0; i < this.outputPorts.getSize(); i++) {
            var port = this.outputPorts.get(i);
            if (port.getName() === portName) {
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
        if(!(port instanceof graphiti.Port)){
            throw "Argument is not typeof 'graphiti.Port'. \nFunction: graphiti.shape.node.Node#addPort";
        }
        
        if(typeof y === "undefined"){
            x=10;
            y=10;
        }
        
        if (port instanceof graphiti.InputPort) {
            this.inputPorts.add(port);
        }
        else {
            this.outputPorts.add(port);
        }
        
        port.setPosition(x, y);
        port.setParent(this);
        port.setCanvas(this.canvas);

        // You can't delete a port with the [DEL] key if a port is a child of a node
        port.setDeleteable(false);

        if (this.canvas !== null) {
            port.getShapeElement();
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
        this.inputPorts.remove(port);
        this.outputPorts.remove(port);

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
     * @method
     * Create a standard Port for this element. Inherited class can override this
     * method to create its own type of ports.
     * 
     * @param {String} type the type of the requested port. possible ["input", "output"]
     * @param {String} [name] name of the port
     * @template
     */
    createPort: function(type, name){
        var newPort = null;
        var count =0;
    	switch(type){
    	case "input":
    		newPort= new graphiti.InputPort(name);
    		count = this.inputPorts.getSize();
    		break;
    	case "output":
    		newPort= new graphiti.OutputPort(name);
            count = this.outputPorts.getSize();
    		break;
    	default:
            throw "Unknown type ["+type+"] of port requested";
    	}
    	
    	if(typeof name === "undefined"){
    	    newPort.setName(type+count);
    	}
    	
    	this.addPort(newPort);
    	// relayout the ports
    	this.setDimension(this.width,this.height);
    	
    	return newPort;
    },
    
    /**
     * @private
     **/
    setCanvas : function(canvas)
    {
        var oldCanvas = this.canvas;
        this._super(canvas);
        var canvas =  this.canvas;
        
        if (oldCanvas !== null) {
            this.inputPorts.each(function(i,port){
                oldCanvas.unregisterPort(port);
            });
            this.outputPorts.each(function(i,port){
                oldCanvas.unregisterPort(port);
            });
        }

        if (canvas !== null) {
            this.inputPorts.each(function(i,port){
                port.setCanvas(canvas);
                canvas.registerPort(port);
       
            });
            this.outputPorts.each(function(i,port){
                port.setCanvas(canvas);
                canvas.registerPort(port);
            });
        }
    },
    
    
    /**
     * @inheritdoc
     *
     * @param {Number} w The new width of the figure
     * @param {Number} h The new height of the figure
     **/
    setDimension:function(w, h)
    {
        this._super(w,h);
        
        // get the new, maybe adjusted, width
        w = this.getWidth();

        // layout the ports with default vertical gap.
        //
        var gap = this.getHeight()/(this.outputPorts.getSize()+1);
        this.outputPorts.each(function(i, port){
            port.setPosition(w,gap*(i+1));
        });
        
        gap = this.getHeight()/(this.inputPorts.getSize()+1);
        this.inputPorts.each(function(i, port){
            port.setPosition(0,gap*(i+1));
        });
    },

    /**
     * @method
     * Called if the value of any port has been changed
     * 
     * @param {graphiti.Port} relatedPort
     * @template
     */
    onPortValueChanged: function(relatedPort){
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