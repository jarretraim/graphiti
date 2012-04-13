
/**
 * @class
 * 
 *
 **/
draw2d.AbstractConnectionModel=function()
{
   draw2d.AbstractObjectModel.call(this);
};

draw2d.AbstractConnectionModel.prototype = new draw2d.AbstractObjectModel();
/** @private */
draw2d.AbstractConnectionModel.prototype.type="draw2d.AbstractConnectionModel";


/**
 *
 * @type draw2d.ObjectModel
 **/
draw2d.AbstractConnectionModel.prototype.getSourceModel=function()
{
   throw "you must override the method [AbstractConnectionModel.prototype.getSourceModel]";
};

/**
 *
 * @type draw2d.ObjectModel
 **/
draw2d.AbstractConnectionModel.prototype.getTargetModel=function()
{
   throw "you must override the method [AbstractConnectionModel.prototype.getTargetModel]";
};


/**
 *
 * @type String
 **/
draw2d.AbstractConnectionModel.prototype.getSourcePortName=function()
{
   throw "you must override the method [AbstractConnectionModel.prototype.getSourcePortName]";
};

/**
 *
 * @type String
 **/
draw2d.AbstractConnectionModel.prototype.getTargetPortName=function()
{
   throw "you must override the method [AbstractConnectionModel.prototype.getTargetPortName]";
};



/**
 *
 * @type draw2d.ObjectModel
 **/
draw2d.AbstractConnectionModel.prototype.getSourcePortModel=function()
{
   throw "you must override the method [AbstractConnectionModel.prototype.getSourcePortModel]";
};

/**
 *
 * @type draw2d.ObjectModel
 **/
draw2d.AbstractConnectionModel.prototype.getTargetPortModel=function()
{
   throw "you must override the method [AbstractConnectionModel.prototype.getTargetPortModel]";
};
