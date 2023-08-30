import React, { useState } from "react";
import "./App.css";
import "react-json-pretty/themes/monikai.css";

const App = () => {
  const [tree, setTree] = useState({
    name: "root",
    children: [
      {
        name: "child1",
        children: [
          { name: "child1-child1", data: "c1-c1 Hello" },
          { name: "child1-child2", data: "c1-c2 JS" },
        ],
      },
      {
        name: "child2",
        children: [
          { name: "child2-child1", data: "c2-c1 Hello" },
          { name: "child2-child2", data: "c2-c2 JS" },
        ],
      },
    ],
  });

  const [exportedJSON, setExportedJSON] = useState(null);

  const handleExport = () => {
    const exportedTree = stripInternalProperties(tree);
    const formattedJSON = JSON.stringify(exportedTree, null, 4);
    setExportedJSON(formattedJSON);
  };
  const stripInternalProperties = (tag) => {
    const { name, children, data } = tag;
    const strippedTag = { name };

    if (data !== undefined) {
      strippedTag.data = data;
    }

    if (children !== undefined && children.length > 0) {
      strippedTag.children = children.map(stripInternalProperties);
    }

    return strippedTag;
  };

  return (
    <div className="App">
      <button className="export-button" onClick={handleExport}>
        Export
      </button>
      <div className="exported-json">
        <pre>{exportedJSON}</pre>
      </div>
    </div>
  );
};

export default App;
