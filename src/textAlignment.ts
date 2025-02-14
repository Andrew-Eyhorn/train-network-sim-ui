import { Point, LineSegment, Node, Edge, Rectangle } from './objectDefinitions';

const FONTSIZE = 5;

/**
 * 
 * @param angle - node's map angle in radians
 * @returns - 0 or 45 degrees
 */
function normaliseAngle(angle: number): number {
	angle = Math.round(angle * 180 / Math.PI)
	angle = Math.abs(angle)
	if (angle % 90 < 25 || angle % 90 > 75) {
		angle = 45
	}
	else {
		angle = 0
	}
	return angle
}


/**
 * 
 * @param angle - the map angle of the node in radians
 * @returns 1 for left anchor, -1 for right anchor
 */
function offsetText(angle: number): number {
	if (angle < -Math.PI / 2) {
		return -1
	}
	if (angle >= -Math.PI / 2 && angle < 0) {
		return 1
	}
	else if (angle < Math.PI / 2) {
		return -1
	}
	else return 1
}

export function getNodesEdges(testData: any): [Node[], Edge[]] {
	let nodes: Node[] = [];
	let edges: Edge[] = [];

	let nodeData = testData["nodes"];

	for (let i = 0; i < nodeData.length; i++) {
		let node = nodeData[i];
		let n = 1;
		let textInfo = getTextSize(node["id"], FONTSIZE);

		nodes.push({
			id: node["id"],
			x: (node["pos"][0] * n + 2000 / 2),
			y: (2000 / 2 - node["pos"][1] * n),
			size: node["size"] / 100,
			mapAngle: normaliseAngle(node["map_angle"]),
			textDirection: offsetText(node["map_angle"]),
			textWidth: textInfo[0],
			textHeight: textInfo[1]
		});
	}

	let edgeData = testData["links"];
	for (let i = 0; i < edgeData.length; i++) {
		let edge = edgeData[i];
		edges.push({
			source: edge["source"],
			target: edge["target"],
			color: edge["color"],
			offset: edge["offset"]
		});
	}
	return [nodes, edges];
}

/**
 * @param text - the text to be measured
 * @param fontSize - the fontsize (assuming Courier New font)
 * @returns - [height, width], in px
 */
function getTextSize(text: string, fontSize: number): [number, number] {
	let width: number = 0.6 * fontSize * text.length
	let height: number = 1.2 * fontSize
	return [width, height]
}

/**
 * Using formula to find left or right turn from:
 * https://www.geeksforgeeks.org/orientation-3-ordered-points/
 * 
 * @param line - the line segment
 * @param point - the third point
 * @returns 0 if collinear, 1 if clockwise, 2 if counterclockwise
 */
function orientation(line: LineSegment, point: Point): number {
	let { pointA, pointB } = line;
	let value: number = (pointB.y - pointA.y) * (point.x - pointB.x) - (pointB.x - pointA.x) * (point.y - pointB.y);
	if (value === 0) {
		return 0;
	}
	else return (+ (value < 0))
}

/**
 * Checks if pointC lies on the line segment AB given the 3 points are collinear
 * From https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
 * @param line - the line segment
 * @param point - the point to check
 * @returns true if the point lies on the line segment
 */
function onSegment(pointA: Point, pointB: Point, pointC: Point): boolean {
	if (pointC.x <= Math.max(pointA.x, pointB.x) && pointC.x >= Math.min(pointA.x, pointB.x) &&
		pointC.y <= Math.max(pointA.y, pointB.y) && pointC.y >= Math.min(pointA.y, pointB.y)) {
		return true;
	}
	return false;

}

/**
 * Checks if two line segments formed by node text labels  formed by node text labelsi formed by node text labelsntersect using intersection method 
 * from https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
 * 
 * @param line1 - first line segment
 * @param line2 - second line segment
 * @returns true if the segments intersect
 */
