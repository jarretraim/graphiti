/**
 * @class graphiti.decoration.connection.DiamondDecorator
 * 
 * 
 * @inheritable
 * @author Andreas Herz
 * @extend graphiti.decoration.connection.Decorator
 */
graphiti.decoration.connection.DiamondDecorator = graphiti.decoration.connection.Decorator.extend({

	NAME : "graphiti.decoration.connection.DiamondDecorator",

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
	 * Draw a filled diamond decoration.
	 * 
	 * It's not your work to rotate the arrow. The graphiti do this job for you.
	 * 
	 * @param {Raphael} paper the raphael paper object for the paint operation 
	 **/
	paint:function(paper)
	{
		var st = paper.set();
		var path = ["M", this.width/2," " , -this.height/2];  // Go to the top center..
		path.push(  "L", this.width  , " ", 0);               // ...draw line to the right middle
		path.push(  "L", this.width/2, " ", this.height/2);   // ...bottom center...
		path.push(  "L", 0           , " ", 0);               // ...left middle...
		path.push(  "L", this.width/2, " ", -this.height/2);  // and close the path
		path.push(  "Z");
		st.push(
	        paper.path(path.join(""))
		);
		st.attr({fill:this.backgroundColor.getHashStyle()});
		return st;
	}
	
});

