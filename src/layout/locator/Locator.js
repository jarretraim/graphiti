/**
 * @class graphiti.layout.locator.Locator
 * 
 * Controls the location of an IFigure. 
 *
 * @author Andreas Herz
 */
graphiti.layout.locator.Locator= Class.extend({
    NAME : "graphiti.layout.locator.Locator",
   
    /**
     * @constructor
     * Initial Constructor
     * 
     * @param {graphiti.Figure} [parentShape] the parent or owner of the child 
     */
    init:function(parentShape )
    {
        this.parent = parentShape;
    },
    
    /**
     * @method
     * Returns the associated owner of the locator
     *
     * @return {graphiti.Figure}
     **/
    getParent:function()
    {
       return this.parent;
    },
    
    
    /**
     * @method
     * Set the associated owner of the locator
     *
     * @param {graphiti.Figure} parentShape
     **/
    setParent:function(parentShape)
    {
        this.parent= parentShape;
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
    relocate:function(index, figure)
    {
    	
    }
});