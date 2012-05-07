
TimerFigure = graphiti.shape.basic.Label.extend({

    init : function()
    {
        this._super();
        this.setDimension(100,100);
        this.timerId = -1;
        this.counter = 0;
        
        this.setText("Counter: 0");
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
            this.timerId = window.setInterval($.proxy(this.animate,this), 1000);
        }
    },
    
    /**
     * @method
     * private callback method for the internal timer.
     * 
     * @private
     */
    animate:function(){
        this.setText("Counter: "+(++this.counter));
    }

});
