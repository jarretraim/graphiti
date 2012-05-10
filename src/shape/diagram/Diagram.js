
/**
 * @class graphiti.shape.diagram.Diagram
 * Base class for all digrams.
 * 
 * @extends graphiti.SetFigure
 */
graphiti.shape.diagram.Diagram = graphiti.SetFigure.extend({
    
    init: function(){
        
        this.data = [];
        this.min = 0;
        this.max = 10;
        this.padding = 5;
        this.cache = {}; 
        this._super();
        
        this.setBackgroundColor("#8dabf2");
        this.setStroke(1);
        this.setColor("#f0f0f0");
        this.setRadius(2);
        this.setResizeable(true);
        this.setDimension(200,60);
    },
    
    setData:function( data){
        this.data = data;
        this.min = Math.min.apply(Math, this.data);
        this.max = Math.max.apply(Math, this.data);
        this.cache={};
        this.repaint();
    },

    setDimension:function(w,h){
        this.cache={};
        this._super(w,h);
    },

    /**
     * @method
     * Return the calculate width of the set. This calculates the bounding box of all elements.
     * 
     * @return {Number} the calculated width of the label
     **/
    getWidth : function() {
        return this.width;
    },
    
    /**
     * @method
     * Return the calculated height of the set. This calculates the bounding box of all elements.
     * 
     * @return {Number} the calculated height of the label
     */
    getHeight:function()
    {
       return this.height;
    },

    /**
     * @method
     * 
     * @param attributes
     */
    repaint: function(attributes){
        if (typeof attributes === "undefined") {
            attributes = {};
        }

        attributes.fill= "90-#000:5-#4d4d4d:95";
       
        this._super(attributes);
    }

});