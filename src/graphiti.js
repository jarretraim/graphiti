/**
 * @class graphiti
 * global namespace declarations
 * 
 * @private
 */
var graphiti = 
{
    geo: {
    },

    util : {
    },

    command : {
    },

    layout: {
        router :{
        }
    },
    
    mvc:{
    	model:{},
    	view:{},
    	controller:{}
    	
    },
    
    
    ui :{
    	parts:{
    		
    	}
    }
    
    
};


var _errorStack_=[];
function pushErrorStack(/*:Exception*/ e, /*:String*/ functionName)
{
  _errorStack_.push(functionName+"\n");
  /*re*/throw e;
};
