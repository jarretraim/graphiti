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

	init:function(){
		this.listeners = new graphiti.util.ArrayList();
		this.id = graphiti.util.UUID.create();
	},

	/**
	 * @method
	 * Return all model children of this model object.
	 *
	 * @return {graphiti.util.ArrayList}
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
	 * Set the parent of this model object
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
	 * @return {String}
	 * @template
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
	
	   var event = new graphiti.mvc.Event(this, propertyName, oldValue, newValue);
	   for(var i=0; i<count;i++)
	   {
         this.listeners.get(i).propertyChange(event);
	   }
	},
	
	/**
	 * @method
	 * Adds a PropertyChangeListener to the listener list. The listener is registered for all properties of this class,
	 * If listener is null, no exception is thrown and no action is performed.
	 *
	 * @param {Object/function} the callback object which must have a method propertyChange or a function.
	 **/
	addPropertyChangeListener:function( listener)
	{
	   if(typeof listener === "function"){
	       var obj = {};
	       obj.propertyChange= listener;
           this.listeners.add(listener);
	   }
	   else if(typeof listener.propertyChange ==="function"){
	     this.listeners.add(listener);
	   }
	   else {
	       throw "Unable to register listner. Listerner must be a function or an object with a callbakc function named 'propertyChange'";
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
