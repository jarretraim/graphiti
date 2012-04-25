/**
 * A simple Connection with a label.
 *
 * @version @VERSION@
 * @author Andreas Herz
 */
example.locator_connection.LabelConnection= graphiti.Connection.extend({
    
    init:function()
    {
      this._super();
    
      // Create any Draw2D figure as decoration for the connection
      //
      this.label = new graphiti.Label("Message");
    
  
      // add the new decoration to the connection with a position locator.
      //
      this.addFigure(this.label, new graphiti.layout.locator.ManhattanMidpointLocator(this));
    },
    
    getLabel:function(){
    	return this.label.getText();
    },
    
    setLabel: function(text){
    	this.label.setText(text);
    }
});
