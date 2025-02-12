//read data
// var testData = require('./data/sample_network.json');


export function getNodesEdges(testData: any) : [any[],any[]] {
    let nodes: any[] = [];
    let edges: any[] = [];


    let nodeData = testData["nodes"]

    for (let i = 0; i < nodeData.length; i++) {
        let node = nodeData[i]
        let n=1
        nodes.push({id: node["id"], x: (node["pos"][0]*n + 2000/2), y: (2000/2 - node["pos"][1]*n), size: node["size"]/100, mapAngle: node["map_angle"]})
    }
    
    let edgeData = testData["links"]
    for (let i = 0; i < edgeData.length; i++) {
        let edge = edgeData[i]
        edges.push({source: edge["source"], target: edge["target"], color: edge["color"], offset: edge["offset"]})
    }
    return [nodes, edges]
}


// //sort by x and sort by y, 2 lists
export function allignText(nodes: any[]): any[] {
    function compare_nodes_x(a: any,b: any) {
        return a.x - b.x
    }

    let sortedNodesX = nodes.slice().sort(compare_nodes_x)

    function compare_nodes_y(a: any,b: any) {
        return a.y - b.y
    }
    
    let sortedNodesY = nodes.slice().sort(compare_nodes_y)
  
    return [sortedNodesX, sortedNodesY]
} 

//assign text sizes to each

//check for collsion and flip
//repeat x5

//save to data