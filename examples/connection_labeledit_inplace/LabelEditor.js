

example.connection_labeledit.LabelEditor = Class.extend({
	
	init:function(canvas){
		
		this.html = $('<input class="inputbox" id="dialog_label_text">');
		this.html.hide();
		$("body").append(this.html);
		
		this.html.autoResize();
		
		$("#dialog_label_text").bind("keyup",$.proxy(function(e){
		      if (e.which == 13) {
		           $("#dialog_label_text").blur();
		           this.html.fadeOut();
		      }
		      var label = $("#dialog_label_text").val();
		      this.currentFigure.setLabel(label);
		},this));
		
		// Setup the selectionListener for the Canvas
		//
	    canvas.addSelectionListener($.proxy(function(e){
	    	this.currentFigure = e;
     		if(e instanceof example.connection_labeledit.LabelConnection){
	     		$("#dialog_label_text").val(e.getLabel());
	     		
	     		var label = e.getLabelShape();
	     		var bb = label.getBoundingBox();

	     		bb.setPosition(canvas.fromCanvasToDocumentCoordinate(bb.x,bb.y));

	     		// remove the scroll from the body if we add the canvas directly into the body
	     		var scrollDiv = canvas.getScrollArea();
	     		if(scrollDiv.is($("body"))){
	     		   bb.translate(canvas.getScrollLeft(), canvas.getScrollTop());
	     		}
	     		
	     		bb.translate(-1,-1);
	     		bb.resize(2,2);
	     		
	     		this.html.css({position:"absolute",top: bb.y, left:bb.x, width:bb.w, height:bb.h});
		     	this.html.fadeIn($.proxy(function(){
		     		console.log("done");
		     		this.html.focus();
		     	},this));
	     	}
	     	else{
                this.html.fadeOut();
	     	}
	    },this));
		  
	}
});