
/**
 * @class graphiti.CompartmentFigure
 * Container class which can hold other figures inside.
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.Figure
 */
graphiti.CompartmentFigure = graphiti.Figure.extend({
    NAME : "graphiti.CompartmentFigure", // only for debugging

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     */
    init: function( ) {
        this._super();
    
      this.children = new graphiti.util.ArrayList();
      this.dropable = new graphiti.DropTarget(this.html);
      this.dropable.node = this;
    
      this.dropable.addEventListener("figureenter", function (oEvent)
      {
        oEvent.target.node.onFigureEnter(oEvent.relatedTarget.node);
      });
      this.dropable.addEventListener("figureleave", function (oEvent)
      {
        oEvent.target.node.onFigureLeave(oEvent.relatedTarget.node);
      });
      this.dropable.addEventListener("figuredrop", function (oEvent)
      {
        oEvent.target.node.onFigureDrop(oEvent.relatedTarget.node);
      });
    },
    
    /**
     * @method
     * Sub class can override this method to reset the highlight or do other stuff.<br>
     * <br>
     * Don't forget to call the super method via <code>Figure.prototype.onFigureEnter.call(this,figure)</code> if you inherit
     *
     * @param {graphiti.Figure} figure The current drag drop figure.
     * @template
     **/
    onFigureEnter : function( figure)
    {
    },
    
    /**
     * @method
     * Sub class can override this method to reset the highlight or do other stuff.<br>
     * <br>
     * Don't forget to call the super method via <code>Figure.prototype.onFigureLeave.call(this,figure)</code> if you inherit
     * 
     * @param {graphiti.Figure} figure The current drag drop figure.
     * @template
     **/
    onFigureLeave : function(figure)
    {
    },
    
    
    /**
     * @method
     * Sub class can override this method to reset the highlight or do other stuff.<br>
     * <br>
     *
     * @param {graphiti.Figure} figure The current drag drop figure.
     * @template
     **/
    onFigureDrop : function(/*:graphiti.Figure*/ figure)
    {
    },
    
    
    /**
     * @method
     * Returns the children of this container figure.
     *
     * @return {graphiti.util.ArrayList}
     **/
    getChildren:function()
    {
       return this.children;
    },
    
    /**
     * @method
     * Add the hands over element to this compartment figure. This is a kind of grouping elements
     * 
     * @param {graphiti.Figure} figure The new figure to add.
     **/
    addChild : function( figure)
    {
      // The child of a compartment is always above the compartment
      //
      figure.setZOrder(this.getZOrder()+1);
      figure.setParent(this);
    
      // Add the element to the child array
      //
      this.children.add(figure);
    },
    
    /**
     * @method
     * Remove the hands over figure from this compartment figure.
     * This method does NOT remove the figure from the cnavas. It only remove the figure in
     * child hirachie of this compartment.
     *
     * @param {graphiti.Figure} figure The figure to remove.
     **/
    removeChild : function( figure)
    {
      figure.setParent(null);
      this.children.remove(figure);
    },
    
    
    /**
     * @method
     * Set the z-order of the leemnt.
     *
     * @param {Number} index Set the new z-index of the element
     **/
    setZOrder:function( index)
    {
      /*:NAMESPACE*/Node.prototype.setZOrder.call(this,index);
    
      // The child of a compartment must be always above the compartment.
      //
      for(var i=0; i<this.children.getSize();i++)
      {
        this.children.get(i).setZOrder(index+1);
      }
    },
    
    /**
     * @method
     * Set the new position of the object
     *
     * @param {Number} xPos The new x coordinate of the figure
     * @param {Number} yPos The new y coordinate of the figure
     **/
    setPosition:function(/*:int*/ xPos , /*:int*/yPos )
    {
      var oldX = this.getX();
      var oldY = this.getY();
      /*:NAMESPACE*/Node.prototype.setPosition.call(this, xPos, yPos);
    
      // Adjust all children figures. The children has an absolute position to the upper left corner
      // of the paint area and not to the compartment. :-(
      // TODO:check another solution e.g. relative position of children
      //
      for(var i=0; i<this.children.getSize();i++)
      {
        var child = this.children.get(i);
        child.setPosition(child.getX()+this.getX()-oldX, child.getY()+this.getY()-oldY);
      }
    },
    
    /**
     * @private
     **/
    onDrag : function()
    {
      var oldX = this.getX();
      var oldY = this.getY();
      /*:NAMESPACE*/Node.prototype.onDrag.call(this);
    
      // Adjust all children figures. The children has an absolute position to the upper left corner
      // of the paint area and not to the compartment. :-(
      // TODO:check another solution e.g. relative position of children
      //
      for(var i=0; i<this.children.getSize();i++)
      {
         var child = this.children.get(i);
         child.setPosition(child.getX()+this.getX()-oldX, child.getY()+this.getY()-oldY);
      }
    }
    
});

