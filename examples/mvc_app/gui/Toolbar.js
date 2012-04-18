
example.mvc_simple.Toolbar = Class.extend({
	
	init:function(elementId, view){
		this.html = $("#"+elementId);
		this.view = view;
		
		view.getCommandStack().addEventListener(this);

		view.addSelectionListener(this);
		
		// Inject the UNDO Button and the callbacks
		//
		this.undoButton  = $("<button>Undo</button>");
		this.html.append(this.undoButton);
		this.undoButton.button().click($.proxy(function(){
		       this.view.getCommandStack().undo();
		},this)).button( "option", "disabled", true );

		// Inject the REDO Button and the callback
		//
		this.redoButton  = $("<button>Redo</button>");
		this.html.append(this.redoButton);
		this.redoButton.button().click($.proxy(function(){
		    this.view.getCommandStack().redo();
		},this)).button( "option", "disabled", true );
		
		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);

		// Inject the DELETE Button
		//
		this.deleteButton  = $("<button>Delete</button>");
		this.html.append(this.deleteButton);
		this.deleteButton.button().click($.proxy(function(){
			var node = this.view.getCurrentSelection().getModel();
			var command = new example.mvc_simple.CommandDelete(node);
			this.view.getCommandStack().execute(command);
		},this)).button( "option", "disabled", true );
	},

	/**
	 * @method
	 * Called after a registion in the canvas if the current main selection has been changed.
	 * 
	 * @param {graphiti.Figure}
	 */
	onSelectionChanged : function(figure){
		this.deleteButton.button( "option", "disabled", figure===null );
	},
	
	/**
	 * @method
	 * Sent when an event occurs on the command stack. graphiti.command.CommandStackEvent.getDetail() 
	 * can be used to identify the type of event which has occurred.
	 * 
	 * @template
	 * 
	 * @param {graphiti.command.CommandStackEvent} event
	 **/
	stackChanged:function(event)
	{
		this.undoButton.button( "option", "disabled", !event.getStack().canUndo() );
		this.redoButton.button( "option", "disabled", !event.getStack().canRedo() );
	}
});