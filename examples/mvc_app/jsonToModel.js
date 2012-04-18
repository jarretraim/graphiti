function jsonToModel(jsonData) {

	var circuit = new example.mvc_simple.CircuitModel();
	$.each(jsonData.nodes, function(i, item) {
		var node = new example.mvc_simple.NodeModel(item.id);
		node.setPosition(item.x, item.y);
		circuit.addNode(node);
	});

	$.each(jsonData.connections, function(i, conn) {
		var connectionModel = new example.mvc_simple.ConnectionModel(
				conn.source, conn.target);

		circuit.getNodeModel(conn.source).addConnectionModel(connectionModel);
	});
	
	return circuit;
}