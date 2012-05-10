/**
 * @author Andreas Herz
 * @constructor
 **/
example.mvc_simple.InputPort = graphiti.InputPort.extend({

    init : function()
    {
        this._super( "input");
    },
    
    /**
     * Returns the Command to perform the specified Request or null.<br>
     * Inherited figures can override this method to return the own implementation
     * of the request.<br>
     *
     * @param {draw2d.EditPolicy} request describes the Command being requested
     * @return null or a draw2d.Command
     * @type draw2d.Command 
     **/
    createCommand : function(request)
    {
        // Connect request between two ports
        //
        if (request.getPolicy() === graphiti.EditPolicy.CONNECT) {
            // loopback connections are not valid
            if (request.source.getParent().getId() === request.target.getParent().getId()) {
                return null;
            }

            if (request.source instanceof graphiti.OutputPort) {
                // This is the different to the OutputPort implementation of createCommand
                var sourceModel = request.source.getParent().getModel();
                var targetModel = request.target.getParent().getModel();
                return new example.mvc_simple.CommandConnect(sourceModel, targetModel);
            }
            return null;
        }
        // ...else call the base class
        return this._super(this, request);
    }
});
