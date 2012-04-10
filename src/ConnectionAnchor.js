graphiti.ConnectionAnchor = Class.extend({

    init:function(owner){
        this.owner = owner;
    },

    /**
     * Returns the location where the Connection should be anchored in absolute coordinates. 
     * The anchor may use the given reference Point to calculate this location.
     * @param reference The reference Point in absolute coordinates
     * @return The anchor's location
     */
    getLocation:function(/*:@NAMESPACE@Point*/ reference)
    {
       // return the center of the owner.
       return this.getReferencePoint();
    },
    
    /**
     * Returns the Figure that contains this ConnectionAnchor.
     * @return The Figure that contains this ConnectionAnchor
     */
    getOwner:function()
    {
       return this.owner;
    },
    
    /**
     * Set the owner of the Anchor.
     */
    setOwner:function(/*:@NAMESPACE@Port*/ owner)
    {
       this.owner=owner;
    },
    
    /**
     * Returns the bounds of this Anchor's owner.  Subclasses can override this method
     * to adjust the box. Maybe you return the box of the port parent (the parent figure)
     *
     * @return The bounds of this Anchor's owner
     */
    getBox:function()
    {
      return this.getOwner().getAbsoluteBounds();
    },
    
    /**
     * Returns the reference point for this anchor in absolute coordinates. This might be used
     * by another anchor to determine its own location.
     * @return The reference Point
     */
    getReferencePoint:function()
    {
       if (this.getOwner()===null)
         return null;
       else 
         return this.getOwner().getAbsolutePosition();
    }
});