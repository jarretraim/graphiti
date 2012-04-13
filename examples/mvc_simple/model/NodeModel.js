

example.mvc_simple.NodeModel= graphiti.mvc.AbstractObjectModel.extend({
	
	NAME : "example.mvc_simple.NodeModel", // just for debugging
	
	/**
	 * @constructor
	 */
	init: function(){
		this._super();
		
		this.pos= new graphiti.geo.Point(0,0);
	},
	
	/**
	 * @method
	 * Update the postion of the model.
	 * 
	 * @param {Number} x
	 * @param {Number} y
	 */
	setPosition:function(x ,y)
	{
	  var save = this.pos;
	  
	  // Don't move ELements outside the left or top canvas border
	  //
	  this.pos = new graphiti.geo.Point( Math.max(0,x),Math.max(0,y));
	  
	  this.firePropertyChange(this.EVENT_POSITION_CHANGED,save, this.pos);
	},
	
	/**
	 * @method
	 * Return the postion of the model object
	 * 
	 * @return {graphiti.geo.Point}
	 */
	getPosition: function(){
		return this.pos;
	}
});
