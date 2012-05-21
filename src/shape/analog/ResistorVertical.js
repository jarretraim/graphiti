
/**
 * @class graphiti.shape.analog.ResistorVertical
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new graphiti.shape.analog.ResistorVertical();
 *     canvas.addFigure(figure,10,10);
 *     
 *     
 * @extends graphiti.SVGFigure
 */
graphiti.shape.analog.ResistorVertical = graphiti.SVGFigure.extend({

    NAME:"graphiti.shape.analog.ResistorVertical",
    
    // custom locator for the special design of the Input area
    MyInputPortLocator : graphiti.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            figure.setPosition(w/2, h);
        }
    }),
    
    // custom locator for the special design of the Output area
    MyOutputPortLocator : graphiti.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            figure.setPosition(w/2, 0);
        }
    }),

    /**
     * @constructor
     * Create a new instance
     */
    init:function(){
        this._super();

        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();

        this.createPort("input", this.inputLocator); // GND
        this.createPort("output",this.outputLocator);// VCC
    },
    

    getSVG: function(){
         return '<svg width="49" height="28" xmlns="http://www.w3.org/2000/svg" version="1.1">'+
                '<polyline stroke-miterlimit="14.3" points="4.954788446426392,35.784969329833984 4.954788446426392,28.71969985961914 1.046627976000309,27.119665145874023 9.305914878845215,23.46563148498535 1.0012270519509912,19.702756881713867 9.305914878845215,15.993839263916016 1.046627976000309,12.397480964660645 9.305914878845215,8.691352844238281 4.954788446426392,6.748985290527344 4.954788446426392,0.0037210118025541306 " stroke="#010101" fill="none"/>'+
                '</svg>';
    }
});