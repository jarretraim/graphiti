/**
 * @class graphiti.geo.Point Util class for geometrie handling.
 */
graphiti.geo.Point = Class.extend({

    /**
     * @constructor 
     * Creates a new Point object with the hands over coordinates.
     * @param {Number} x
     * @param {Number} y
     */
    init : function(x, y)
    {
        this.x = x;
        this.y = y;
    },

    /**
     * @method 
     * The X value of the point
     * @since 0.1
     * @return {Number}
     */
    getX : function()
    {
        return this.x;
    },

    /**
     * @method 
     * The y value of the point
     * 
     * @return {Number}
     */
    getY : function()
    {
        return this.y;
    },

    /**
     * @method 
     * Set the new X value of the point
     * 
     * @param {Number} x the new value
     */
    setX : function(x)
    {
        this.x = x;
    },

    /**
     * @method 
     * Set the new Y value of the point
     * 
     * @param {Number}y the new value
     */
    setY : function(y)
    {
        this.y = y;
    },

    /**
     * @method 
     * Calculates the relative position of the specified Point to this Point.
     * 
     * @param {graphiti.geo.Point} p The reference Point
     * @return {graphiti.geo.PositionConstants} NORTH, SOUTH, EAST, or WEST, as defined in {@link graphiti.geo.PositionConstants}
     */
    getPosition : function(p)
    {
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        if (Math.abs(dx) > Math.abs(dy))
        {
            if (dx < 0)
                return graphiti.geo.PositionConstants.WEST;
            return graphiti.geo.PositionConstants.EAST;
        }
        if (dy < 0)
            return graphiti.geo.PositionConstants.NORTH;
        return graphiti.geo.PositionConstants.SOUTH;
    },

    /**
     * @method 
     * Compares two points and return [true] if x and y are equals.
     * 
     * @param {graphiti.geo.Point} p the point to compare with
     * @return boolean
     */
    equals : function(p)
    {
        return this.x === p.x && this.y === p.y;
    },

    /**
     * @method 
     * Return the distance between this point and the hands over.
     * 
     * @param {graphiti.geo.Point}
     *            p the point to use
     * @return {Number}
     */
    getDistance : function(other)
    {
        return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
    },

    /**
     * @method 
     * Return a new Point translated with the x/y values of the hands over point.
     * 
     * @param {graphiti.geo.Point} other the offset to add for the new point.
     * @return {graphiti.geo.Point} The new translated point.
     */
    getTranslated : function(other)
    {
        return new graphiti.geo.Point(this.x + other.x, this.y + other.y);
    },

    /**
     * @method 
     * Return an objects with all important attributes for XML or JSON serialization
     * 
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        return {
            x : this.x,
            y : this.y
        };
    }
});