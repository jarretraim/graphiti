
example.mvc_simple.MyGraphicalEditorFactory =graphiti.mvc.controller.EditPartFactory.extend({
	
    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function( ){

    	this._super();
    },

	/**
	 * @method
	 * Creates a new Figure given the specified model.
	 * 
	 * @param {graphiti.mvc.AbstractObjectModel} mode - the model of the figure being created
	 *
	 * @return {graphiti.Figure}
	 **/
	createEditPart : function(model)
    {
        var figure = null;

        if (model instanceof example.mvc_simple.NodeModel) {
            figure = new example.mvc_simple.NodeFigure();
        }
        else if (model instanceof example.mvc_simple.ConnectionModel) {
            figure = new example.mvc_simple.ConnectionFigure();
        }

        if (figure === null) {
            throw "MyGraphicalEditorFactory called with unknown model class";
        }

        figure.setModel(model);

        return figure;
    }

});
