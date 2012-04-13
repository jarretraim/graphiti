var example = {
		mvc_simple: {}
};

example.mvc_simple.MyGraphicalEditor = graphiti.ui.parts.GraphicalEditor.extend(
{
    NAME : "example.mvc_simple.MyGraphicalEditor", // only for debugging

    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function(canvasId, readonly)
    {
    	this._super(canvasId);
    	this.readonly = readonly;
    },

	
	/**
	 * @method
	 * Called to configure the graphical viewer before it receives its contents. 
	 * Subclasses should extend or override this method as needed.
	 * 
	 * @param {graphiti.mvc.AbstractObjectModel}
	 **/
	setModel:function( model)
	{
		try
		{
		   this.model = model;
		   // assign the model to the view
		   this.getGraphicalViewer().setModel(this.model);
		   // ...and the factory for the editparts/figures
	       this.getGraphicalViewer().setEditPartFactory(new example.mvc_simple.MyGraphicalEditorFactory(this.readonly));
	
//	       this.getGraphicalViewer().setViewPort("scrollarea");
//	       this.getGraphicalViewer().setPanning(true);
	       this.getGraphicalViewer().setCurrentSelection(null);
	    }
		catch(e)
		{
		   pushErrorStack(e,"MyGraphicalEditor.setModel");
		}
	},
	
	/**
	 * @method
	 * Return true if the editor is in readonly mode.
	 * 
	 * @return {Boolean}
	 */
	isReadonly:function()
	{
	   return this.readonly;
	},
	
	
	/**
	 * @method
	 * Return the model inside the current Editor.
	 * 
	 * @return {graphiti.mvc.AbstractObjectModel}
	 */
	getModel:function()
	{
	   return this.model;
	}
});
