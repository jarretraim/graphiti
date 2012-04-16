/*
 * Copyright (c) 2010 Andreas Herz. All rights reserved.
 */


/**
 * @author Andreas Herz
 **/
example.mvc_simple.CommandConnect = graphiti.command.Command.extend({
    
    /**
     * @constructor
     * 
     * @param {example.mvc_simple.NodeModel} source
     * @param {example.mvc_simple.NodeModel} target
     */
    init: function(source, target)
    {
       if(source===null || target===null){
            throw "Source and target must be set to create a new  draw2d.CommandConnectNodes object";
       }
       this._super("Connect Storage");
       this.source   = source;
       this.target   = target;
       this.model = null;
    },
    
    /**
     * Init the Command with my own implementation of a connection
     *
     **/
    setConnection:function(/*:draw2d.Connection*/ connection)
    {
       this.connection=connection;
    },
    
    /**
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
       this.redo();
    },
    
    /**
     * Redo the command after the user has undo this command.
     *
     **/
    redo:function()
    {
       if(this.model===null){
          this.model= new example.mvc_simple.ConnectionModel(this.source.getId(), this.target.getId());
       }
          
       console.log("ConnectCommand MVC");
       this.source.addConnectionModel(this.model);
    },
    
    /** 
     * Undo the command.
     *
     **/
    undo:function()
    {
       this.source.removeConnectionModel(this.model);
    }
});
