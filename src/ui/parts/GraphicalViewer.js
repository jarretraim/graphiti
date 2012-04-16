/**
 * @class graphiti.ui.parts.GraphicalViewer
 * 
 * The viewer is responsible for the editpart lifecycle. 
 * Editparts have visuals, such as {#link graphiti.Figures}, which are hosted 
 * by the viewer and its control. The viewer provides targeting of editparts via their visuals. 
 * 
 * @author Andreas Herz
 * 
 * @extends graphiti.Canvas
 */
graphiti.ui.parts.GraphicalViewer = graphiti.Canvas.extend(
{
    NAME : "graphiti.ui.parts.GraphicalViewer", // only for debugging


    /**
     * @constructor
     * Create a new canvas with the given HTML dom references.
     * 
     * @param {String} canvasId the id of the DOM element to use a parent container
     */
    init : function(canvasId)
    {
    	this._super(canvasId);
    	
    	this.factory = null; //graphit.mvc.EditPartFactory
    	this.model   = null; //graphiti.util.ArrayList<graphiti.mvc.AbstractObjectModel>
    	this.initDone= false;
    },


    /**
     * @method
     * Set the EditPartFactory for this view.
     * 
     * @param {graphiti.mvc.EditPartFactory} factory
     */
	setEditPartFactory:function( factory )
	{
	   this.factory = factory;
	   this.checkInit();
	},
	
	/**
	 * @method
	 * Set the model for the view
	 * 
	 * @param {graphiti.mvc.AbstractObjectModel} model
	 */
	setModel:function( model )
	{
	  try
	  {
	    if(model instanceof graphiti.mvc.AbstractObjectModel)
	    {
	      this.model = model;
	      this.checkInit();
	      this.model.addPropertyChangeListener(this);
	    }
	    else
	    {
	      alert("Invalid model class type:"+model.type);
	    }
	  }
	  catch(e)
	  {
	      pushErrorStack(e,"GraphicalViewer.setModel");
	  }
	},
	
	/**
	 * @method 
	 * Called from the model if any changes happens
	 * 
	 * @param {graphiti.mvc.Event} event
	 */
	propertyChange:function(  event)
	{
	  switch(event.property)
	  {
	    case graphiti.mvc.Event.ELEMENT_REMOVED:
	        var figure = this.getFigure(event.oldValue.getId());
	        this.removeFigure(figure);
	        break;
	    case graphiti.mvc.Event.ELEMENT_ADDED:
	        var figure = this.factory.createEditPart(event.newValue);
	        figure.setId(event.newValue.getId());
	        figure.updateViewFromModel();
	        this.addFigure(figure);
	        this.setCurrentSelection(figure);
	        break;
	   }
	},
	
	/**
	 *
	 * @private
	 **/
	checkInit:function()
	{
	    if(this.factory !==null && this.model!==null && this.initDone==false)
	    {
	      try
	      {
	          var children = this.model.getModelChildren();
	          var count = children.getSize();
	          for(var i=0;i<count;i++)
	          {
	            var child = children.get(i);
	            var figure = this.factory.createEditPart(child);
	            figure.setId(child.getId());
		        figure.updateViewFromModel();
	            this.addFigure(figure);
	          }
	      }
	      catch(e)
	      {
	          pushErrorStack(e,"GraphicalViewer.checkInit/[addFigure]");
	      }
	
	      try
	      {
	        // all figures are added. create now the transistions between these figures
	        //
	        var figures = this.getFigures();
	        var count = figures.getSize();
	        for(var i=0;i<count;i++)
	        {
	          var figure = figures.get(i);
	          if(figure instanceof graphiti.Node)
	          {
	            this.refreshConnections(figure);
	          }
	        }
	      }
	      catch(e)
	      {
	          pushErrorStack(e,"GraphicalViewer.checkInit/[refreshConnections]");
	      }
	    }
	},
	
	/**
	 * @method
	 * Refresh all connections related to the node within the current model/view
	 * 
	 * @param {graphiti.Node} node the node which are source or target of any connections
	 * @private
	 **/
	refreshConnections:function( node )
	{
	   try
	   {
	     var required = new graphiti.util.ArrayList();
	
	     // Create all missing connections
	     //
	     var modelConnect = node.getModelSourceConnections();
	
	     var count = modelConnect.getSize();
	     for(var i=0;i<count;i++)
	     {
	        var lineModel = modelConnect.get(i);
	        required.add(lineModel.getId());
	        var lineFigure= this.getLine(lineModel.getId());
	        if(lineFigure===null)
	        {
	           lineFigure = this.factory.createEditPart(lineModel);
	           var sourceModel = lineModel.getSourceModel();
	           var targetModel = lineModel.getTargetModel();
	
	           var sourceFigure= this.getFigure(sourceModel.getId());
	           var targetFigure= this.getFigure(targetModel.getId());
	
	           var sourcePort = sourceFigure.getOutputPort(lineModel.getSourcePortName());
	           var targetPort = targetFigure.getInputPort(lineModel.getTargetPortName());
	
	           lineFigure.setTarget(targetPort);
	           lineFigure.setSource(sourcePort);
	           lineFigure.setId(lineModel.getId());
		       lineFigure.updateViewFromModel();
	           this.addFigure(lineFigure);
	           this.setCurrentSelection(lineFigure);
	        }
	     }
	
	     // remove all obsolet connections
	     //
	     var ports = node.getOutputPorts();
	     count = ports.getSize();
	     for(var i=0; i< count;i++)
	     {
	        var connections = ports.get(i).getConnections();
	        var conCount = connections.getSize();
	        for(var ii=0;ii<conCount;ii++)
	        {
	           var connection = connections.get(ii);
	           if(!required.contains(connection.getId()))
	           {
	              this.removeFigure(connection);
	              required.add(connection.getId());
	           }
	        }
	     }
	  }
	  catch(e)
	  {
	      pushErrorStack(e,"GraphicalViewer.refreshConnections");
	  }
	}

});
