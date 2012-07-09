/**
 * @class graphiti.layout.locator.InputPortLocator
 * 
 * Repositions a Figure attached to a Connection when the 
 * Connection is moved. Provides for alignment at the start 
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend graphiti.layout.locator.Locator
 */
graphiti.layout.locator.InputPortLocator = graphiti.layout.locator.Locator.extend({
    NAME : "graphiti.layout.locator.InputPortLocator",
     
    /**
     * @constructor
     * Default constructor for a Locator which can layout a port in context of a 
     * {@link grapiti.shape.node.Node}
     * 
     */
    init:function(  ){
      this._super();
    },    
   
   /**
    * @method
    * Controls the location of an I{@link graphiti.Figure} 
    *
    * @param {Number} index child index of the figure
    * @param {graphiti.Figure} figure the figure to control
    * 
    * @template
    **/
    relocate:function(index, figure){
        var node = figure.getParent();
        var h = node.getHeight();
        var gap = h/(node.getInputPorts().getSize()+1);
        figure.setPosition(0, gap*(index+1));
    }
    
});



