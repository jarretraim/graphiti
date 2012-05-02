
/**
 * @class graphiti.shape.arrow.CalligrapherArrowDownLeft
 * Hand drawn arrow which points down left
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new graphiti.shape.arrow.CalligrapherArrowDownLeft();
 *     figure.setColor("#3d3d3d");
 *     
 *     canvas.addFigure(figure,10,10);
 *     
 *     
 * @extends graphiti.SVGFigure
 */
graphiti.shape.arrow.CalligrapherArrowDownLeft = graphiti.SVGFigure.extend({
   
    /**
     * @constructor
     * Create a new instance
     */
    init:function(){
        this._super();
    },
    

    getSVG: function(){
         return '<svg width="180" height="300" xmlns="http://www.w3.org/2000/svg" version="1.1">'+
                '     <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3084" d="m 159.63578,17.846597 c 0.43137,9.44641 -0.0636,18.88035 -0.8284,28.30165 c -1.73211,18.38336 -4.05381,36.71698 -6.08253,55.075313 c -1.61738,13.7075 -3.03402,27.43467 -3.97611,41.19113 c -1.09101,11.16584 -1.31019,22.36559 -1.28541,33.56466 c -0.1328,4.82188 0.3218,9.6468 0.14332,14.46812 c -0.0888,2.39977 -0.28315,3.73625 -0.55012,6.12095 c -0.85848,4.73147 -2.27416,9.40019 -4.7769,13.68272 c -1.47003,2.51544 -3.78493,5.6647 -5.47739,8.05048 c -5.02888,6.66256 -11.08555,12.65652 -18.10552,17.75963 c -4.23302,3.07716 -7.74942,5.12065 -12.22081,7.86298 c -13.253319,6.72606 -25.889792,15.11686 -40.84124,18.60576 c -3.016829,0.7039 -4.431417,0.8157 -7.450859,1.2076 c -6.983246,0.5774 -14.009174,0.3375 -21.010676,0.2509 c -3.278795,-0.033 -6.55749,0.01 -9.835897,0.045 c 0,0 20.838833,-13.2364 20.838833,-13.2364 l 0,0 c 3.147056,0.093 6.294483,0.1852 9.443646,0.2007 c 6.966697,0.011 13.971433,0.1301 20.897176,-0.6344 c 3.732439,-0.5577 7.321215,-1.2431 10.881203,-2.4145 c 1.517208,-0.4992 5.830867,-2.43339 4.487902,-1.6386 c -6.098183,3.6088 -25.104875,12.8748 -9.52514,5.223 c 4.40875,-2.5927 8.262057,-4.7459 12.425175,-7.65986 c 6.839117,-4.78709 12.633657,-10.50427 17.500607,-16.86761 c 2.53518,-3.56692 5.24684,-7.12748 7.07617,-11.03446 c 1.42357,-3.0404 2.21532,-6.28727 2.91146,-9.50152 c 0.91919,-6.88822 1.03991,-13.81392 1.25118,-20.74151 c 0.47683,-11.27871 0.96259,-22.55877 1.61689,-33.83062 c 1.21127,-14.03392 3.64191,-27.94339 5.46543,-41.92167 c 2.26899,-18.186603 4.6835,-36.384373 5.4487,-54.679643 c 0.0788,-2.46092 0.23808,-4.92087 0.23618,-7.38276 c -0.005,-6.45916 -0.62194,-13.00218 -2.13821,-19.32664 c 0,0 23.48134,-10.73998 23.48134,-10.73998 z" inkscape:connector-curvature="0" />'+
                '     <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3086" d="m 41.271518,252.40239 c 2.465518,-0.7264 4.879503,-1.7726 7.145328,-2.9859 c 0.955597,-0.5117 3.736822,-2.1986 2.791991,-1.6673 c -5.218817,2.9348 -10.409826,5.9187 -15.61474,8.878 c 5.366557,-3.4898 10.227818,-7.6685 14.119927,-12.75576 c 3.507157,-5.09382 4.097613,-11.17122 4.301158,-17.17644 c 0.02635,-3.95844 -0.31227,-7.90612 -0.635377,-11.84752 c 0,0 19.920693,-10.3059 19.920693,-10.3059 l 0,0 c 0.171761,4.05015 0.409899,8.09777 0.50079,12.15101 c -0.185739,6.23619 -0.347804,12.66862 -3.492579,18.24747 c -0.503375,0.75197 -0.961922,1.53596 -1.510126,2.25591 c -3.478528,4.56826 -8.226837,8.04586 -12.757403,11.47443 c -7.345206,4.3297 -14.671333,8.692 -22.035619,12.9891 c -3.551305,2.0723 -7.368692,3.8726 -11.394645,4.7773 c 0,0 18.660602,-14.0344 18.660602,-14.0344 z" inkscape:connector-curvature="0" />'+
                '     <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3088" d="m 37.815923,255.49919 c 3.41111,0.1581 6.814569,0.2213 10.182693,0.8184 c 6.92998,2.6928 13.533527,6.2357 20.043462,9.8162 c 3.912139,2.1362 7.91195,4.4644 10.690321,8.0298 c 1.039962,1.2802 1.510411,2.7604 1.893523,4.3313 c 0,0 -20.370847,10.9259 -20.370847,10.9259 l 0,0 c -0.225419,-1.2711 -0.55067,-2.4558 -1.329618,-3.5184 c -2.332229,-3.3633 -5.869056,-5.6279 -9.247191,-7.8233 c -6.335066,-3.7106 -12.98611,-7.1834 -20.232784,-8.6836 c -3.497247,-0.3814 -7.011372,-0.4307 -10.521829,-0.1703 c 0,0 18.89227,-13.726 18.89227,-13.726 z" inkscape:connector-curvature="0" />'+
                '</svg>';
    },
    
    /**
     * @method
     * propagate all attributes like color, stroke,... to the shape element
     **/
    repaint : function(attributes)
    {
        if(this.shape===null){
            return;
        }

        
        if(this.svgNodes!==null){
            this.svgNodes.attr({fill: "#"+this.color.hex()});
        }
        
        this._super(attributes);
    }

});