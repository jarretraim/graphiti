/**
 * @class graphiti.ui.LabelEditor
 * Base class for all graphiti.shape.basic.Label editors. The default implementation is to open
 * a simple javascript prompt dialog.<br>
 * Use LabelInplaceEditor or your own implementation if you need more comfort. 
 * 
 * @author Andreas Herz
 */

graphiti.ui.LabelEditor = Class.extend({
    
    /**
     * @constructor
     * @private
     */
    init: function(){
        
    },
    
    /**
     * @method
     * Trigger the edit of the label text.
     * 
     * @param {graphiti.shape.basic.Label} label the label to edit
     */
    start: function( label){
    	var newText = prompt("Label: ", shape.getText());
    	if(newText){
    		shape.setText(newText);
    	}
    }
    
});