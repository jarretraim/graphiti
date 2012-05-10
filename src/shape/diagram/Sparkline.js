
/**
 * @class graphiti.shape.diagram.Sparkline
 * 
 * Small data line diagram.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var testData = [];
 *     for(var i=0;i<100;i++) {
 *       testData.push(Math.floor(Math.random() * 100));
 *     }
 *     
 *     var sparkline = new graphiti.shape.diagram.Sparkline();
 *     sparkline.setData(testData);
 *   
 *     canvas.addFigure( sparkline,100,60);
 *     
 * @extends graphiti.shape.diagram.Diagram
 */
graphiti.shape.diagram.Sparkline = graphiti.shape.diagram.Diagram.extend({
    
    init: function(){
        this.path=null;
        this._super();
    },
    
    
    /**
     * @method
     * Create the additional elements for the figure
     * 
     */
    createSet: function(){
        this.path = this.canvas.paper.path("M0 0 l0 0");
        return this.path;
    },
     
    /**
     * 
     * @param attributes
     */
    repaint: function(attributes){
        
        var padding = this.padding;
        var width = this.getWidth()- 2*+this.padding;
        var height= this.getHeight()- 2*+this.padding;
        var length= this.data.length;
        var min = this.min;
        var max = this.max;
        var toCoords = function(value, idx) {
            var step = (width/ (length-1));
            return {
                y:  -((value-min)/(max-min) * height) + height+padding,
                x: padding+idx*step
            };
        };

        if(this.path!==null && (typeof this.cache.pathString ==="undefined")){
            var prev_pt=null;
            $.each(this.data, $.proxy(function(idx, item) {
                var pt = toCoords(item, idx);
                if(prev_pt===null) {
                    this.cache.pathString = [ "M", pt.x, pt.y].join(" ");
                }
                else{
                    this.cache.pathString = [ this.cache.pathString,"L", pt.x, pt.y].join(" ");
                }
                prev_pt = pt;
            },this));
            this.path.attr({path:this.cache.pathString, stroke: "#f0f0f0"});
            
        }
        
        this._super(attributes);
    }

});