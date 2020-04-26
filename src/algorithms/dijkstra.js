//dijsktra's algorithm
//  let distance of start vertex from start vertex = 0
//  let distance of all other vertices from start = infinity
//  while vertices remain unvisited
//      visit unvisited vertex with smallest known distance from start vertex
//      for each unvisited neighbor of the current vertex
//      calculate the distance from start vertex
//      if the calculated distance of this vertex is less than the known distance
//          update the shortest distance to this vertex
//          update the previous vertex with respect to the current vertex
//      end if
//     NEXT unvisited neighbour
//     Add the current vertex to the list of visited vertices


export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    //while all nodes are not explored
    while (!!unvisitedNodes.length) {
        //sort all the unvisitednodes by their distance
        sortNodesByDistance(unvisitedNodes);
        //return the closestNode from the unvisitedNodes
        const closestNode = unvisitedNodes.shift();
        //if we hit a wall we skip it
        if (closestNode.isWall) continue;
        //if the closest node is at a distance of infinity, we can't go around it and are trapped
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesinShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}