/**
 * @class graphiti.decoration.connection.Decorator 
 * 
 * 
 * @inheritable
 * @author Andreas Herz
 */
graphiti.decoration.connection.Decorator = Class.extend({

	NAME : "graphiti.decoration.connection.Decorator",

	/**
	 * @constructor 
	 */
	init : function() {
		this.color = new graphiti.util.Color(0, 0, 0);
		this.backgroundColor = new  graphiti.util.Color(250, 250, 250);
	},

	/**
	 * @method
	 * Paint the decoration for a connector. The Connector starts always in
	 * [0,0] and ends in [x,0]
	 * 
	 * <pre>
	 *                |
	 *                |
	 *                |
	 *  --------------+-----------------------------&gt; +X
	 *                |
	 *                |
	 *                |
	 *                V -Y
	 * 
	 * 
	 * </pre>
	 * 
	 * See in ArrowConnectionDecorator for example implementation.
	 * @param {Raphael} paper
	 */
	paint : function(paper) {
		// do nothing per default
	},

	/**
	 * @method
	 * Set the stroke color for the decoration
	 * 
	 * @param {graphiti.util.Color} c
	 */
	setColor : function(c) {
		this.color = c;
	},

	/**
	 * @method
	 * Set the background color for the decoration
	 * 
	 * @param {graphiti.util.Color} c
	 */
	setBackgroundColor : function(c) {
		this.backgroundColor = c;
	}
});