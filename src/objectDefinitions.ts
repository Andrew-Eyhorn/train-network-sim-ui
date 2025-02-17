
export interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  mapAngle: number;
  textDirection: number;
  textWidth: number;
  textHeight: number;
  intersectCount: number; //debug temp
  intersectList: string[]; //debug temp
}

export interface Edge {
  source: string;
  target: string;
  offset: number; // Offset for parallel edges
  color: string
}

export interface GraphProps {
  nodes: Node[];
  edges: Edge[];
}

export interface Point {
    x: number;
    y: number;
}

export interface LineSegment {
    pointA: Point;
    pointB: Point;
}

export interface Rectangle {
  	top: LineSegment;
	bottom: LineSegment;
	left: LineSegment;
	right: LineSegment;
}
