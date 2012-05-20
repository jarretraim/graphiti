

example.View = graphiti.Canvas.extend({
	
	init:function(id){
		this._super(id);
		
		this.setScrollArea("#"+id);
	}

});

