

example.locator_connection.LabelEditor = Class.extend({
	
	init:function(canvas){
		
		this.html = $('<div id="inputbox" class="shadow">'+
                         '   <div class="dialog_label">Label</div>'+
                         '   <input class="dialog_input" id="dialog_label_text" style="width:100%">'+
                         '</div>'
               );
	
		$("body").append(this.html);
		
	    var label ="-disabled-";
		$("#dialog_label_text").val(label);
     	$("#dialog_label_text").prop("disabled",true);
		$("#dialog_label_text").bind("keyup",$.proxy(function(e){
		      if (e.which == 13) {
		           $("#dialog_label_text").blur();
		      }
		      var label = $("#dialog_label_text").val();
		      this.currentFigure.setLabel(label);
		},this));
		
		// Setup the selectionListener for the Ccanvas
		//
	    canvas.addSelectionListener($.proxy(function(e){
	    	this.currentFigure = e;
     		if(e instanceof example.locator_connection.LabelConnection){
	     		$("#dialog_label_text").val(e.getLabel());
		     	$("#dialog_label_text").prop("disabled",false);
	     	}
	     	else{
	     	    $("#dialog_label_text").val("-disabled-");
		     	$("#dialog_label_text").prop("disabled",true);
	     	}
	    },this));
		  
	}
});