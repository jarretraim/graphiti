/**
 * @class graphiti.decoration.connection.CircleDecorator
 * 
 * 
 * @inheritable
 * @author Andreas Herz
 * @extend graphiti.decoration.connection.Decorator
 */
graphiti.decoration.connection.CircleDecorator = graphiti.decoration.connection.Decorator.extend({

	NAME : "graphiti.decoration.connection.CircleDecorator",

	/**
	 * @constructor 
	 * 
	 * @param {Number} [width] the width of the arrow
	 * @param {Number} [height] the height of the arrow
	 */
    init : function(width, height)
    {   
        this._super( width, height);
    },

	/**
	 * Draw a filled circle decoration.

	 * @param {Raphael} paper the raphael paper object for the paint operation 
	 **/
	paint:function(paper)
	{
		var shape= paper.circle(0, 0, this.width/2);
        shape.attr({fill:this.backgroundColor.getHashStyle()});
		
		return shape;
	}
});






