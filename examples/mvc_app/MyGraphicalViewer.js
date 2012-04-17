

example.mvc_simple.MyGraphicalViewer = graphiti.ui.parts.GraphicalViewer.extend({
	
	init:function(model, id){
		this._super(id);
		
		this.model = model;
		this.setScrollArea("#"+id);
	    
        $('#canvas' ).droppable({
            accept: '.palette_node_element',
            drop:$.proxy(function(event, ui){
            	console.log(ui.offset);
         	    var pos = this.fromDocumentToCanvasCoordinate(ui.offset.left, ui.offset.top);
console.log(pos);
         	    var newNode = new example.mvc_simple.NodeModel();
         	    newNode.setPosition(pos.getX(), pos.getY());
         	    this.model.addNode(newNode);
       
            },this)
         });
	},
	

});