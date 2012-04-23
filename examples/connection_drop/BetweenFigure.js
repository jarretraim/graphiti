
example.connection_drop.BetweenFigure = graphiti.SVGFigure.extend({

    init : function()
    {
        this._super();
        this.outputPort = null;
        this.inputPort = null;
        this.setDimension(50, 50);
    },


    getSVG: function(){
         return '<svg width="64" height="48" xmlns="http://www.w3.org/2000/svg" version="1.1">'+
         '<rect transform="rotate(-49.4127, 25.5, 28.6016)" id="svg_4" height="24.25" width="21.75" y="16.475" x="14.625" stroke-width="5" stroke="#000000" fill="#7fff00"/>'+
         '<rect id="svg_1" height="24.5" width="26.5" y="6.7248" x="4.125" stroke="#000000" fill="#FF0000"/>'+
         '<rect id="svg_2" height="17.5" width="19" y="7.22366" x="23.375" stroke-width="5" stroke="#000000" fill="#FF0000"/>'+
         '<rect transform="rotate(28.719, 47.5, 22.1016)" id="svg_3" height="18.75" width="19.25" y="12.725" x="37.875" stroke="#7f3f00" fill="#00bfbf"/>'+
                '</svg>';
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

        if (canvas !== null)
        {
            if(this.outputPort===null)
                this.outputPort = new graphiti.OutputPort(canvas);
            this.addPort(this.outputPort, this.width,this.height/2);

            if(this.inputPort===null)
            	this.inputPort = new graphiti.InputPort(canvas);
            this.addPort(this.inputPort, 0,this.height/2);
        }
        else if(this.outputPort!==null){
            this.outputPort.setCanvas(null);
            this.inputPort.setCanvas(null);
        }
    },
    
    /**
     * @method
     * Called if the user drop this element onto the dropTarget. 
     * 
     * @param {graphiti.Figure} dropTarget The drop target.
     * @private
     **/
    onDrop:function(dropTarget)
    {
    	if(dropTarget instanceof graphiti.Connection){
    		var oldSource = dropTarget.getSource();
    		dropTarget.setSource(this.outputPort);
   		
    		var additionalConnection = new graphiti.Connection();
    		this.getCanvas().addFigure(additionalConnection);
    		additionalConnection.setSource(oldSource);
    		additionalConnection.setTarget(this.inputPort);
    	}
    }
    


});
