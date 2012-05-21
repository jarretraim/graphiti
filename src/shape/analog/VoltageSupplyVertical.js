
/**
 * @class graphiti.shape.analog.VoltageSupplyVertical
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new graphiti.shape.analog.VoltageSupplyVertical();
 *     canvas.addFigure(figure,10,10);
 *     
 *     
 * @extends graphiti.SVGFigure
 */
graphiti.shape.analog.VoltageSupplyVertical = graphiti.SVGFigure.extend({

    NAME:"graphiti.shape.analog.VoltageSupplyVertical",
    
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
         '<path d="m19.62398,12.37594l-9.87926,0m-9.74355,8.22145l29.36289,0m-9.74007,8.22469l-9.87927,0m-9.74355,8.22145l29.36289,0" id="path10560" stroke-miterlimit="14.3" stroke="#010101" fill="none"/>'+
         '<path d="m14.63157,9.81646l0,-9.81646m0,47.2328l0,-9.81646" id="path10562" stroke-miterlimit="14.3" stroke-linecap="square" stroke="#010101" fill="none"/>'+
                 '</svg>';
    }
});