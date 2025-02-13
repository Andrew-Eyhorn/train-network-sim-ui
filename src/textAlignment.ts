//read data
// var testData = require('./data/sample_network.json');

/**
 * 
 * @param testData - the data generated by the python script, contains node and edge data
 * @returns - the nodes and edges, with locations scaled
 */


const FONTSIZE = 5;




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





export function getNodesEdges(testData: any) : [any[],any[]] {
    let nodes: any[] = [];
    let edges: any[] = [];


    let nodeData = testData["nodes"]

    for (let i = 0; i < nodeData.length; i++) {
        let node = nodeData[i]
        let n=1
        let textInfo = getTextSize(node["id"], FONTSIZE)
        let normalisedAngle = normaliseAngle(node["map_angle"])
        nodes.push({id: node["id"], x: (node["pos"][0]*n + 2000/2), y: (2000/2 - node["pos"][1]*n), size: node["size"]/100, mapAngle: normalisedAngle, textWidth: textInfo[0], textHeight: textInfo[1], textOffset: offsetText(normalisedAngle)})
    }
    
    let edgeData = testData["links"]
    for (let i = 0; i < edgeData.length; i++) {
        let edge = edgeData[i]
        edges.push({source: edge["source"], target: edge["target"], color: edge["color"], offset: edge["offset"]})
    }
    return [nodes, edges]
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
 * Checks if two line segments formed by node text labels intersect using intersection method 
 * from https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection, "Given two points on each line"
 * 
 * @param pointA line A first point(nodeA)
 * @param pointB line A second point(where text ends)
 * @param pointC line B first point(nodeB)
 * @param pointD line B second point(where text ends)
 * @returns true if the segments intersect
 */
function segmentsIntersect(pointA: [number, number], pointB: [number, number], pointC: [number, number], pointD: [number,number]): boolean {
    let [x1, y1]: number[] = pointA
    let [x2, y2]: number[] = pointB
    let [x3, y3]: number[] = pointC
    let [x4, y4]: number[] = pointD

    let t: number = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))
    let u: number = ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))

    return (0 <= t && t <= 1) && (0 <= u && u <= 1)
}

/**
 * Gets the line segment formed by the node's text label
 * 
 * @param node node object
 * @returns the pair of points forming the line segment
 */
function getLine(node: any): [[number, number], [number, number]] {
    let [x1, y1]: number[] = [node["x"], node["y"]]
    let [x2, y2]: number[] = [0, 0]

    let mult: number = 1
    if (node["textOffset"] = "end") {

    }
    if (node["mapAngle"] === 45) {
        x2 = x1 + node["width"] * Math.sqrt(2)
        y2 = y1 + node["width"] * Math.sqrt(2)
    } 
    else {
        x2 = x1 + node["width"]
        y2 = y1 + node["width"]
    }

    return [[x1, y1], [x2, y2]]
}


function textOverlaps(nodeA: any, nodeB: any): boolean {
    let lineA = getLine(nodeA)
    let lineB = getLine(nodeB)

    return segmentsIntersect(lineA[0], lineA[1], lineB[0], lineB[1])
}

/**
 * Makes sure there is no text overlap for the node labels
 * @param nodes - the nodes of the graph
 * @returns - the modified nodes list
 */
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

    //generate text size info

    //code to get 
} 

//assign text sizes to each

//check for collsion and flip
//repeat x5

//save to data