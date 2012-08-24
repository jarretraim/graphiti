/**
 * @class graphiti.layout.connection.BezierConnectionRouter 
 * 
 * @inheritable
 * @author Andreas Herz
 * @extends graphiti.layout.connection.ManhattanConnectionRouter
 */
graphiti.layout.connection.BezierConnectionRouter = graphiti.layout.connection.ManhattanConnectionRouter.extend({

	NAME : "graphiti.layout.connection.BezierConnectionRouter",

    /**
     * @constructor Creates a new Router object
     */
    init : function()
    {
        this.cheapRouter = null;
        this.iteration = 5;
    },

    route : function(conn)
    {
    	var i=0;
		var fromPt  = conn.getStartPoint();
		var fromDir = this.getStartDirection(conn);

		var toPt  = conn.getEndPoint();
		var toDir = this.getEndDirection(conn);

		// calculate the lines between the two points.
		//
		this._route(conn, toPt, toDir, fromPt, fromDir);

 	    // calculate the path string for the SVG rendering
 	    //
        var ps = conn.getPoints();
        var last=null;
        var current=null;
        var next=null;
        var insert=null;
        var sign=0;
        for(i=0; i<(ps.getSize()-1);i++){
        	current = ps.get(i);
        	next = ps.get(i+1);
        	if(last!==null){
        		// VERTICAL insert
        		//
        		if(last.getX()===current.getX()){
        			insert = current.clone();
        			
        			sign = Math.sign((current.getY()-last.getY()));
        			current.translate(0,10*sign);
        			
        			sign = Math.sign((current.getX()-next.getX()));
      				insert.translate(10*sign,0);
      				ps.insertElementAt(insert,i);
      				i++;
        		}
        		// HORIZONTAL insert
        		//
        		else if(last.getY()===current.getY()){
        			      			
        		}
        	}
        	last = current;
        }

        var path = ["M",fromPt.x," ",fromPt.y,"R"];
        for( i=0;i<ps.getSize();i++){
              p = ps.get(i);
              path.push(p.x, ", ", p.y," ");
        }
        conn.svgPathString = path.join("");
        
        console.log( conn.svgPathString );
    }


});