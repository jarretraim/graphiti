/**
 * @class graphiti.mvc.AbstractObjectModel
 * 
 * A factory for creating new EditParts. EditPartViewers can be configured with an EditPartFactory.
 * Whenever an EditPart in that viewer needs to create another EditPart, it can use the Viewer's factory.
 * The factory is also used by the viewer whenever EditPartViewer.setContents(Object)  is called.
 * 
 * @author Andreas Herz
 */
graphiti.mvc.AbstractObjectModel = Class.extend({
    NAME : "graphiti.mvc.AbstractObjectModel", // only for debugging

	EVENT_ELEMENT_ADDED     : "element added",
	EVENT_ELEMENT_REMOVED   : "element removed",
	EVENT_CONNECTION_ADDED  : "connection addedx",
	EVENT_CONNECTION_REMOVED: "connection removed",
	EVENT_PROPERTY_CHANGED  : "property changed",
	EVENT_POSITION_CHANGED  : "position changed",

	init:function(){
		this.listeners = new graphiti.util.ArrayList();
		this.id = graphiti.util.UUID.create();
	},

	/**
	 * Return all model children of this model object.
	 *
	 * @type  draw2d.ArrayList
	 **/
	getModelChildren:function()
	{
	   return new graphiti.util.ArrayList();
	},
	
	/**
	 * @method
	 * Return the parent model of this element or null if this the root object of
	 * the model.
	 *
	 * @return {graphiti.mvc.AbstractObjectModel
	 **/
	getModelParent:function()
	{
	   return this.modelParent;
	},
	
	/**
	 * @method
	 * Set the parent of this mopdel object
	 * 
	 * @param {graphiti.mvc.AbstractObjectModel} parent
	 */
	setModelParent:function( parent)
	{
	   this.modelParent=parent;
	},
	
	/**
	 * @method
	 * Return the unique id of this model element.
	 *
	 * @return {String
	 * @template}
	 **/
	getId:function()
	{
	   return this.id;
	},
	
	/**
	 * @method
	 * Notifies any property change listeners that a property has changed. Only listeners registered at 
	 * the time this method is called are notified.
	 *
	 * @param {String} propertyName the name of the changed property
	 * @param {Object} oldValue the old value of the property
	 * @param {Object} newValue the new value of the property
	 **/
	firePropertyChange:function(propertyName,  oldValue, newValue)
	{
	   var count = this.listeners.getSize();
	   if(count===0){
	    return;
	   }
	
	   var event = new graphiti.mvc.PropertyChangeEvent(this, propertyName, oldValue, newValue);
	   for(var i=0; i<count;i++)
	   {
	       try
	       {
	         this.listeners.get(i).propertyChange(event);
	       }
	       catch(e)
	       {
	          alert("Method: AbstractObjectModel.firePropertyChange\n"+e+ "\nProperty: "+propertyName+"\nListener Class:"+this.listeners.get(i).NAME);
	       }
	   }
	},
	
	/**
	 *
	 * Adds a PropertyChangeListener to the listener list. The listener is registered for all properties of this class,
	 * If listener is null, no exception is thrown and no action is performed.
	 *
	 **/
	addPropertyChangeListener:function( listener)
	{
	   if(listener!==null){
	     this.listeners.add(listener);
	   }
	},
	
	/**
	 * Removes a PropertyChangeListener from the listener list. This method should be used to remove 
	 * PropertyChangeListeners that were registered for all properties of this class.
	 * If listener is null, no exception is thrown and no action is performed. 
	 **/
	removePropertyChangeListener:function( listener)
	{
	   if(listener!==null){
	      this.listeners.remove(listener);
	   }
	},
	
	/**
	 * Returns all attributes which are relevatn for serialization.
	 * 
	 * @return The list of persistend attribute.
	 **/
	getPersistentAttributes:function()
	{
	   return {
	            id: this.id
	          };
	}

});
