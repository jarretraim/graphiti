
/**
 * @class graphiti.util.UUID
 * Generates a (pseudo) UUID's
 * 
 *      // a UUID in the format 
 *      // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (8-4-4-4-12) 
 *      var id = graphiti.util.UUID.create();
 * 
 * @author Andreas Herz
 * @constructor
 * @private
 */
graphiti.util.UUID=function()
{
};


/**
 * @method
 * Generates a unique id.<br>
 * But just for the correctness: <strong>this is no Global Unique Identifier</strong>, it is just a random generator 
 * with the output that looks like a GUID. <br>
 * But may be also useful.
 *
 * @returns {String} the  UUID in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (8-4-4-4-12) 
 **/
graphiti.util.UUID.create=function()
{
  var segment=function() 
  {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (segment()+segment()+"-"+segment()+"-"+segment()+"-"+segment()+"-"+segment()+segment()+segment());
};
