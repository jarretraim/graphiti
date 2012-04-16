
/**
 * @class graphiti.ui.parts.GraphicalEditor
 * 
 * This class serves as a quick starting point for clients who are new to graphiti. It will 
 * create an Editor containing a single GraphicalViewer as its control.<br>
 * <br>
 * This class should only be used as a reference for creating your own EditorPart implementation. 
 * This class will not suit everyone's needs, and may change in the future. Clients may copy the implementation. 
 * 
 * @author Andreas Herz
 */
graphiti.ui.parts.GraphicalEditor = Class.extend(
{
    NAME : "graphiti.ui.parts.GraphicalEditor", // only for debugging

    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function(canvasId)
    {
    	this.view =  new graphiti.ui.parts.GraphicalViewer(canvasId);
    	this.initializeGraphicalViewer();
    },
	
	/**
	 * @method
	 * Called to configure the graphical viewer before it receives its contents.  This is
	 * where the root editpart should be configured. Subclasses should extend or override this
	 * method as needed.
	 **/
	initializeGraphicalViewer:function()
	{
	},
	
	
	/**
	 * @method
	 * Provides the {#link graphiti.command.CommandStack} of the Editor.
	 * 
	 * @return {graphiti.command.CommandStack}
	 */
	getCommandStack:function()
	{
		return this.getGraphicalViewer().getCommandStack();
	},
	

	/**
	 * @method
	 * Returns the graphical viewer.
	 * 
	 * @return {graphiti.ui.parts.GraphicalViewer}
	 **/
	getGraphicalViewer:function()
	{
	   return this.view;
	},
	
	
	/**
	 * @method
	 * Execute the command and add them to the undo/redo stack
	 * 
	 * @param {graphiti.command.Command}
	 **/
	executeCommand:function( command)
	{
	  this.view.getCommandStack().execute(command);
	},

});