function segmentsIntersect(line1: LineSegment, line2: LineSegment): boolean {
	let o1: number = orientation(line1, line2.pointA);
	let o2: number = orientation(line1, line2.pointB);
	let o3: number = orientation(line2, line1.pointA);
	let o4: number = orientation(line2, line1.pointB);

	if (o1 != o2 && o3 != o4) return true;
	if (o1 === 0 && onSegment(line1.pointA, line2.pointA, line1.pointB)) return true;
	if (o2 === 0 && onSegment(line1.pointA, line2.pointB, line2.pointB)) return true;
	if (o3 === 0 && onSegment(line1.pointB, line2.pointB, line1.pointA)) return true;
	if (o4 === 0 && onSegment(line1.pointB, line2.pointB, line2.pointA)) return true


	return false;
}


function getTextRectangle(node: Node): Rectangle {
	let textLine: LineSegment = getLine(node)
	
}

/**
 * Gets the line segment formed by the node's text label
 * 
 * @param node node object
 * @returns the pair of points forming the line segment
 */
function getLine(node: Node): LineSegment {
	let pointA: Point = { x: node.x, y: node.y };
	let pointB: Point = { x: 0, y: 0 };

	if (node.mapAngle === 45) {
		pointB.x = pointA.x + node.size * Math.sqrt(2) * node.textDirection;
		pointB.y = pointA.y + node.size * Math.sqrt(2) * node.textDirection;
	} else {
		pointB.x = pointA.x + node.size * node.textDirection;
		pointB.y = pointA.y + node.size * node.textDirection;
	}

	return { pointA, pointB };
}

/**
 * 
 * @param nodeA 
 * @param nodeB 
 * @returns true if text is likely to overlap
 */
function textOverlaps(nodeA: Node, nodeB: Node): boolean {
	let lineA = getLine(nodeA);
	let lineB = getLine(nodeB);

	return segmentsIntersect(lineA, lineB);
}

/**
 * 
 * @param nodeA 
 * @param nodeB 
 * @returns true if distance between the nodes is less than their combined text lengths
 */
function closeNodes(nodeA: Node, nodeB: Node): boolean {
	let distance: number = Math.sqrt((nodeB.x - nodeA.x) ** 2 + (nodeB.y - nodeA.y) ** 2);
	return (distance < (nodeA.size + nodeB.size));
}

/**
 * Checks the nearest nodes below the current for text overlaps
 * @param nodeList - list of nodes sorted in ascending by x or y
 * @param startPos - the index of the node being checked
 */
function checkForOverlaps(nodeList: Node[], nodePos: number) {
	let j: number = nodePos + 1;
	let nodeA: Node = nodeList[nodePos];
	while (j < nodeList.length - 1 && closeNodes(nodeA, nodeList[j])) {
		if (textOverlaps(nodeA, nodeList[j])) {
			if (nodeA.textDirection === nodeList[j].textDirection) {
				if (nodeA.textDirection === 1) {
					nodeA.textDirection = -1;
				} else {
					nodeList[j].textDirection = 1;
				}
			}
		}
		j += 1;
	}
}

/**
 * Makes sure there is no text overlap for the node labels
 * @param nodes - the nodes of the graph
 * @returns - the modified nodes list
 */
export function allignText(nodes: Node[]): Node[] {
	function compare_nodes_x(a: Node, b: Node) {
		return a.x - b.x;
	}

	let sortedNodesX = nodes.slice().sort(compare_nodes_x);

	function compare_nodes_y(a: Node, b: Node) {
		return a.y - b.y;
	}

	let sortedNodesY = nodes.slice().sort(compare_nodes_y);

	for (let n: number = 0; n < 5; n++) {
		for (let i: number = 0; i < nodes.length; i++) {
			checkForOverlaps(sortedNodesX, i);
			checkForOverlaps(sortedNodesY, i);
		}
	}

	return nodes;
}