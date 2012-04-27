
/**
 * @author Andreas Herz
 * @constructor
 **/
example.mvc_simple.ConnectionFigure= graphiti.Connection.extend({

    init : function()
    {
        this._super();
    },
    

    propertyChange : function(event)
    {
        switch (event.property) {
        case graphiti.mvc.Event.PROPERTY_CHANGED:
            this.paint();
            break;
        case graphiti.mvc.Event.SOURCE_CHANGED:
            this.refreshSourcePort();
            break;
        case graphiti.mvc.Event.TARGET_CHANGED:
            this.refreshTargetPort();
            break;
        default:
            break;
        }
    },


    
    /**
     * Returns the Command to perform the specified Request or null.
      *
     * @param {draw2d.EditPolicy} request describes the Command being requested
     * @return null or a Command
     * @type draw2d.Command 
     **/
    
    createCommand:function( request)
    {
      if(request.getPolicy() === graphiti.EditPolicy.MOVE_BASEPOINT)
      {
        return new example.mvc_simple.CommandReconnect(this.getModel());
      }
    
      if(request.getPolicy() == graphiti.EditPolicy.DELETE)
      {
          return new example.mvc_simple.CommandDisconnect(this.getModel());
      }
    
      return  null;
    }

});