/**
 * @class example.connection_locator.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend graphiti.Connection
 */
example.connection_locator.LabelConnection= graphiti.Connection.extend({
    
    init:function()
    {
      this._super();
    
      // Create any Draw2D figure as decoration for the connection
      //
      this.label = new graphiti.shape.basic.Label("I'm a Label");
      this.label.setColor("#ffffff");
      this.label.setFontColor("#ffffff");
      
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
