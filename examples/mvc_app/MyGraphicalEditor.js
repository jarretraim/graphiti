/**
 * declase the namespace object for this example
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
	
//	       this.getGraphicalViewer().setViewPort("scrollarea");
//	       this.getGraphicalViewer().setPanning(true);
	       this.getGraphicalViewer().setCurrentSelection(null);
	       
	       
	       // layout FIRST the body
	       this.mainLayout = $('#container').layout({
	   	     west: {
	              resizable:true,
	              closable:true,
	              resizeWhileDragging:true,
	              paneSelector: "#navigation",
	            },
	            center: {
	              resizable:true,
	              closable:true,
	              resizeWhileDragging:true,
	              paneSelector: "#canvas"
	            }
	       });
	       
	       
           $(".palette_node_element").draggable({
               appendTo:"#container",
               stack:"#container",
               zIndex: 27000,
               helper:"clone",
            //   start: function(e, ui){$(ui.helper).addClass("ui-state-active ui-draggable-helper .ui-button.ui-state-focus");}
          });

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
