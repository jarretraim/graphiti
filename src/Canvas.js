/**
 * @class graphiti.Canvas
 * Interactive paint area of the graphiti library.
 * 
 * @inheritable
 * @author Andreas Herz
 * @version 2.1
 */
graphiti.Canvas = Class.extend(
{
    /**
     * @constructor
     * Create a new canvas with the given HTML dom references.
     * 
     * @param {String} pValue
     */
    init : function(canvasId)
    {
        this.canvasId = canvasId;
        this.html = document.getElementById(canvasId);
        this.paper = Raphael(canvasId, this.getWidth(), this.getHeight());
        this.zoomFactor = 1.0;
        this.enableSmoothFigureHandling=false;
        this.currentSelection = null;
        
        this.resizeHandle1 = new graphiti.ResizeHandle(this,1); // 1 = LEFT TOP
        this.resizeHandle2 = new graphiti.ResizeHandle(this,2); // 2 = CENTER_TOP
        this.resizeHandle3 = new graphiti.ResizeHandle(this,3); // 3 = RIGHT_TOP
        this.resizeHandle4 = new graphiti.ResizeHandle(this,4); // 4 = RIGHT_MIDDLE
        this.resizeHandle5 = new graphiti.ResizeHandle(this,5); // 5 = RIGHT_BOTTOM
        this.resizeHandle6 = new graphiti.ResizeHandle(this,6); // 6 = CENTER_BOTTOM
        this.resizeHandle7 = new graphiti.ResizeHandle(this,7); // 7 = LEFT_BOTTOM
        this.resizeHandle8 = new graphiti.ResizeHandle(this,8); // 8 = LEFT_MIDDLE

        this.resizeHandleHalfWidth = parseInt(this.resizeHandle2.getWidth()/2);
       
        this.verticalSnapToHelperLine = null; /*:@NAMESPACE@Line*/
        this.horizontalSnapToHelperLine = null; /*:@NAMESPACE@Line*/

        this.figures = new graphiti.util.ArrayList();
        this.lines = new graphiti.util.ArrayList();
        
        this.selectionListeners = new graphiti.util.ArrayList();

        this.commandStack = new graphiti.command.CommandStack();
    },
    
    /**
     * @method
     * Returns the command stack for the Canvas. Required for undo/redo  support.
     *
     * @return {graphiti.command.CommandStack}
     **/
    getCommandStack : function()
    {
      return this.commandStack;
    },

    /**
     * @method
     * Return the width of the canvas
     * 
     * @return {Number}
     **/
    getWidth : function()
    {
        return parseInt(this.html.style.width);
    },


    /**
     * @method
     * Return the height of the canvas.
     * 
     * @return {Number}
     **/
    getHeight:function() {
      return parseInt(this.html.style.height);
    },
 

    /**
     * Add a figure at the hands over x/y position.
     *
     * @param {graphiti.Figure} figure The figure to add.
     * @param {Number} x The x position.
     * @param {Number} y The y position.
     **/
    addFigure:function( figure , xPos,  yPos)
    {
      figure.setCanvas(this);

      var shape = figure.getShapeElement();
      if(figure instanceof graphiti.Line)
      {
        this.lines.add(figure);
      }
      else
      {
        this.figures.add(figure);
        figure.createDraggable();
        // Compartments must be stored in an additional structure
        //
        /* TODO
        if(figure instanceof graphiti.CompartmentFigure)
        {
          this.compartments.add(figure);
        }
        figure.draggable.addEventListener("drag", function (oEvent)
        {
          var figure = oThisWorkflow.getFigure(oEvent.target.element.id);
          if(figure == null)
            return;
          if(figure.isSelectable()==false)
            return;

          oThisWorkflow.moveResizeHandles(figure);
        });
    */    

      }
      
      figure.setPosition(xPos,yPos);

      figure.repaint();
      figure.fireMoveEvent();
      this.setDocumentDirty();
    },

    /**
     * @method
     * Returns the best comparment figure at the location [x,y].
     *
     * @param {Number} x The x position.
     * @param {Number} y The y position.
     * @param {graphiti.Figure} figureToIgnore The figure which should be ignored.
     **/
    getBestCompartmentFigure:function( x,  y, figureToIgnore)
    {
      var result = null;
      for(var i=0;i<this.figures.getSize();i++)
      {
        var figure = this.figures.get(i);
        if((figure instanceof graphiti.CompartmentFigure) && figure.isOver(x,y)==true && figure!=figureToIgnore)
        {
            if(result==null)
               result = figure;
            else if(result.getZOrder() < figure.getZOrder())
               result = figure;
        }
      }
      return result;
    },
    
    /**
     * @param {graphiti.Menu} menu The menu to show.
     * @param {int} x The x position.
     * @param {int} y The y position.
     * @private
     **/
    showMenu:function(menu , xPos , yPos)
    {
     if(this.menu!=null)
     {
       this.html.removeChild(this.menu.getHTMLElement());
       this.menu.setWorkflow(null);
     }

     this.menu = menu;
     if(this.menu!=null)
     {
       this.menu.setCanvas(this);
       this.menu.setPosition(xPos,yPos);

       this.html.appendChild(this.menu.getHTMLElement());
       this.menu.paint();
      }
    },

    /**
     * @method
     * Returns the command stack for the Canvas. Required for undo/redo  support.
     *
     * @type {graphiti.command.CommandStack}
     **/
    getCommandStack:function()
    {
      return this.commandStack;
    },

    /**
     * @method
     * Returns the current selected figure in the Canvas.
     *
     **/
    getCurrentSelection:function()
    {
      return this.currentSelection;
    },


    /**
     * Set the current selected figure in the workflow Canvas.
     *
     * @param {graphiti.Figure} figure The new selection.
     **/
    setCurrentSelection:function( figure )
    {
      if(figure==null)
      {
        this.hideResizeHandles();
      //  this.hideLineResizeHandles();
      }

      this.currentSelection = figure;

      // inform all selection listeners about the new selection.
      //
      for(var i=0;i < this.selectionListeners.getSize();i++)
      {
        var w = this.selectionListeners.get(i);
        if(w.onSelectionChanged)
          w.onSelectionChanged(this.currentSelection);
      }
    },
    
    /**
     * @method
     * Mark the current document as dirty. Any unsaved changes are present.
     * 
     */
    setDocumentDirty:function()  {
     
    },

    /**
     * @private
     * @type @NAMESPACE@Line
     **/
    getBestLine:function(/*:int*/ x, /*:int*/ y, /*:@NAMESPACE@Line*/ lineToIgnore)
    {
      var result = null;
      var count = this.lines.getSize();
      for(var i=0;i< count;i++)
      {
        var line = this.lines.get(i);
        if(line.containsPoint(x,y)==true && line!=lineToIgnore)
        {
            if(result==null)
               result = line;
         //   else if(result.getZOrder() < line.getZOrder())
         //      result = line;
        }
      }
      return result;
    },

    /**
     * @method
     * @private
     **/
    showResizeHandles:function(figure)
    {
        /*
      if( this.getCurrentSelection()!==figure)
      {
        this.hideLineResizeHandles();
        this.hideResizeHandles();
      }
      */
      // We must reset the alpha blending of the resizeHandles if the last selected object != figure
      // Reason: We would fadeIn the ResizeHandles at the new selected object but the fast toggle from oldSeleciton => newSelection
      //         doesn't reset the alpha to 0.0. So, we do it manually.
      //
      if(this.getEnableSmoothFigureHandling()==true && this.getCurrentSelection()!==figure)
      {
         this.resizeHandle1.setAlpha(0.01);
         this.resizeHandle2.setAlpha(0.01);
         this.resizeHandle3.setAlpha(0.01);
         this.resizeHandle4.setAlpha(0.01);
         this.resizeHandle5.setAlpha(0.01);
         this.resizeHandle6.setAlpha(0.01);
         this.resizeHandle7.setAlpha(0.01);
         this.resizeHandle8.setAlpha(0.01);
      }

      var resizeWidth = this.resizeHandle1.getWidth();
      var resizeHeight= this.resizeHandle1.getHeight();
      var objHeight   = figure.getHeight();
      var objWidth    = figure.getWidth();
      var xPos = figure.getX();
      var yPos = figure.getY();
      this.resizeHandle1.show(this,xPos-resizeWidth,yPos-resizeHeight);
      this.resizeHandle3.show(this,xPos+objWidth,yPos-resizeHeight);
      this.resizeHandle5.show(this,xPos+objWidth,yPos+objHeight);
      this.resizeHandle7.show(this,xPos-resizeWidth,yPos+objHeight);

      this.resizeHandle1.setDraggable(figure.isResizeable());
      this.resizeHandle3.setDraggable(figure.isResizeable());
      this.resizeHandle5.setDraggable(figure.isResizeable());
      this.resizeHandle7.setDraggable(figure.isResizeable());

      if(figure.isResizeable())
      {
        var green = new graphiti.util.Color(0,255,0);
        this.resizeHandle1.setBackgroundColor(green);
        this.resizeHandle3.setBackgroundColor(green);
        this.resizeHandle5.setBackgroundColor(green);
        this.resizeHandle7.setBackgroundColor(green);
      }
      else
      {
        this.resizeHandle1.setBackgroundColor(null);
        this.resizeHandle3.setBackgroundColor(null);
        this.resizeHandle5.setBackgroundColor(null);
        this.resizeHandle7.setBackgroundColor(null);
      }

      if(figure.isStrechable() && figure.isResizeable())
      {
        this.resizeHandle2.setDraggable(figure.isResizeable());
        this.resizeHandle4.setDraggable(figure.isResizeable());
        this.resizeHandle6.setDraggable(figure.isResizeable());
        this.resizeHandle8.setDraggable(figure.isResizeable());
        this.resizeHandle2.show(this,xPos+(objWidth/2)-this.resizeHandleHalfWidth,yPos-resizeHeight);
        this.resizeHandle4.show(this,xPos+objWidth,yPos+(objHeight/2)-(resizeHeight/2));
        this.resizeHandle6.show(this,xPos+(objWidth/2)-this.resizeHandleHalfWidth,yPos+objHeight);
        this.resizeHandle8.show(this,xPos-resizeWidth,yPos+(objHeight/2)-(resizeHeight/2));
      }
    },

    /**
     * @method
     * @private
     **/
    hideResizeHandles:function()
    {
       this.resizeHandle1.hide();
       this.resizeHandle2.hide();
       this.resizeHandle3.hide();
       this.resizeHandle4.hide();
       this.resizeHandle5.hide();
       this.resizeHandle6.hide();
       this.resizeHandle7.hide();
       this.resizeHandle8.hide();
    },

    /**
     * @method
     * @private
     **/
    moveResizeHandles:function(/*:@NAMESPACE@Figure*/ figure)
    {
      var resizeWidth = this.resizeHandle1.getWidth();
      var resizeHeight= this.resizeHandle1.getHeight();
      var objHeight   = figure.getHeight();
      var objWidth    = figure.getWidth();
      var xPos = figure.getX();
      var yPos = figure.getY();
      this.resizeHandle1.setPosition(xPos-resizeWidth,yPos-resizeHeight);
      this.resizeHandle3.setPosition(xPos+objWidth,yPos-resizeHeight);
      this.resizeHandle5.setPosition(xPos+objWidth,yPos+objHeight);
      this.resizeHandle7.setPosition(xPos-resizeWidth,yPos+objHeight);
      if(figure.isStrechable())
      {
        this.resizeHandle2.setPosition(xPos+(objWidth/2)-this.resizeHandleHalfWidth,yPos-resizeHeight);
        this.resizeHandle4.setPosition(xPos+objWidth,yPos+(objHeight/2)-(resizeHeight/2));
        this.resizeHandle6.setPosition(xPos+(objWidth/2)-this.resizeHandleHalfWidth,yPos+objHeight);
        this.resizeHandle8.setPosition(xPos-resizeWidth,yPos+(objHeight/2)-(resizeHeight/2));
      }
    },


    /**
     * @private
     **/
    hideSnapToHelperLines:function()
    {
      this.hideSnapToHelperLineHorizontal();
      this.hideSnapToHelperLineVertical();
    },

    /**
     * @private
     **/
    hideSnapToHelperLineHorizontal:function()
    {
       if(this.horizontalSnapToHelperLine!=null)
       {
          this.removeFigure(this.horizontalSnapToHelperLine);
          this.horizontalSnapToHelperLine = null;
       }
    },

    /**
     * @private
     **/
    hideSnapToHelperLineVertical:function()
    {
       if(this.verticalSnapToHelperLine!=null)
       {
          this.removeFigure(this.verticalSnapToHelperLine);
          this.verticalSnapToHelperLine = null;
       }
    },

    /**
     * @method
     * Returns the flag if the Canvas has enabled the smooth figure handling during add, remove, selection,
     * drag&drop.
     *
     * @type boolean
     **/
    getEnableSmoothFigureHandling:function()
    {
        return this.enableSmoothFigureHandling;
    },

    /**
     * @method
     * Set the flag for the smooth figure handling during add, remove, selection,
     * drag&drop.
     *
     * @param {boolean} flag The smooth figure handling flag.
     **/
    setEnableSmoothFigureHandling:function(/*:boolean*/ flag)
    {
        this.enableSmoothFigureHandling=flag;
    },

    /**
     * @method
     * Called when a user clicks on the element
     * @template
     */
    onClick: function(){
        
    }
});

