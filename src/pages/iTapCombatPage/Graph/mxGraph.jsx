import React, { useEffect, useState } from "react";
import {
  mxGraph,
  mxConstants,
  mxRubberband,
  mxUtils,
  mxCell,
  mxGeometry,
  mxEvent,
} from "mxgraph-js";

function MxGraphGridAreaEditor() {
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    const container = document.getElementById("graphContainer");
    const graph = new mxGraph(container);
    setGraph(graph);

    graph.getModel().beginUpdate();
    try {
      const parent = graph.getDefaultParent();

      // Custom styles for vertices
      const vertexStyle = {
        shape: mxConstants.SHAPE_ELLIPSE,
        fill: "#FFCC00",
        stroke: "#FFA500",
        strokeWidth: 2,
        rounded: true,
        fontColor: "#000000",
      };

      graph.getStylesheet().putCellStyle("customVertexStyle", vertexStyle);

      const v1 = graph.insertVertex(
        parent,
        null,
        "Hello,",
        20,
        20,
        80,
        30,
        "customVertexStyle" // Apply custom style to vertex
      );
      const v2 = graph.insertVertex(
        parent,
        null,
        "World!",
        200,
        150,
        80,
        30,
        "customVertexStyle" // Apply custom style to vertex
      );
      const e1 = graph.insertEdge(parent, null, "", v1, v2);

      // Customize edges for shortest path appearance
      graph.setCellStyle(
        "edgeStyle=elbowEdgeStyle;orthogonalLoop=1;jettySize=auto;html=1;",
        [e1]
      );
    } finally {
      graph.getModel().endUpdate();
    }

    // Disables the built-in context menu
    mxEvent.disableContextMenu(container);
  }, []);

  return (
    <div>
      <div
        id="graphContainer"
        style={{ width: "100%", height: "100vh", overflow: "hidden" }}
      ></div>
    </div>
  );
}

export default MxGraphGridAreaEditor;
