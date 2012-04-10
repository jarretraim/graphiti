/* This notice must be untouched at all times.

Open-jACOB Draw2D
The latest version is available at
http://www.openjacob.org

Copyright (c) 2006 Andreas Herz. All rights reserved.
Created 5. 11. 2006 by Andreas Herz (Web: http://www.freegroup.de )

LICENSE: LGPL

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License (LGPL) as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
or see http://www.gnu.org/copyleft/lesser.html
*/

/**
 * 
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
/*:NAMESPACE*/CommandReconnect=function(/*:@NAMESPACE@Connection*/ con)
{
   /*:NAMESPACE*/Command.call(this,"reconnect connection");
   this.con      = con;
   this.oldSourcePort  = con.getSource();
   this.oldTargetPort  = con.getTarget();
   this.oldRouter      = con.getRouter();

   // cheap routing during drag&drop
//   this.con.setRouter(new /*:NAMESPACE*/NullConnectionRouter());
};

/*:NAMESPACE*/CommandReconnect.prototype = new /*:NAMESPACE*/Command();
/** @private **/
/*:NAMESPACE*/CommandReconnect.prototype.type="@NAMESPACE@CommandReconnect";

/**
 * Returns [true] if the command can be execute and the execution of the
 * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
 * return false. <br>
 * the execution of the Command doesn't modify the model.
 *
 * @type boolean
 **/
/*:NAMESPACE*/CommandReconnect.prototype.canExecute=function()
{
  // return false if we doesn't modify the model => NOP Command
  return true;
};

/*:NAMESPACE*/CommandReconnect.prototype.setNewPorts=function(/*:@NAMESPACE@Port*/ source, /*:@NAMESPACE@Port*/ target)
{
  this.newSourcePort = source;
  this.newTargetPort = target;
};

/**
 * Execute the command the first time
 * 
 **/
/*:NAMESPACE*/CommandReconnect.prototype.execute=function()
{
   this.redo();
};

/**
 * Execute the command the first time
 * 
 **/
/*:NAMESPACE*/CommandReconnect.prototype.cancel=function()
{
   var start  = this.con.sourceAnchor.getLocation(this.con.targetAnchor.getReferencePoint());
   var end    = this.con.targetAnchor.getLocation(this.con.sourceAnchor.getReferencePoint());
   this.con.setStartPoint(start.x,start.y);
   this.con.setEndPoint(end.x,end.y);
   this.con.getWorkflow().showLineResizeHandles(this.con);
   this.con.setRouter(this.oldRouter);
};

/**
 * Undo the command
 *
 **/
/*:NAMESPACE*/CommandReconnect.prototype.undo=function()
{
  this.con.setSource(this.oldSourcePort);
  this.con.setTarget(this.oldTargetPort);
  this.con.setRouter(this.oldRouter);
  if(this.con.getWorkflow().getCurrentSelection()==this.con)
     this.con.getWorkflow().showLineResizeHandles(this.con);
};

/** 
 * Redo the command after the user has undo this command
 *
 **/
/*:NAMESPACE*/CommandReconnect.prototype.redo=function()
{
  this.con.setSource(this.newSourcePort);
  this.con.setTarget(this.newTargetPort);
  this.con.setRouter(this.oldRouter);
  if(this.con.getWorkflow().getCurrentSelection()==this.con)
     this.con.getWorkflow().showLineResizeHandles(this.con);
};
