
/**
 * @class graphiti.Canvas
 * Interactive paint area of the graphiti library.
 * 
 * @inheritable
 * @author Andreas Herz
 */
graphiti.Canvas = Class.extend(
{
    NAME : "graphiti.Canvas", // only for debugging

    COLOR_GREEN : new  graphiti.util.Color(0,255,0),

    /**
     * @constructor
     * Create a new canvas with the given HTML dom references.
     * 
     * @param {String} canvasId the id of the DOM element to use a parent container
     */
    init : function(canvasId)
    {

        this.isIOS = (
                //Detect iPhone
                (navigator.platform.indexOf("iPhone") != -1) ||
                //Detect iPod
                (navigator.platform.indexOf("iPod") != -1)||
                //Detect iPad
                (navigator.platform.indexOf("iPad") != -1)
            );

        this.scrollArea = document.body;
        this.canvasId = canvasId;
        this.html = $("#"+canvasId);
        this.paper = Raphael(canvasId, this.getWidth(), this.getHeight());
        this.zoomFactor = 1.0;
        this.enableSmoothFigureHandling=false;
        this.currentSelection = null;
        
        this.menu = null;
        
        this.snapToGridHelper = null;
        this.snapToGeometryHelper = null;
        
        // the line between the dragging port and its origin position
        this.connectionLine    = new graphiti.Line();
      
        this.resizeHandle1 = new graphiti.ResizeHandle(this,1); // 1 = LEFT TOP
        this.resizeHandle2 = new graphiti.ResizeHandle(this,2); // 2 = CENTER_TOP
        this.resizeHandle3 = new graphiti.ResizeHandle(this,3); // 3 = RIGHT_TOP
        this.resizeHandle4 = new graphiti.ResizeHandle(this,4); // 4 = RIGHT_MIDDLE
        this.resizeHandle5 = new graphiti.ResizeHandle(this,5); // 5 = RIGHT_BOTTOM
        this.resizeHandle6 = new graphiti.ResizeHandle(this,6); // 6 = CENTER_BOTTOM
        this.resizeHandle7 = new graphiti.ResizeHandle(this,7); // 7 = LEFT_BOTTOM
        this.resizeHandle8 = new graphiti.ResizeHandle(this,8); // 8 = LEFT_MIDDLE

        this.resizeHandleStart = new graphiti.LineStartResizeHandle(this);
        this.resizeHandleEnd   = new graphiti.LineEndResizeHandle(this);
        
        this.resizeHandles = new graphiti.util.ArrayList();
        this.resizeHandles.add(this.resizeHandle1);
        this.resizeHandles.add(this.resizeHandle2);
        this.resizeHandles.add(this.resizeHandle3);
        this.resizeHandles.add(this.resizeHandle4);
        this.resizeHandles.add(this.resizeHandle5);
        this.resizeHandles.add(this.resizeHandle6);
        this.resizeHandles.add(this.resizeHandle7);
        this.resizeHandles.add(this.resizeHandle8);
        this.resizeHandles.add(this.resizeHandleStart);
        this.resizeHandles.add(this.resizeHandleEnd);

        this.resizeHandleHalfWidth = this.resizeHandle2.getWidth()/2;
       
        // @type 
        this.verticalSnapToHelperLine = null; /*graphiti.Line*/
        this.horizontalSnapToHelperLine = null; /*:graphiti.Line*/

        this.figures = new graphiti.util.ArrayList();
        this.lines = new graphiti.util.ArrayList();
        this.commonPorts = new graphiti.util.ArrayList();
        this.dropTargets = new graphiti.util.ArrayList();
       
        this.selectionListeners = new graphiti.util.ArrayList();

        this.commandStack = new graphiti.command.CommandStack();

        this.dragDropHandlingByCanvas = true;
        
        this.mouseDown  = false;
        this.mouseDownX = 0;
        this.mouseDownY = 0;
        this.mouseDraggingElement = null;
        if (this.dragDropHandlingByCanvas === true) {
            this.html.bind("mouseup touchend", $.proxy(function(event)
            {
                event = this._getEvent(event);
                if (this.mouseDown === false)
                    return;

                this.mouseDown = false;
                this.onMouseUp();
            }, this));

            this.html.bind("mousemove touchmove", $.proxy(function(event)
            {
                event = this._getEvent(event);
                if (this.mouseDown === false)
                    return;

                var diffX = event.clientX - this.mouseDownX;
                var diffY = event.clientY - this.mouseDownY;
                this.onMouseMove(diffX, diffY);
            }, this));
        }
        this.html.bind("mousedown touchstart", $.proxy(function(event)
        {
            event = this._getEvent(event);

            this.mouseDownX = event.clientX;
            this.mouseDownY = event.clientY;
            var scrollLeft = this.getScrollLeft();
            var scrollTop = this.getScrollTop();
            var xOffset = this.getAbsoluteX();
            var yOffset = this.getAbsoluteY();
            this.mouseDown =true;
            this.onMouseDown(this.mouseDownX + scrollLeft - xOffset, this.mouseDownY + scrollTop - yOffset);
        }, this));
        
    },
    
    
    /**
     * @method
     * Indicate whenever the device can handle touch events.
     * 
     * @return {Boolean}
     */
    isTouchDevice:function(){
        return this.isIOS;
    },

    /**
     * @private
     * @param event
     * @returns
     */
    _getEvent:function(event){
      if(event.originalEvent.touches && event.originalEvent.touches.length) {
           return event.originalEvent.touches[0];
      } else if(event.originalEvent.changedTouches && event.originalEvent.changedTouches.length) {
           return event.originalEvent.changedTouches[0];
      }
      return event;
    },


    /**
     * @returns The Y coordinate in relation the Canvas.
     * @type int
     **/
    getScrollLeft:function()
    {
      return this.scrollArea.scrollLeft;
    },

    /**
     * @returns The X coordinate in relation to the canvas
     * @type int
     **/
    getScrollTop:function()
    {
      return this.scrollArea.scrollTop;
    },


    /**
     * @returns The Y coordinate in relation to the Canvas.
     * @type int
     **/
    getAbsoluteY:function()
    {
      return this.html.offset().top;
    },

    /**
     * @method
     * The X coordinate in relation to the canvas
     *
     * @return {Number}
     **/
    getAbsoluteX:function()
    {
        return this.html.offset().left;
    },


    /**
     * @method
     * Return the width of the canvas
     * 
     * @return {Number}
     **/
    getWidth : function()
    {
        return this.html.width();
    },


    /**
     * @method
     * Return the height of the canvas.
     * 
     * @return {Number}
     **/
    getHeight:function() {
      return this.html.height();
    },
 

    /**
     * Add a figure at the hands over x/y position.
     *
     * @param {graphiti.Figure} figure The figure to add.
     * @param {Number} [x] The x position.
     * @param {Number} [y] The y position.
     **/
    addFigure:function( figure , x,  y)
    {
        if(figure.getCanvas()===this){
            return;
        }
        
      figure.setCanvas(this);

      // important inital 
      figure.getShapeElement();
      
      if(figure instanceof graphiti.Line)
      {
        this.lines.add(figure);
      }
      else
      {
        this.figures.add(figure);
        if(this.dragDropHandlingByCanvas===false){
            figure.createDraggable();
        }

        // Compartments must be stored in an additional structure
        //
        if(figure instanceof graphiti.CompartmentFigure)
        {
          this.compartments.add(figure);
        }
        
        if(typeof y !== "undefined"){
        	figure.setPosition(x,y);
        }
      }
      

      figure.fireMoveEvent();
      this.setDocumentDirty();
    },


    /**
     * @method
     * Remove a figure from the Canvas.
     *
     * @param {graphiti.Figure} figure The figure to remove
     *
     **/
    removeFigure:function(figure)
    {
        this.figures.remove(figure);
        
        if(figure instanceof graphiti.Line){
            this.lines.remove(figure);
         }

        figure.setCanvas(null);

        if(figure instanceof graphiti.CompartmentFigure){
           this.compartments.remove(figure);
        }

        if(figure instanceof graphiti.Connection){
           figure.disconnect();
        }

        if(this.currentSelection === figure){
          this.setCurrentSelection(null);
        }

        this.setDocumentDirty();
    },
    
    /**
     * @method
     * Returns all lines/connections in this workflow/canvas.<br>
     *
     *
     * @return {graphiti.util.ArrayList}
     **/
    getLines:function()
    {
      return this.lines;
    },


    /**
     * @method
     * Returns the internal figures container.<br>
     *
     *
     * @private
     **/
    getFigures:function()
    {
      return this.figures;
    },


    /**
     * Enable/disable the snap to grid behavior of the canvas. All figures will snap to the grid during the
     * the drag and drop operation.
     * 
     * @param {boolean} flag true if you want snap to the grid.
     **/
    setSnapToGrid:function( flag)
    {
      if(flag===true){
       this.snapToGridHelper = new graphiti.SnapToGrid(this);
      }
      else{
       this.snapToGridHelper = null;
      }
    },


    /**
     * 
     * @type boolean <b>true</b> if snap to the grid enabled.
     **/
    getSnapToGrid:function()
    {
      return this.snapToGridHelper !== null;
    },

    /**
     * Used to perform snapping to existing elements. Snapping is based on the existing children of a container. 
     * When snapping a rectangle, the edges of the rectangle will snap to edges of other rectangles generated from 
     * the children of the given container/canvas. Similarly, the centers and middles of rectangles will snap to each other.
     *
     * @param {boolean} flag true if you want snap to the geometry.
     */
    setSnapToGeometry:function( flag)
    {
      if(flag===true){
       this.snapToGeometryHelper = new graphiti.SnapToGeometry(this);
      }
      else{
       this.snapToGeometryHelper = null;
      }
    },


    /**
     * 
     * @type boolean <b>true</b> if snap to the grid enabled.
     **/
    getSnapToGeometry:function()
    {
      return this.snapToGeometryHelper !== null;
    },


    /** 
     * @method
     *  Adjust the x to the next grid line.
     *
     * @param  {graphiti.Figure} figure The related figure
     * @param  {graphiti.geo.Point} pos The position to adjust
     * @return {graphiti.geo.Point} the adjusted position
     **/
    snapToHelper:function(figure,  pos)
    {
       var snapDirections=0;
       var snapPoint = null;
       var result =null;
       if(this.snapToGeometryHelper!==null)
       {
          // The user drag&drop a ResizeHandle
          //
          if(figure instanceof graphiti.ResizeHandle)
          {
             snapPoint = figure.getSnapToGridAnchor();
             pos.x+= snapPoint.x;
             pos.y+= snapPoint.y;
             var result1 = new graphiti.geo.Point(pos.x,pos.y);
             var result2 = new graphiti.geo.Point(pos.x,pos.y);
             if(figure.supportsSnapToHelper())
             {
                snapDirections = figure.getSnapToDirection();
                var direction1 = this.snapToGeometryHelper.snapPoint(graphiti.SnapToHelper.EAST_WEST, pos,result1);
                var direction2 = this.snapToGeometryHelper.snapPoint(graphiti.SnapToHelper.NORTH_SOUTH, pos,result2);
                // Show a vertical line if the snapper has modified the inputPoint
                //
                if((snapDirections & graphiti.SnapToHelper.EAST_WEST) && !(direction1 & graphiti.SnapToHelper.EAST_WEST)){
                   this.showSnapToHelperLineVertical(result1.x);
                }
                else{
                   this.hideSnapToHelperLineVertical();
                }

                // Show a horizontal line if the snapper has modified the inputPoint
                //
                if((snapDirections & graphiti.SnapToHelper.NORTH_SOUTH) && !(direction2 & graphiti.SnapToHelper.NORTH_SOUTH)){
                   this.showSnapToHelperLineHorizontal(result2.y);
                }
                else{
                   this.hideSnapToHelperLineHorizontal();
                }

             }
             result1.x-= snapPoint.x;
             result2.y-= snapPoint.y;
             return new graphiti.geo.Point(result1.x,result2.y);
          }
          // The user drag&drop a normal figure
          else
          {
             var inputBounds = new graphiti.geo.Rectangle(pos.x,pos.y, figure.getWidth(), figure.getHeight());
             result = new graphiti.geo.Rectangle(pos.x,pos.y, figure.getWidth(), figure.getHeight());

             snapDirections = graphiti.SnapToHelper.NSEW;
             var direction = this.snapToGeometryHelper.snapRectangle( inputBounds, result);

             // Show a vertical line if the snapper has modified the inputPoint
             //
             if((snapDirections & graphiti.SnapToHelper.WEST) && !(direction & graphiti.SnapToHelper.WEST)){
                this.showSnapToHelperLineVertical(result.x);
             }
             else if((snapDirections & graphiti.SnapToHelper.EAST) && !(direction & graphiti.SnapToHelper.EAST)){
                this.showSnapToHelperLineVertical(result.getX()+result.getWidth());
             }
             else{
                this.hideSnapToHelperLineVertical();
             }

             // Show a horizontal line if the snapper has modified the inputPoint
             //
             if((snapDirections & graphiti.SnapToHelper.NORTH) && !(direction & graphiti.SnapToHelper.NORTH)){
                this.showSnapToHelperLineHorizontal(result.y);
             }
             else if((snapDirections & graphiti.SnapToHelper.SOUTH) && !(direction & graphiti.SnapToHelper.SOUTH)){
                this.showSnapToHelperLineHorizontal(result.getY()+result.getHeight());
             }
             else{
                this.hideSnapToHelperLineHorizontal();
             }

             return result.getTopLeft();
          }
       }
       else if(this.snapToGridHelper!==null)
       {
          snapPoint = figure.getSnapToGridAnchor();
          pos.x= pos.x+snapPoint.x;
          pos.y= pos.y+snapPoint.y;
          
          result = new graphiti.geo.Point(pos.x,pos.y);
          this.snapToGridHelper.snapPoint(0,pos,result);
          result.x= result.x-snapPoint.x;
          result.y= result.y-snapPoint.y;
          return result;
       }

       return pos;
    },


    /**
     * @private
     **/
    showConnectionLine:function(/*:int*/ x1  ,/*:int*/ y1 ,/*:int*/ x2,/*:int*/ y2 )
    {
      this.connectionLine.setStartPoint(x1,y1);
      this.connectionLine.setEndPoint(x2,y2);
      
      this.connectionLine.setCanvas(this);
      this.connectionLine.getShapeElement();
    },

    /**
     * @private
     **/
    hideConnectionLine:function()
    {
       this.connectionLine.setCanvas(null);
    },

    /**
     * @method
     * @param {@NAMESPACE@Port} port The new port which has been added to the Canvas.
     * @private
     **/
    registerPort:function(port )
    {
      // All elements have the same drop targets.
      //
      port.targets= this.dropTargets;
      if(this.dragDropHandlingByCanvas===false){
          port.createDraggable();
      }
      
      this.commonPorts.add(port);
      this.dropTargets.add(port);
    },

    /**
     * @method
     * @param {graphiti.Port} p The port to remove from the Canvas.
     * @private
     **/
    unregisterPort:function(port )
    {
      port.targets=null;

      this.commonPorts.remove(port);
      this.dropTargets.remove(port);
    },

    
    /**
     * @param {graphiti.Menu} menu The menu to show.
     * @param {Number} x The x position.
     * @param {Number} y The y position.
     * @private
     **/
    showMenu:function(menu , x , y)
    {
     if(this.menu!==null)
     {
       this.html.removeChild(this.menu.getHTMLElement());
       this.menu.setWorkflow(null);
     }

     this.menu = menu;
     if(this.menu!==null)
     {
       this.menu.setCanvas(this);
       this.menu.setPosition(x,y);

       this.html.appendChild(this.menu.getHTMLElement());
       this.menu.paint();
      }
    },

    /**
     * @method
     * Returns the command stack for the Canvas. Required for undo/redo  support.
     *
     * @return {graphiti.command.CommandStack}
     **/
    getCommandStack:function()
    {
      return this.commandStack;
    },

    /**
     * @method
     * Returns the current selected figure in the Canvas.
     *
     * @return {graphiti.Figure}
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
      if(figure===null)
      {
        this.hideResizeHandles();
        this.hideLineResizeHandles();
      }

      
      if(figure instanceof graphiti.Line)
      {
          this.showLineResizeHandles(figure);
      }
      else if(figure instanceof graphiti.Figure)
      {
          this.showResizeHandles(figure);
      }
      
      this.currentSelection = figure;

      // inform all selection listeners about the new selection.
      //
      for(var i=0;i < this.selectionListeners.getSize();i++)
      {
        var w = this.selectionListeners.get(i);
        if(typeof w.onSelectionChanged !== "undefined"){
          w.onSelectionChanged(this.currentSelection);
        }
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
     * @method
     * Returns the best comparment figure at the location [x,y].
     *
     * @param {Number} x The x position.
     * @param {Number} y The y position.
     * @param {graphiti.Figure} figureToIgnore The figure which should be ignored.
     **/
    getBestFigure : function(x, y, figureToIgnore)
    {
        var result = null;
        var testFigure = null;
        

        // ResizeHandles 
        for ( var i = 0, len = this.resizeHandles.getSize(); i < len; i++)
        {
            testFigure = this.resizeHandles.get(i);
            if (testFigure.isVisible()===true && testFigure.hitTest(x, y) === true && testFigure !== figureToIgnore) { 
                return testFigure; 
            }
        }

        // Checking ports
        //
        for ( var i = 0, len = this.commonPorts.getSize(); i < len; i++)
        {
            testFigure = this.commonPorts.get(i);
            if (testFigure.hitTest(x, y) === true && testFigure !== figureToIgnore) { 
                return testFigure; 
            }
        }

        // 2.) A line is the next option in the priority queue for a "Best" figure
        //
        result = this.getBestLine(x,y,figureToIgnore);
        if(result !==null)
            return result;
        
        // 3.) Check now the common objects
        //
        for ( var i = 0; i < this.figures.getSize(); i++)
        {
            var figure = this.figures.get(i);
            if (figure.hitTest(x, y) === true && figure !== figureToIgnore)
            {
                if (result === null)
                {
                    result = figure;
                }
                else if (result.getZOrder() < figure.getZOrder())
                {
                    result = figure;
                }
            }
        }
        return result;
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
        if((figure instanceof graphiti.CompartmentFigure) && figure.hitTest(x,y)===true && figure!==figureToIgnore)
        {
            if(result===null){
               result = figure;
            }
            else if(result.getZOrder() < figure.getZOrder()){
               result = figure;
            }
        }
      }
      return result;
    },

    /**
     * @method
     * Return the line which match the handsover coordinate
     *
     * @param {Number} x the x-coordinate for the hit test
     * @param {Number} y the x-coordinate for the hit test
     * @param {graphiti.Line} lineToIgnore a possible line which should be ignored for the hit test
     *
     * @private
     * @return {graphiti.Line}
     **/
    getBestLine:function( x,  y,  lineToIgnore)
    {
      var result = null;
      var count = this.lines.getSize();

      for(var i=0;i< count;i++)
      {
        var line = this.lines.get(i);
        if(line.hitTest(x,y)===true && line!==lineToIgnore)
        {
            if(result===null){
               result = line;
            }
         //   else if(result.getZOrder() < line.getZOrder())
         //      result = line;
        }
      }
      return result;
    },

   

    /**
     * @param {graphiti.Line} line The line for the resize handles.
     * @private
     **/
    showLineResizeHandles:function( line )
    {
      var resizeWidthHalf = this.resizeHandleStart.getWidth()/2;
      var resizeHeightHalf= this.resizeHandleStart.getHeight()/2;
      
      var startPoint = line.getStartPoint();
      var endPoint   = line.getEndPoint();
      
      this.resizeHandleStart.show(this,startPoint.x-resizeWidthHalf,startPoint.y-resizeHeightHalf);
      this.resizeHandleEnd.show(this,endPoint.x-resizeWidthHalf,endPoint.y-resizeHeightHalf);

      this.resizeHandleStart.setDraggable(line.isResizeable());
      this.resizeHandleEnd.setDraggable(line.isResizeable());
    },

    /**
     * @private
     **/
    hideLineResizeHandles:function()
    {
        this.resizeHandleStart.hide();
        this.resizeHandleEnd.hide();
    },
    
    /**
     * @method
     * @private
     **/
    showResizeHandles:function(figure)
    {
     
      if( this.getCurrentSelection()!==figure)
      {
        this.hideLineResizeHandles();
        this.hideResizeHandles();
      }

      // We must reset the alpha blending of the resizeHandles if the last selected object != figure
      // Reason: We would fadeIn the ResizeHandles at the new selected object but the fast toggle from oldSeleciton => newSelection
      //         doesn't reset the alpha to 0.0. So, we do it manually.
      //
      if(this.getEnableSmoothFigureHandling()===true && this.getCurrentSelection()!==figure)
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

      if(figure.isResizeable()===true)
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
     * Move the ResizeHandles to the handsover figure.
     *
     * @param {graphiti.Figure} figure
     * @private
     **/
    moveResizeHandles:function( figure)
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
       if(this.horizontalSnapToHelperLine!==null)
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
       if(this.verticalSnapToHelperLine!==null)
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
     * Called when a user clicks on the element.
     *
     * @template
     */
    onClick: function(){
    },


    /**
     * @private
     **/
    onMouseDown : function(/* :int */x, /* :int */y)
    {
        var canDragStart = true;
        // check if a line has been hit
        //
        var figure = this.getBestFigure(x, y);

        if(figure!==null && figure.isDraggable()){
            this.mouseDraggingElement = figure;
            canDragStart = figure.onDragstart();
            // Element send a veto about the drag&drop operation
            if(canDragStart===false){
                this.mouseDraggingElement = null;
            }
        }

        if (figure !== this.currentSelection && figure !== null && figure.isSelectable()===true) {

            this.hideResizeHandles();
            this.setCurrentSelection(figure);

            // its a line
            if (figure instanceof graphiti.Line) {
                this.showLineResizeHandles(this.currentSelection);
                // you can move a line with Drag&Drop...but not a connection.
                // A Connection is fixed linked with the corresponding ports.
                //
                if (!(figure instanceof graphiti.Connection)) {
                    this.draggingLineCommand = figure.createCommand(new graphiti.EditPolicy(graphiti.EditPolicy.MOVE));
                    if (this.draggingLineCommand !== null) {
                        this.draggingLine = figure;
                    }
                }
            }
            else {
                if (this.dragDropHandlingByCanvas === true) {
                    this.showResizeHandles(this.currentSelection);
                }
            }
        }

    },
    
    /**
     * @private
     */
    onMouseMove : function(/* :int */dx,/* :int */dy)
    {
        if (this.mouseDraggingElement !== null) {
            this.mouseDraggingElement.onDrag(dx, dy);
        }
    },


    /**
     * @private
     **/
    onMouseUp : function()
    {
        if (this.mouseDraggingElement !== null) {
            this.mouseDraggingElement.onDragend();
        }
        this.mouseDraggingElement = null;
    }

});

