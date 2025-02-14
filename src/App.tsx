import D3GraphWithOffsets from "./d3test";

import testData from './data/sample_network.json';

import {getNodesEdges, allignText} from "./textAlignment"



function App() {


  let nodesEdges = getNodesEdges(testData)

  console.log("before", nodesEdges[0])
  
  let nodes = allignText(nodesEdges[0])

  console.log("after", nodes)
  return (
    // <D3GraphWithOffsets nodes={nodesEdges[0]} edges={nodesEdges[1]} />
    <D3GraphWithOffsets nodes={nodes} edges={nodesEdges[1]} />
  );
}

export default App


