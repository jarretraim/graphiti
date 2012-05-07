/**
 * @class graphiti.layout.locator.ConnectionLocator
 * 
 * Repositions a Figure attached to a Connection when the 
 * Connection is moved. Provides for alignment at the start 
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend graphiti.layout.locator.Locator
 */
graphiti.layout.locator.ConnectionLocator= graphiti.layout.locator.Locator.extend({
    
    /**
     * @constructor
     * Default constructor for a Locator which can layout a figure in context of a 
     * {@link grapiti.Connector}
     * 
     * @param {graphiti.Connection} connection
     */
    init:function( connection)
    {
      this._super();
      this.connection = connection;
    },
    
    
    /**
     * @method
     * Returns the associated connection
     *
     * @return {graphiti.Connection}
     **/
    getConnection:function()
    {
       return this.connection;
    }
});