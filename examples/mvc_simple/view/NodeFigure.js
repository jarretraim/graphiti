
example.mvc_simple.NodeFigure = graphiti.Rectangle.extend({

    init : function()
    {
        this._super();
        this.outputPort = null;
        this.setDimension(50, 50);
        this.setResizeable(false);
        this.setAlpha(0.5);
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
            this.outputPort = new graphiti.OutputPort(canvas);
            this.outputPort.setCanvas(canvas);
            this.addPort(this.outputPort, this.width,this.height/2);
        }
    },


    updateViewFromModel:function()
    {
	   var pos = this.getModel().getPosition();
	   this.setPosition(pos.getX(), pos.getY());
//    	   this.initPorts();
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
