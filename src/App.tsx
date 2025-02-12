import D3GraphWithOffsets from "./d3test";

import testData from './data/sample_network.json';

import {getNodesEdges, allignText} from "./textAlignment"



function App() {


  let nodesEdges = getNodesEdges(testData)

  let sorted = allignText(nodesEdges[0])

  console.log(sorted)
  return (
    <D3GraphWithOffsets nodes={nodesEdges[0]} edges={nodesEdges[1]} />
  
  );
}

export default App


