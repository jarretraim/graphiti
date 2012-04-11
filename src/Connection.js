/**
 * @class graphiti.Connection
 *  A Connection is the line between two {@link graphiti.Port}s.
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
graphiti.Connection = graphiti.Line.extend({

    DEFAULT_ROUTER: new graphiti.layout.router.DirectRouter(),
    
    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     */
    init: function( ) {
      this._super();
      
      this.sourcePort = null;
      this.targetPort = null;
    
      this.canDrag = true;
    
      this.oldPoint=null;
      
      this.sourceDecorator = null; /*:graphiti.ConnectionDecorator*/
      this.targetDecorator = null; /*:graphiti.ConnectionDecorator*/
    
      this.sourceAnchor = new graphiti.ConnectionAnchor(this);
      this.targetAnchor = new graphiti.ConnectionAnchor(this);
    
      this.router =this.DEFAULT_ROUTER;
    
      this.lineSegments = new graphiti.util.ArrayList();
    
      this.children = new graphiti.util.ArrayList();
    
      this.setColor(new  graphiti.util.Color(0,0,115));
      this.setLineWidth(1);
    },
    
    
    /**
     * @private
     **/
    disconnect:function()
    {
      if(this.sourcePort!==null)
      {
        this.sourcePort.detachMoveListener(this);
        this.fireSourcePortRouteEvent();
      }
    
      if(this.targetPort!==null)
      {
        this.targetPort.detachMoveListener(this);
        this.fireTargetPortRouteEvent();
      }
    },
    
    /**
     * @private
     **/
    reconnect:function()
    {
      if(this.sourcePort!==null)
      {
        this.sourcePort.attachMoveListener(this);
        this.fireSourcePortRouteEvent();
      }
      
      if(this.targetPort!==null)
      {
        this.targetPort.attachMoveListener(this);
        this.fireTargetPortRouteEvent();
      }
      
      this.repaint();
    },
    
    
    /**
     * You can't drag&drop the resize handles of a connector.
     * @type boolean
     * @deprecated use getCanDrag instead
     **/
    isResizeable:function()
    {
      return this.getDraggable();
    },
    
    /**
     * Switch on/off the drag drop behaviour of this object
     *
     * @param {boolean} flag The new drag drop indicator
     **/
    setDraggable:function(/*:boolean*/flag)
    {
      this.canDrag= flag;
    },
    
    
    /**
     * Return [true] if the connection can be moved (reconnect).
     *
     * @type boolean
     **/
    getDraggable:function()
    {
      return this.canDrag;
    },
    
    /**
     * Add a child figure to the Connection. The hands over figure doesn't support drag&drop 
     * operations. It's only a decorator for the connection.<br>
     * Main for labels or other fancy decorations :-)
     *
     * @param {graphiti.Figure} figure the figure to add as decoration to the connection.
     * @param {graphiti.ConnectionLocator} locator the locator for the child. 
    **/
    addFigure:function(/*:graphiti.Figure*/ figure, /*:graphiti.ConnectionLocator*/ locator)
    {
      var entry = {};
      entry.figure  = figure;
      entry.locator = locator;
    
      this.children.add(entry);
      this.repaint();
    
      var oThis = this;
      var mouseDown = function()
      {
        var oEvent = arguments[0] || window.event;
        oEvent.returnValue = false;
        oThis.getCanvas().setCurrentSelection(oThis);
        oThis.getCanvas().showLineResizeHandles(oThis);
      };
    
      if (figure.getHTMLElement().addEventListener)
        figure.getHTMLElement().addEventListener("mousedown", mouseDown, false);
      else if (figure.getHTMLElement().attachEvent)
         figure.getHTMLElement().attachEvent("onmousedown", mouseDown);
    },
    
    /**
     * Set the ConnectionDecorator for this object.
     *
     * @param {graphiti.ConnectionDecorator} the new source decorator for the connection
     **/
    setSourceDecorator:function(/*:graphiti.ConnectionDecorator*/ decorator)
    {
      this.sourceDecorator = decorator;
      this.repaint();
    },
    
    /**
     * Get the current source ConnectionDecorator for this object.
     *
     * @type graphiti.ConnectionDecorator
     * @since 0.9.18
     **/
    getSourceDecorator:function()
    {
      return this.sourceDecorator;
    },
    
    /**
     * Set the ConnectionDecorator for this object.
     *
     * @param {graphiti.ConnectionDecorator} the new target decorator for the connection
     **/
    setTargetDecorator:function(/*:graphiti.ConnectionDecorator*/ decorator)
    {
      this.targetDecorator = decorator;
      this.repaint();
    },
    
    /**
     * Get the current target ConnectionDecorator for this object.
     *
     * @type graphiti.ConnectionDecorator
     * @since 0.9.18
     **/
    getTargetDecorator:function()
    {
      return this.targetDecorator;
    },
    
    /**
     * Set the ConnectionAnchor for this object. An anchor is responsible for the endpoint calculation
     * of an connection.
     *
     * @param {graphiti.ConnectionAnchor} the new source anchor for the connection
     **/
    setSourceAnchor:function(/*:graphiti.ConnectionAnchor*/ anchor)
    {
      this.sourceAnchor = anchor;
      this.sourceAnchor.setOwner(this.sourcePort);
      this.repaint();
    },
    
    /**
     * Set the ConnectionAnchor for this object.
     *
     * @param {graphiti.ConnectionAnchor} the new target anchor for the connection
     **/
    setTargetAnchor:function(/*:graphiti.ConnectionAnchor*/ anchor)
    {
      this.targetAnchor = anchor;
      this.targetAnchor.setOwner(this.targetPort);
      this.repaint();
    },
    
    
    /**
     * Set the ConnectionRouter for this object.
     *
     **/
    setRouter:function(/*:graphiti.ConnectionRouter*/ router)
    {
      if(router !==null)
       this.router = router;
      else
       this.router = new graphiti.layout.router.NullRouter();
    
      // repaint the connection with the new router
      this.repaint();
    },
    
    /**
     * Return the current active router of this connection.
     *
     * @type graphiti.ConnectionRouter
     **/
    getRouter:function()
    {
      return this.router;
    },
    
    
    /**
     * @private
     **/
    repaint:function()
    {
      this._super();
    
       try
       {
         if(this.sourcePort===null || this.targetPort===null)
            return;
    
        this.startStroke();
    
        // Use the internal router if any has been set....
        //
        this.router.route(this);
    
        // paint the decorator if any exists
        //
        if(this.getSource().getParent().isMoving==false && this.getTarget().getParent().isMoving==false )
        {
          if(this.targetDecorator!==null)
            this.targetDecorator.paint(new graphiti.Graphics(this.graphics,this.getEndAngle(),this.getEndPoint()));
    
          if(this.sourceDecorator!==null)
            this.sourceDecorator.paint(new graphiti.Graphics(this.graphics,this.getStartAngle(),this.getStartPoint()));
        }
        
        if(this.shape!==null)
        {
          var ps = this.getPoints();
          var p = ps.get(0);
          var path = "M"+p.x+" "+p.y;
          for(var i=0;i<ps.getSize();i++)
          {
            p = ps.get(i);
            path=path+"L"+p.x+" "+p.y;
          }
          this.shape.attr({path:path});
        }
        
        this.finishStroke();
    
        for(var i=0; i<this.children.getSize();i++)
        {
            var entry = this.children.get(i);
            entry.locator.relocate(entry.figure);
        }
      }
      catch(e)
      {
          alert(e);
          pushErrorStack(e,"repaint:function()");
      }
    },
    
    /**
     * Return the recalculated position of the start point if we have set an anchor.
     * 
     * @return graphiti.geo.Point
     **/
     getStartPoint:function()
     {
      if(this.isMoving==false)
         return this.sourceAnchor.getLocation(this.targetAnchor.getReferencePoint());
      else
         return this._super();
     },
    
    
    /**
     * Return the recalculated position of the start point if we have set an anchor.
     *
     * @return graphiti.geo.Point
     **/
     getEndPoint:function()
     {
      if(this.isMoving==false)
         return this.targetAnchor.getLocation(this.sourceAnchor.getReferencePoint());
      else
         return this._super();
     },
    
    
    /**
     * @private
     *
     **/
    startStroke:function()
    {
     this.oldPoint=null;
     this.lineSegments = new graphiti.util.ArrayList();
    },
    
    /**
     * @private
     *
     **/
    finishStroke:function()
    {
      this.oldPoint=null;
    },
    
    /**
     * Returns the fulcrums of the connection
     *
     * @return an graphiti.util.ArrayList of type graphiti.Point
     * @type graphiti.util.ArrayList 
     **/
    getPoints:function()
    {
      var result = new graphiti.util.ArrayList();
      var line=null;
      for(var i = 0; i< this.lineSegments.getSize();i++)
      {
         line = this.lineSegments.get(i);
         result.add(line.start);
      }
      // add the last point
      if(line!==null)
        result.add(line.end);
      return result;
    },
    
    /*
     * @private
     *
     **/
    addPoint:function(/*:graphiti.Point*/ p)
    {
      p = new graphiti.geo.Point(parseInt(p.x), parseInt(p.y));
      if(this.oldPoint!==null)
      {
        // store the painted line segment for the "mouse selection test"
        // (required for user interaction)
        var line = {};
        line.start = this.oldPoint;
        line.end   = p;
        this.lineSegments.add(line);
      }
    
      this.oldPoint = {};
      this.oldPoint.x = p.x;
      this.oldPoint.y = p.y;
    },
    
    
    
    /**
     * Called by the inherit class if the source port model of the connections has been changed.<br>
     * Only used if you are working with the MVC pattern.
     *
     * @since 0.9.18
     **/
    refreshSourcePort:function()
    {
       var model    = this.getModel().getSourceModel();
       var portName = this.getModel().getSourcePortName();
       // try to find the corresponding port in the workflow document to this model
       //
       var figures = this.getCanvas().getDocument().getFigures();
       var count = figures.getSize();
       for(var i=0;i<count;i++)
       {
          var figure = figures.get(i);
          if(figure.getModel()===model)
          {
            var port = figure.getOutputPort(portName);
            this.setSource(port);
          }
       }
       this.setRouter(this.getRouter());
    },
    
    /**
     * Called by the inherit class if the target port model of the connections has been changed.<br>
     * Only used if you are working with the MVC pattern.
     *
     **/
    refreshTargetPort:function()
    {
       var model    = this.getModel().getTargetModel();
       var portName = this.getModel().getTargetPortName();
       // try to find the corresponding port in the workflow document to this model
       //
       var figures = this.getCanvas().getDocument().getFigures();
       var count = figures.getSize();
       for(var i=0;i<count;i++)
       {
          var figure = figures.get(i);
          if(figure.getModel()===model)
          {
            var port = figure.getInputPort(portName);
            this.setTarget(port);
          }
       }
       this.setRouter(this.getRouter());
    },
    
    /**
     * Set the new source port of this connection. This enforce a repaint of the connection.
     *
     * @param {graphiti.Port} port The new source port of this connection.
     * 
     **/
    setSource:function(/*:graphiti.Port*/ port)
    {
      if(this.sourcePort!==null)
        this.sourcePort.detachMoveListener(this);
    
      this.sourcePort = port;
      if(this.sourcePort===null)
        return;
      this.sourceAnchor.setOwner(this.sourcePort);
      this.fireSourcePortRouteEvent();
      this.sourcePort.attachMoveListener(this);
      this.setStartPoint(port.getAbsoluteX(), port.getAbsoluteY());
    },
    
    /**
     * Returns the source port of this connection.
     *
     * @type graphiti.Port
     **/
    getSource:function()
    {
      return this.sourcePort;
    },
    
    /**
     * Set the target port of this connection. This enforce a repaint of the connection.
     * 
     * @param {graphiti.Port} port The new target port of this connection
     **/
    setTarget:function(/*:graphiti.Port*/ port)
    {
      if(this.targetPort!==null)
        this.targetPort.detachMoveListener(this);
    
      this.targetPort = port;
      if(this.targetPort===null)
        return;
      this.targetAnchor.setOwner(this.targetPort);
      this.fireTargetPortRouteEvent();
      this.targetPort.attachMoveListener(this);
      this.setEndPoint(port.getAbsoluteX(), port.getAbsoluteY());
    },
    
    /**
     * Returns the target port of this connection.
     *
     * @type graphiti.Port
     **/
    getTarget:function()
    {
      return this.targetPort;
    },
    
    /**
     * @see graphiti.Figure#onOtherFigureMoved
     **/
    onOtherFigureMoved:function(/*:graphiti.Figure*/ figure)
    {
      if(figure===this.sourcePort)
        this.setStartPoint(this.sourcePort.getAbsoluteX(), this.sourcePort.getAbsoluteY());
      else
        this.setEndPoint(this.targetPort.getAbsoluteX(), this.targetPort.getAbsoluteY());
    },
    
    /**
     * Checks if the hands over coordinate hits the line.
     *
     * @param {int} px the x coordinate of the test point
     * @param {int} py the y coordinate of the test point
     * @type boolean
     **/
    containsPoint:function(/*:int*/ px, /*:int*/ py)
    {
      for(var i = 0; i< this.lineSegments.getSize();i++)
      {
         var line = this.lineSegments.get(i);
         if(graphiti.Line.hit(this.corona, line.start.x,line.start.y,line.end.x, line.end.y, px,py))
           return true;
      }
      return false;
    },
    
    /**
     * Returns the angle of the connection at the output port (source)
     *
     **/
    getStartAngle:function()
    {
      var p1 = this.lineSegments.get(0).start;
      var p2 = this.lineSegments.get(0).end;
      if(this.router instanceof graphiti.BezierConnectionRouter)
      {
       p2 = this.lineSegments.get(5).end;
      }
      var length = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
      var angle = -(180/Math.PI) *Math.asin((p1.y-p2.y)/length);
    
      if(angle<0)
      {
         if(p2.x<p1.x)
           angle = Math.abs(angle) + 180;
         else
           angle = 360- Math.abs(angle);
      }
      else
      {
         if(p2.x<p1.x)
           angle = 180-angle;
      }
      return angle;
    },
    
    getEndAngle:function()
    {
      if (this.lineSegments.getSize() === 0) 
        return 90;
    
      var p1 = this.lineSegments.get(this.lineSegments.getSize()-1).end;
      var p2 = this.lineSegments.get(this.lineSegments.getSize()-1).start;
      if(this.router instanceof graphiti.layout.router.BezierRouter)
      {
       p2 = this.lineSegments.get(this.lineSegments.getSize()-5).end;
      }
      var length = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
      var angle = -(180/Math.PI) *Math.asin((p1.y-p2.y)/length);
    
      if(angle<0)
      {
         if(p2.x<p1.x)
           angle = Math.abs(angle) + 180;
         else
           angle = 360- Math.abs(angle);
      }
      else
      {
         if(p2.x<p1.x)
           angle = 180-angle;
      }
      return angle;
    },
    
    
    /**
     * @private
     **/
    fireSourcePortRouteEvent:function()
    {
        // enforce a repaint of all connections which are related to this port
        // this is required for a "FanConnectionRouter" or "ShortesPathConnectionRouter"
        //
       var connections = this.sourcePort.getConnections();
       for(var i=0; i<connections.getSize();i++)
       {
          connections.get(i).repaint();
       }
    },
    
    /**
     * @private
     **/
    fireTargetPortRouteEvent:function()
    {
        // enforce a repaint of all connections which are related to this port
        // this is required for a "FanConnectionRouter" or "ShortesPathConnectionRouter"
        //
       var connections = this.targetPort.getConnections();
       for(var i=0; i<connections.getSize();i++)
       {
          connections.get(i).repaint();
       }
    },
    
    
    /**
     * Returns the Command to perform the specified Request or null.
      *
     * @param {graphiti.EditPolicy} request describes the Command being requested
     * @return null or a Command
     * @type graphiti.Command
     **/
    createCommand:function(/*:graphiti.EditPolicy*/ request)
    {
      if(request.getPolicy() === graphiti.EditPolicy.MOVE)
      {
        // DragDrop of a connection doesn't create a undo command at this point. This will be done in
        // the onDrop method
        return new graphiti.command.CommandReconnect(this);
      }
 
      if(request.getPolicy() === graphiti.EditPolicy.DELETE)
      {
        if(this.isDeleteable()==true)
          return new graphiti.command.CommandDelete(this);
      }
    
      return null;
    }
});