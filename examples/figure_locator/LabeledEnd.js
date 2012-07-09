/**
 * @class example.connection_locator.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend graphiti.Connection
 */
example.figure_locator.LabeledEnd = graphiti.shape.node.End.extend({
    
    init:function()
    {
      this._super();
    
      // Create any Draw2D figure as decoration for the connection
      //
      this.label = new graphiti.shape.basic.Label("I'm a Label too");
      this.label.setColor("#0d0d0d");
      this.label.setFontColor("#0d0d0d");
      
      // add the new decoration to the connection with a position locator.
      //
      this.addFigure(this.label, new graphiti.layout.locator.BottomLocator(this));
    },
    
    getLabel:function(){
    	return this.label.getText();
    },
    
    setLabel: function(text){
    	this.label.setText(text);
    }
});
