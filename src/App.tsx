// import { useEffect } from "react";
// import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
// import "@react-sigma/core/lib/react-sigma.min.css";


// import { MultiDirectedGraph } from "graphology";
// import Graph from "graphology";

// import {useLayoutNoverlap} from "@react-sigma/layout-noverlap"


// import myData from './data/sample_network.json';


// const sigmaStyle = { height: "1920px", width: "1080px" }


// // Component that load the graph
// const LoadGraph = () => {

//   const { positions, assign } = useLayoutNoverlap();


//   const loadGraph = useLoadGraph();
//   useEffect(() => {
//     const graph = new Graph({multi: true, type: "directed"})
//     //nodes
//     let nodeData = myData["nodes"]
//     for (let i = 0; i < nodeData.length; i++) {
//       let node = nodeData[i]
//       graph.addNode(node["id"], { label: node["id"], size: node["size"] / 25, x: i, y: i, color: "gray" })
//     }

//     //edges
//     let edgeData = myData["links"]
//     for (let i = 0; i < edgeData.length; i++) {
//       let edge= edgeData[i]
//       graph.addDirectedEdgeWithKey(i, edge["source"], edge["target"], {color: edge["color"]} )
//     }

//     assign();

//     loadGraph(graph);
//   }, [assign, loadGraph]);

//   return null;
// };

// // // Component that display the graph
// // export const DisplayGraph = () => {
// //   return (
// //     <SigmaContainer style={sigmaStyle} graph = {MultiDirectedGraph}>
// //       <LoadGraph />
// //     </SigmaContainer>
// //   );
// // };


// function App() {

//   return (
//     <SigmaContainer style={sigmaStyle} graph = {MultiDirectedGraph}>
//       <LoadGraph />
//     </SigmaContainer>
//   );
// }

// export default App

// import { LayoutCircular} from "./reactSigmaExample"

// const sigmaStyle = { height: "1920px", width: "1080px" }

// export default function App() {
//   return (
//     <LayoutCircular style={sigmaStyle}/>
//   );
// }


import React from "react";
import CytoscapeComponent from "react-cytoscapejs";


import testData from "./data/sample_network.json"

const CytoscapeGraph: React.FC = () => {
  // const elements = [
  //   // Nodes
  //   { data: { id: "a", label: "Node A" } },
  //   { data: { id: "b", label: "Node B" } },
  //   { data: { id: "c", label: "Node C" } },

  //   // Edges (including a parallel edge for demonstration)
  //   { data: { source: "a", target: "b", label: "Edge 1" } },
  //   { data: { source: "a", target: "b", label: "Edge 2 (parallel)" } },
  //   { data: { source: "b", target: "c", label: "Edge 3" },
  //   },
  // ];

const elements = [];

let nodeData = testData["nodes"]

for (let i = 0; i < nodeData.length; i++) {
  let node = nodeData[i]
  elements.push({data:{id: node["id"], label: node["id"]}})
}

let edgeData = testData["links"]

let offsets = [-20, -10, 10, 20]
for (let i = 0; i < edgeData.length; i++) {
  let edge = edgeData[i]
  elements.push({data: {source: edge["source"], target: edge["target"], color: edge["color"], offset: offsets[edge["key"]/2]}})

}
  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: "1960px", height: "1080px" }}
      layout={{ name: "cose" }} // You can try other layouts like 'circle', 'breadthfirst', etc.
      stylesheet={[
        {
          selector: "node",
          style: {
            content: "data(label)", // Display labels
            "text-valign": "center",
            "text-halign": "center",
            "background-color": "#61bffc",
            color: "#000",
            "font-size": "10px",
          },
        },
        {
          selector: "edge",
          style: {
            "curve-style": "segments", // Simulates straight segments with offsets
            "segment-distances": "data(offset)", // Apply dynamic offsets
            "segment-weights": 0.5, // Center the offset
            "line-color": "data(color)",
            "target-arrow-color": "#ccc",
            "label": "data(label)", // Display edge labels
          },
        },
      ]}
    />
  );
};

export default CytoscapeGraph;
