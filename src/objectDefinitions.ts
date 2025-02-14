
export interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  mapAngle: number;
  textDirection: number;
  textWidth: number;
  textHeight: number;
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
    lineA: LineSegment;
	lineB: LineSegment;
	lineC: LineSegment;
	lineD: LineSegment;
}