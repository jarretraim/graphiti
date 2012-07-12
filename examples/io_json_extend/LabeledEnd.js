/**
 * @class example.connection_locator.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend graphiti.Connection
 */
example.io_json_extend.LabeledEnd = graphiti.shape.node.End.extend({
    
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

    /**
     * @method 
     * Return an objects with all important attributes for XML or JSON serialization
     * 
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        var memento = this._super();
        
        // add your special data to the persistend object
        //
        memento.my_label = this.label.getText();
        
        return memento;
    },
    
    /**
     * @method 
     * Read all attributes from the serialized properties and transfer them into the shape.
     * 
     * @param {Object} memento
     * @returns 
     */
    setPersistentAttributes : function(memento)
    {
        this._super(memento);
        
        // read the special value (the label) and update the label/decoration of the element
        this.label.setText(memento.my_label);
    }
});
