
TimerFigure = graphiti.SetFigure.extend({

    init : function()
    {
        this._super();

        this.timerId = -1;
        this.degree = 0;
    },

    /**
     * @method
     * 
     * The setCanvas method is a good place to start/stop the timer.<br>
     * Don't forget to stop the counter if the framework remove the figure from the
     * canvas (setCanvas(null)).
     * 
     * @param {graphiti.Canvas} canvas
     */
    setCanvas: function(canvas){
        this._super(canvas);
        if(canvas===null){
            window.clearInterval(this.timerId);
            this.timerId=-1;
        }
        else{
            // Consult the jQuery $.proxy documentation for more information
            // about binding a function to a dedicated object scope (this).
            //
            this.timerId = window.setInterval($.proxy(this.animate,this), 50);
        }
    },
    
    /**
     * @method
     * Create the additional elements for the figure
     * 
     */
    createSet: function(){
        var set = this.canvas.paper.set();

        this.rect = this.canvas.paper.rect(0,0,150, 100);
        this.rect.attr({fill:"#3d3d6d"});
        this.line = this.canvas.paper.path("M0 0 l0 0");
        
        set.push(this.line);
        set.push(this.rect);
        
        return set;
    },


    /**
     * @method
     * Private callback method for the internal timer.<br>
     * 
     * Calculate the new angle of the line and update the SVG path.
     * 
     * @private
     */
    animate:function(){
        this.degree = (this.degree-3) % 360;
        
        // Keep in mind: This is far from good programming
        //   1. calculate always sin/cos
        //   2. no lookup table for the stroke (cache degree => path string)
        //
        // I didn't this for "readability" of the code and show only the necessary
        // parts: timer integration into graphiti figures
        //
        var x = (Math.sin((Math.PI*2/360)*this.degree)*this.getWidth()/2);
        var y = (Math.cos((Math.PI*2/360)*this.degree)*this.getHeight()/2);

        // it is possible to cache the "path" with a simple map: degree => path string
        var path = "M"+(this.getWidth()/2)+" "+(this.getHeight()/2)+" l"+x+" "+y;
        this.line.attr({stroke:"#f03d3d", "stroke-width":3,"stroke-dasharray":".", path:path});
    }

});
