
/**
 * @class graphiti.PropertyChangeEvent
 * 
 * A "PropertyChange" event gets delivered whenever a model changes a property. A PropertyChangeEvent object is sent
 * as an argument to the PropertyChangeListener methods.<br>
 * <br>
 * Normally PropertyChangeEvents are accompanied by the name and the old and new value of the changed property.
 * Null values may be provided for the old and the new values if their true values are not known.
 * An event source may send a null object as the "property" to indicate that an arbitrary set of if its properties
 * have changed. In this case the old and new values should also be null.
 *
 * @author Andreas Herz
 */
graphiti.mvc.PropertyChangeEvent= Class.extend({
		
	/**
	 * @constructor
	 * Create a new event object
	 * 
	 * @param {graphiti.mvc.AbstractObjectModel} model
	 * @param {String} property
	 * @param {String} oldValue
	 * @param {String} newValue
	 */
	init: function( model,  property,  oldValue, newValue){
		
	   this.model = model;
	   this.property = property;
	   this.oldValue = oldValue;
	   this.newValue = newValue;
	}
});