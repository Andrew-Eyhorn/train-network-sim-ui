import React from "react";

function normaliseAngle(angle: number) {
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



function offsetText(angle: number) {
  if (angle < -Math.PI/2) {
    return "end"
  }
  if (angle >= -Math.PI/2 && angle < 0) {
    return "start"
  }
  else if (angle < Math.PI/2) {
    return "end"
  }
  else return "start"
}
// Define types for nodes and edges
interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  mapAngle: number;
}

interface Edge {
  source: string;
  target: string;
  offset: number; // Offset for parallel edges
  color: string
}

interface GraphProps {
  nodes: Node[];
  edges: Edge[];
}

const D3GraphWithOffsets: React.FC<GraphProps> = ({ nodes, edges }) => {
  // Helper function to find a node by ID
  const getNodeById = (id: string): Node | undefined => nodes.find((node) => node.id === id);

  // Generate edge paths with offsets using D3
  const edgePaths = edges.map((edge) => {
    const sourceNode = getNodeById(edge.source);
    const targetNode = getNodeById(edge.target);

    if (!sourceNode || !targetNode) return null;

    // Calculate vector between source and target
    const dx = targetNode.x - sourceNode.x;
    const dy = targetNode.y - sourceNode.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    // Normalize vector to find perpendicular direction
    const offsetX = (-dy / length) * edge.offset;
    const offsetY = (dx / length) * edge.offset;

    // Return adjusted line coordinates
    return {
      x1: sourceNode.x + offsetX,
      y1: sourceNode.y + offsetY,
      x2: targetNode.x + offsetX,
      y2: targetNode.y + offsetY,
      color: edge.color
    };
  });

  return (
    <svg width={2000} height={2000} style={{ border: "1px solid black" }}>
      {/* Render edges */}
      {edgePaths.map((path, index) =>
        path ? (
          <line
            key={index}
            x1={path.x1}
            y1={path.y1}
            x2={path.x2}
            y2={path.y2}
            stroke={path.color}
            strokeWidth={1}
          />
        ) : null
      )}

      {/* Render nodes */}
      {nodes.map((node) => (
        <g key={node.id}>
        {/* Node circle */}
        <circle
          cx={node.x}
          cy={node.y}
          r={node.size}
          fill={"black"}
          stroke="black"
        />
        {/* Node label */}
        <text
          x={node.x - node.size}
          y={node.y - node.size} 
          textAnchor={offsetText(node.mapAngle)} 
          fontSize="5"
          fill="black"
          transform = {`rotate(${normaliseAngle(node.mapAngle)}, ${node.x}, ${node.y})`}
        >
          {node.id}
        </text>
      </g>
      ))}
    </svg>
  );
};

export default D3GraphWithOffsets;
