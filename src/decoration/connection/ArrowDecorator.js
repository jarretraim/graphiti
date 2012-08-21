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
        this._super( width, height);
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
		var path = ["M0 0"];  
		path.push(  "L", this.width, " ", -this.height/2); 
		path.push(  "L", this.width, " ", this.height/2);
		path.push(  "L0 0");
		st.push(
	        paper.path(path.join(""))
		);
        st.attr({fill:this.backgroundColor.getHashStyle()});
		return st;
	}
});

