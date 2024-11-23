


import MultiGraph from "graphology";
import Sigma from "sigma";



import myData from './data/sample_network.json';

let data = myData["nodes"]

const graph = new MultiGraph();
for (let i = 0; i < data.length; i++) {
    let node = data[i]
    graph.addNode(node["id"], {label: node["id"], size: node["size"], x: i, y: i})
}

const sigmaInstance = new Sigma(graph, document.getElementById("container")!);
console.log("lijkl;afjkl;ads")
