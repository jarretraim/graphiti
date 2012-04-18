

example.mvc_simple.MyGraphicalViewer = graphiti.ui.parts.GraphicalViewer.extend({
	
	init:function(model, id){
		this._super(id);
		
		this.model = model;
		this.setScrollArea("#"+id);
	    
        $('#canvas' ).droppable({
            accept: '.palette_node_element',
            drop:$.proxy(function(event, ui){
        	    var pos = this.fromDocumentToCanvasCoordinate(ui.offset.left, ui.offset.top);
         	    var newNode = new example.mvc_simple.NodeModel();
         	    newNode.setPosition(pos.getX(), pos.getY());
         	    
         	    // create a command for the undo/redo support
         	    var command = new example.mvc_simple.CommandAdd(this.model, newNode);
         	    this.getCommandStack().execute(command);
       
            },this)
         });
	}


});