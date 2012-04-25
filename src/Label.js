
/**
  * @author Andreas Herz
 */
graphiti.Label= graphiti.Figure.extend({
    NAME : "graphiti.Label", // only for debugging

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     * @param {String} text the text to display
     */
    init : function(text)
    {
        this.text = text;
        this.bgColor = null;
        this.color = new graphiti.util.Color(0, 0, 0);
        this.fontSize = 12;
        this._super();
    },
    
    /** 
     * @method
     * Creates the shape object for a oval.
     * 
     * @template
     **/
    createShapeElement : function()
    {
      return this.canvas.paper.text(this.getAbsoluteX(), this.getAbsoluteY(), this.text);
    },

    /**
     * @method
     * Trigger the repaint of the element and transport all style properties to the visual representation.<br>
     * Called by the framework.
     * 
     * @template
     **/
    repaint: function(attributes)
    {
        if(this.shape===null){
            return;
        }

        if(typeof attributes === "undefined"){
            attributes = {};
        }
        
        attributes.text = this.text;
        attributes.x = this.x;
        attributes.y = this.y+(this.getHeight()/2);
        attributes["text-anchor"] = "start";
        attributes["font-size"] = this.fontSize;
        attributes.fill = "#" + this.color.hex();
  
        this._super(attributes);
    },
    

    /**
     * @mehod
     * Set the color of the line.
     * This method fires a <i>document dirty</i> event.
     * 
     * @param {graphiti.util.Color} color The new color of the line.
     **/
    setColor:function( color)
    {
      if(color instanceof graphiti.util.Color){
          this.color = color;
      }
      else if(typeof color === "string"){
          this.color = new graphiti.util.Color(color);
      }
      else{
          // set good default
          this.color = this.DEFAULT_COLOR;
      }
      this.repaint();
    },

    /**
     * @method
     * Return the current paint color.
     * 
     * @return {graphiti.util.Color} The paint color of the line.
     **/
    getColor:function()
    {
      return this.color;
    },
    
    /**
     * A Label is not resizeable. In this case this method returns always <b>false</b>.
     * @returns Returns always false in the case of a Label.
     * @type boolean
     **/
    isResizeable:function()
    {
      return false;
    },
        
    /**
     * Set the new font size in [pt].
     *
     * @param {int} size The new font size in <code>pt</code>
     **/
    setFontSize: function(/*:int*/ size)
    {
      this.fontSize = size;
      this.repaint();
    },
    
    /**
     * A Label did have "autosize". Do nothing at all.
     *
     **/
    setDimension:function(/*:int*/ w, /*:int*/ h)
    {
        // Dimension of a Label is autocalculated. "set" is not possible
    },
    
    /**
     * @returns the calculated width of the label
     * @type int
     **/
    getWidth : function()
    {
        if (this.shape === null) {
            return 0;
        }
        return this.shape.getBBox().width;
    },
    
    /**
     * @returns the calculated height of the label
     * @type int
     **/
    getHeight:function()
    {
        if (this.shape === null) {
            return 0;
        }
        return this.shape.getBBox().height;
    },
    
    /**
     * Returns the current text of the label.
     *
     * @returns the current display text of the label
     * @type String
     **/
    getText:function()
    {
      return this.text;
    },
    
    /**
     * @param {String} text The new text for the label.
     **/
    setText:function(/*:String*/ text )
    {
      this.text = text;
      this.repaint();
    }

});