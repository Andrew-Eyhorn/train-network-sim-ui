import D3GraphWithOffsets from "./d3test";

import testData from './data/sample_network.json';






function App() {

  const nodes: any = [];
  const edges: any = [];

  let nodeData = testData["nodes"]
  for (let i = 0; i < nodeData.length; i++) {
    let node = nodeData[i]
    nodes.push({id: node["id"], x: node["pos"][0] + 2000/2, y: 2000/2 - node["pos"][1], size: node["size"]/100, mapAngle: node["map_angle"]})
  }

  let edgeData = testData["links"]
  for (let i = 0; i < edgeData.length; i++) {
    let edge = edgeData[i]
    edges.push({source: edge["source"], target: edge["target"], color: edge["color"], offset: edge["offset"]})
  }

  // const nodes = [
  //   { id: "A", x: 0, y: 0, size: 35, label: "A" },
  //   { id: "B", x: 500, y: 500, size: 35 },
  // ];
  
  // const edges = [
  //   { source: "A", target: "B", offset: -15, color: "blue"}, 
  //   { source: "A", target: "B", offset: -10, color: "green"}, 
  //   { source: "A", target: "B", offset: -5, color: "red"}, 
  //   { source: "A", target: "B", offset: 5, color: "lightblue"}, 
  //   { source: "A", target: "B", offset: 10, color: "yellow"}, 
  //   { source: "A", target: "B", offset: 15, color: "orange"}, 
  // ];
  
  
  return (
    <D3GraphWithOffsets nodes={nodes} edges={edges} />
  
  );
}

export default App