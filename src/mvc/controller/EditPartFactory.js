
/**
 * @class graphiti.mvc.controller.EditPartFactory
 * 
 * A factory for creating new EditParts. EditPartViewers can be configured with an EditPartFactory.
 * Whenever an EditPart in that viewer needs to create another EditPart, it can use the Viewer's factory.
 * The factory is also used by the viewer whenever EditPartViewer.setContents(Object)  is called.
 * 
 * @author Andreas Herz
 */
graphiti.mvc.controller.EditPartFactory= Class.extend({
	
	/**
	 * @constructor
	 * Create a new Factory object
	 */
	init: function(){
		
	},
	
	/**
	 * @method
	 * Create a new EditPart related to the given model.
	 * 
	 * @param {draw2d.EditPart} context - The context in which the EditPart is being created, such as its parent.
	 * @param {Object} mode - the model of the EditPart being created
	 *
	 * @type draw2d.Figure
	 **/
	createEditPart:function( /*:draw2d.AbstractObjectModel*/ model)
	{
	}

});
