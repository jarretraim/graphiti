
/**
 * @class A Connection is the line between two {@link @NAMESPACE@Port}s.
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
/*:NAMESPACE*/ConnectionDecorator=function()
{
  this.color = new /*:NAMESPACE*/Color(0,0,0);
  this.backgroundColor = new /*:NAMESPACE*/Color(250,250,250);
};

/*:NAMESPACE*/ConnectionDecorator.prototype.type="@NAMESPACE@ConnectionDecorator";

/**
 * Paint the decoration for a connector.
 * The Connector starts always in [0,0] and ends in [x,0]
 * 
 * <pre>
 *                |
 *                |
 *                |
 *  --------------+-----------------------------> +X
 *                |
 *                |
 *                |
 *                V -Y
 *
 * </pre>
 * See in ArrowConnectionDecorator for example implementation.
 **/
/*:NAMESPACE*/ConnectionDecorator.prototype.paint=function(/*:@NAMESPACE@Graphics*/ g)
{
 // do nothing per default
};

/*:NAMESPACE*/ConnectionDecorator.prototype.setColor=function(/*:@NAMESPACE@Color*/ c)
{
  this.color = c;
};

/*:NAMESPACE*/ConnectionDecorator.prototype.setBackgroundColor=function(/*:@NAMESPACE@Color*/ c)
{
  this.backgroundColor = c;
};
