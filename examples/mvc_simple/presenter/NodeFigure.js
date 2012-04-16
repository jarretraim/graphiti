
example.mvc_simple.NodeFigure = graphiti.Rectangle.extend({

    init : function()
    {
        this._super();
        this.outputPort = null;
        this.inputPort = null;
        this.setDimension(50, 50);
        this.setResizeable(false);
        this.setAlpha(0.5);
    },

    propertyChange:function( /*:draw2d.PropertyChangeEvent*/ event)
    {
      console.log("EVENT:"+event.property);
      switch(event.property)
      {
        case graphiti.mvc.Event.PROPERTY_CHANGED:
            this.updateViewFromModel();
            break;
        case graphiti.mvc.Event.POSITION_CHANGED:
            this.setPosition(event.newValue.x,event.newValue.y);
            break;
        case graphiti.mvc.Event.CONNECTION_ADDED:
            this.refreshConnections();
            break;
        case graphiti.mvc.Event.CONNECTION_REMOVED:
            this.refreshConnections();
            break;
        default:
            break;
       }
    },


    /**
     * @method
     * Set the canvas for this figure. This is the best point to ad some Ports
     * 
     * @param {graphiti.Canvas} canvas
     */
    setCanvas : function(canvas)
    {
        this._super(canvas);

        if (canvas !== null && this.outputPort === null)
        {
            this.outputPort = new example.mvc_simple.OutputPort(canvas);
            this.outputPort.setCanvas(canvas);
            this.addPort(this.outputPort, this.width,this.height/2);

            this.inputPort = new example.mvc_simple.InputPort(canvas);
            this.inputPort.setCanvas(canvas);
            this.addPort(this.inputPort, 0,this.height/2);
        }
    },


    updateViewFromModel:function()
    {
	   var pos = this.getModel().getPosition();
	   this.setPosition(pos.getX(), pos.getY());
//    	   this.initPorts();
    },


    /**
     * Returns the List of the connection model objects for which this Figure's model is the source. 
     * Callers must not modify the returned List. 
     * Only called if you use the MVC pattern of Draw2D
     *
     * @type draw2d.ArrayList
     * @return the List of model source connections
     */
    getModelSourceConnections:function()
    {
       return this.getModel().getConnectionModels();
    },

    /**
     * @method
     * Returns the Command to perform the specified Request or null.
      *
     * @param {graphiti.EditPolicy} request describes the Command being requested
     * 
     * @return {graphiti.command.Command} null or a Command
     **/
   createCommand:function( request)
    {
      if(request.getPolicy() === graphiti.EditPolicy.MOVE)
      {
        return new example.mvc_simple.CommandMove(this.model);
      }
 
      return this._super(request);
    }

});
