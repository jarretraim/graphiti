
/**
 * @class graphiti.mvc.AbstractConnectionModel
 * Base model class for connection handling in the MVC pattern.
 *
 * @extends graphiti.mvc.AbstractObjectModel
 **/
graphiti.mvc.AbstractConnectionModel = graphiti.mvc.AbstractObjectModel.extend({
    
    init: function(){
        this._super();
    },
    
    /**
     *
     * @return {graphiti.mvc.AbstractObjectModel}
     **/
    getSourceModel:function()
    {
       throw "you must override the method [AbstractConnectionModel.getSourceModel]";
    },
    
    /**
     *
     * @return {graphiti.mvc.AbstractObjectModel}
     **/
    getTargetModel:function()
    {
       throw "you must override the method [AbstractConnectionModel.getTargetModel]";
    },
   
    
    /**
     *
     * @return {String}
     **/
    getSourcePortName:function()
    {
       throw "you must override the method [AbstractConnectionModel.getSourcePortName]";
    },
    
    /**
     *
     * @return {String}
     **/
    getTargetPortName:function()
    {
       throw "you must override the method [AbstractConnectionModel.getTargetPortName]";
    },

    /**
     *
     * @return {graphiti.mvc.AbstractObjectModel}
     **/
    getSourcePortModel:function()
    {
       throw "you must override the method [AbstractConnectionModel.getSourcePortModel]";
    },
    
    /**
     *
     * @return {graphiti.mvc.AbstractObjectModel}
     **/
    getTargetPortModel:function()
    {
       throw "you must override the method [AbstractConnectionModel.getTargetPortModel]";
    }
});
