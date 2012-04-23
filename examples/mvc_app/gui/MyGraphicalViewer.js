

example.mvc_simple.MyGraphicalViewer = graphiti.ui.parts.GraphicalViewer.extend({
	
	init:function(model, id){
		this._super(id);
		
		this.model = model;
		this.setScrollArea("#"+id);
		
		this.currentDropConnection = null;
	},

    /**
     * @method
     * Called if the DragDrop object is moving around.<br>
     * <br>
     * Graphiti use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dragged DOM element.
     * @param {Number} x the x coordinate of the drag
     * @param {Number} y the y coordinate of the drag
     * 
     * @template
     **/
    onDrag:function(droppedDomNode, x, y )
    {
        var target = this.getBestLine(x, y);
        
        // the hovering element has been changed
        if (target !== this.currentDropConnection) {
            if (this.currentDropConnection !== null) {
                this.currentDropConnection.setGlow(false);
                this.currentDropConnection = null;
            }
            if (target !== null) {
                this.currentDropConnection=target;
                this.currentDropConnection.setGlow(true);
            }
        }
    },
    
    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Graphiti use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @private
     **/
    onDrop : function(droppedDomNode, x, y)
    {
        if (this.currentDropConnection !== null) {
            this.currentDropConnection.setGlow(false);
        }

        // create a command for the undo/redo support
        var command = new example.mvc_simple.CommandDrop(this, this.model, droppedDomNode, x, y);
        this.getCommandStack().execute(command);
    }
});

