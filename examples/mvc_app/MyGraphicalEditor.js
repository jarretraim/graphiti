/**
 * declare the namespace object for this example
 */
var example = {
		mvc_simple: {}
};

/**
 * @class example.mvc_simple.MyGraphicalEditor
 * 
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 * @extends graphiti.ui.parts.GraphicalEditor
 */
example.mvc_simple.MyGraphicalEditor = graphiti.ui.parts.GraphicalEditor.extend(
{
    NAME : "example.mvc_simple.MyGraphicalEditor", // only for debugging

    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function(canvasId)
    {
    	this._super(canvasId);
    },

	
	/**
	 * @method
	 * Called to configure the graphical viewer before it receives its contents. 
	 * Subclasses should extend or override this method as needed.
	 * 
	 * @param {graphiti.mvc.AbstractObjectModel} model
	 **/
	setModel:function( model)
	{
		try
		{
		   this.model = model;
		   // assign the model to the view
		   this.getGraphicalViewer().setModel(this.model);
		   // ...and the factory for the editparts/figures
	       this.getGraphicalViewer().setEditPartFactory(new example.mvc_simple.MyGraphicalEditorFactory());
	
	       this.getGraphicalViewer().setCurrentSelection(null);
	       
	       
	       // layout FIRST the body
	       this.appLayout = $('#container').layout({
	   	     west: {
	              resizable:true,
	              closable:true,
	              resizeWhileDragging:true,
	              paneSelector: "#navigation"
	            },
	            center: {
	              resizable:true,
	              closable:true,
	              resizeWhileDragging:true,
	              paneSelector: "#content"
	            }
	       });
	       
	       //
	       this.contentLayout = $('#content').layout({
	   	     north: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
                  size:50,
	              paneSelector: "#toolbar"
	            },
	            center: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
	              paneSelector: "#canvas"
	            }
	       });
	       
           this.toolbar = new example.mvc_simple.Toolbar("toolbar",  this.getGraphicalViewer() );

	    }
		catch(e)
		{
		   pushErrorStack(e,"MyGraphicalEditor.setModel");
		}
	},
	
	initializeGraphicalViewer:function(canvasId)
	{
    	this.view = new example.mvc_simple.MyGraphicalViewer(this.model, canvasId);
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
