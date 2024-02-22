import stringToColor from "./stringToColor";
import { MarkerType } from "reactflow";

export default function paintEdges(nodes, edges, keys) {
    console.log(keys)
    const keyNode = nodes.find(node => keys.includes(node.data.IINBIN || node.data.IIN));
    
    const transformedEdges = nodes.filter(node => node.type == 'edgeNode' && (node.data.source == keyNode.id || node.data.target == keyNode.id))

    // console.log("Directly connected edges", transformedEdges)
    const children = nodes.filter(
        node => 
            !keys.includes((node.data.IINBIN || node.data.IIN) && node.located == false) && 
            (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source )
            )

    const childrenIds = children.map(node => node.id)
    const edgesIds = children.map(edge => edge.id)        

    edges = edges.map((link) => {
        let color = stringToColor(keyNode.id.toString())
        if ((link.source == keyNode.id) || (edgesIds.includes(link.source) && childrenIds.includes(link.target) || (edgesIds.includes(link.target) && childrenIds.includes(link.target)))) {
            return {
                ...link,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: color,
                },
                style: {
                    strokeWidth: 2,
                    stroke: color,
                } 
            }
        } else {
            return link
        }
    })

    return edges;
}


function assignBinaryTree(nodes, keyNode, gapX, gapY) {
    const transformedEdges = nodes.filter(node => node.type == 'edgeNode' && (node.data.source == keyNode.id || node.data.target == keyNode.id))
    // console.log("Directly connected edges", transformedEdges)
    if (transformedEdges.length > 0) {
        const companies = nodes.filter(
            node => 
                node.id != keyNode.id && 
                (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source ) &&
                node.data.type == 'company'
                )
        const persons = nodes.filter(
            node => 
                node.id != keyNode.id && 
                (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source ) &&
                node.data.type == 'person'
                )
        const addresses = nodes.filter(
            node => 
                node.id != keyNode.id && 
                (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source ) &&
                node.data.type == 'address'
                )
    
        // console.log("Result", addresses)
    
        // Position the key node
        let startX = keyNode.position.x
        let startY = keyNode.position.y
        

        let currentX = startX - (companies.length * (gapX)) - 200 
        if (companies.length > 0) {
            companies.forEach(node => {
                if (node.located) {
                    // let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    // if (itsEdges.length > 1) {
                    //     itsEdges.forEach(edge => {
                    //         edge.position = { x: (node.position.x - keyNode.position.x)/2, y: startY + gapY }
                    //     })
                    // } 
                } else {
                    node.position = { x: currentX, y: startY + gapY * 2 }; // Double the gapX for the right column
                    node.located = true
                    assignBinaryTree(nodes, node, gapX, gapY)
                    let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    if (itsEdges.length > 1) {
                        let widthOfEdgeLine = currentX + 150 - ((itsEdges.length * 200) + ((itsEdges.length - 1) * 50))/2 
                        // console.log(itsEdges)
                        itsEdges.forEach(edge => {
                            edge.position = { x: widthOfEdgeLine, y: startY + gapY }
                            widthOfEdgeLine += 250
                        })
                    } else {
                        itsEdges.forEach(edge => {
                            edge.position = { x: currentX + 50, y: startY + gapY }
                        })
                    }
                    currentX += gapX + 100; // Move down for the next node
                }
            });
        }
        if (persons.length > 0) {
            currentX = keyNode.position.x + 200
            persons.forEach(node => {
                if (node.located) {
                    // let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    // if (itsEdges.length > 1) {
                    //     itsEdges.forEach(edge => {
                    //         edge.position = { x: keyNode.position.x - (node.position.x - keyNode.position.x)/2, y: startY + gapY }
                    //     })
                    // } 
                } else {
                    node.position = { x: currentX, y: startY + gapY * 2 }; // Double the gapX for the right column
                    node.located = true
                    assignBinaryTree(nodes, node, gapX, gapY)
                    let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    if (itsEdges.length > 1) {
                        let widthOfEdgeLine = currentX + 150 - ((itsEdges.length * 200) + ((itsEdges.length - 1) * 50))/2 
                        // console.log(itsEdges)
                        itsEdges.forEach(edge => {
                            edge.position = { x: widthOfEdgeLine, y: startY + gapY }
                            widthOfEdgeLine += 250
                        })
                    } else {
                        itsEdges.forEach(edge => {
                            edge.position = { x: currentX + 50, y: startY + gapY }
                        })
                    }
                    currentX += gapX + 100; // Move down for the next node
                }
            });
        }
        if (addresses.length > 0) {
            let addressX = keyNode.position.x + 150 - ((addresses.length * gapX) + (addresses.length - 1)*100)/2
            addresses.forEach(node => {
                if (node.located) {
                    // let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    // if (itsEdges.length > 1) {
                    //     itsEdges.forEach(edge => {
                    //         edge.position = { x: keyNode.position.x - (node.position.x - keyNode.position.x)/2, y: startY + gapY }
                    //     })
                    // } 
                } else {
                    node.position = { x: addressX, y: startY - gapY * 2 }; // Double the gapX for the right column
                    node.located = true
                    assignBinaryTree(nodes, node, gapX, gapY)

                    let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    if (itsEdges.length > 1) {
                        let widthOfEdgeLine = addressX + 100 - ((itsEdges.length * 200) + ((itsEdges.length - 1) * 50))/2 
                        // console.log(itsEdges)
                        itsEdges.forEach(edge => {
                            edge.position = { x: widthOfEdgeLine, y: startY - gapY }
                            widthOfEdgeLine += 250
                        })
                    } else {
                        itsEdges.forEach(edge => {
                            edge.position = { x: addressX + 50, y: startY - gapY }
                        })
                    }
                    addressX += gapX + 100; // Move down for the next node
                }
            });
        }
    } else {
        // console.log(keyNode)
    }

    return nodes;   
}