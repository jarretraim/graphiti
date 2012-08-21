/**
 * @class graphiti.decoration.connection.ArrowDecorator
 * 
 * 
 * @inheritable
 * @author Andreas Herz
 * @extend graphiti.decoration.connection.Decorator
 */
graphiti.decoration.connection.ArrowDecorator = graphiti.decoration.connection.Decorator.extend({

	NAME : "graphiti.decoration.connection.ArrowDecorator",

	/**
	 * @constructor 
	 * 
	 * @param {Number} [width] the width of the arrow
	 * @param {Number} [height] the height of the arrow
	 */
	init : function(width, height)
	{	
      if(width ===undefined || width<1)
		this.width  = 10;
      
	  if(height === undefined || height <1)
	    this.height = 15;
	},

	/**
	 * Draw a filled arrow decoration.
	 * It's not your work to rotate the arrow. The graphiti do this job for you.
	 * 
	 * <pre>
	 *                        ---+ [length , width/2]
	 *                 -------   |
	 * [3,0]   --------          |
	 *     +---                  |==========================
	 *         --------          |
	 *                 -------   |
	 *                        ---+ [lenght ,-width/2]
	 * 
	 *</pre>
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
		
		st.push(
	        paper.path(path.join(""))
		);
		
		return st;
	},
	
	/**
	 * Change the dimension of the arrow
	 *
	 * @param {Number} width  The new width of the arrow
	 * @param {Number} height The new height of the arrow
	 **/
	setDimension:function( /*:int*/ width, height)
	{
	    this.width=width;
	    this.height=height;
	}
});

