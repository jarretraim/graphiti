
example.mvc_simple.PropertyPane = Class.extend({
	NAME : "example.mvc_simple.PropertyPane", // just for debugging
	
	init:function(elementId, view){
		this.html = $("#"+elementId);
		this.view = view;

        // inject the column-palette into the content area
        //
        this.palette = $( '<span>This is the palette</span>');
                                       
        this.html.append(this.palette);
 
		view.addSelectionListener(this);
	},

	/**
	 * @method
	 * Called after a registion in the canvas if the current main selection has been changed.
	 * 
	 * @param {graphiti.Figure} figure
	 */
	onSelectionChanged : function(figure){
         this.html.html('');
	     this.currentFigure = figure;
	     if(figure===null){
           return;
	     }
	       
	     
	     this._addPropertyText();
//	     this._addPropertyFontFamily();
//	     this._addPropertyFontStyle();
//	     this._addPropertyFontSize();
//	     this._addPropertyEvent();
	},
	  /************************************************************************************************/
	  _addPropertyText: function(){
	  /************************************************************************************************/
	    this.html.append('<div class="property_container">'+
                         '   <div class="dialog_label">Id</div>'+
                         '   <input class="dialog_input" id="dialog_label_text" style="width:100%">'+
                         '</div>'
                        );
	 
	     var label =this.currentFigure.getId();
	     $("#dialog_label_text").val(label);
	     $("#dialog_label_text").bind("keyup",$.proxy(function(e){
	           if (e.which == 13) {
	                $("#dialog_label_text").blur();
	           }
               var label = $("#dialog_label_text").val();
               this.currentFigure.setId(label);
	     },this));
	  }
	 
	
});