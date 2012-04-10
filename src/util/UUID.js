/**
 * 
 * @author Andreas Herz
 * @constructor
 */
graphiti.util.UUID=function()
{
};


/**
 * Generates a unique id.
 * But just for the correctness: this is no Global Unique Identifier, it is just a random generator 
 * with the output that looks like a GUID. But may be also useful.
 *
 * @private
 * @returns String
 **/
graphiti.util.UUID.create=function()
{
  var segment=function() 
  {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (segment()+segment()+"-"+segment()+"-"+segment()+"-"+segment()+"-"+segment()+segment()+segment());
};
