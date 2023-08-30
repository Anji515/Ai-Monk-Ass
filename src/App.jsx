import React, { useState } from "react";
import "./App.css";
import "react-json-pretty/themes/monikai.css";
import {TagView} from "./Components/TageView";

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

  const handleAddChild = (parentTag) => {
    const newChild = { name: "New Child", data: "Data" };

    const traverseAndAddChild = (currentTag) => {
      if (currentTag.name === parentTag.name) {
        if (!currentTag.children) {
          currentTag.children = [];
        }
        currentTag.children.push(newChild);
      } else if (currentTag.children) {
        currentTag.children = currentTag.children.map(traverseAndAddChild);
      }
      return currentTag;
    };

    setTree(traverseAndAddChild({ ...tree }));
  };

  const handleToggleCollapse = (tagToToggle) => {
    const traverseAndToggleCollapse = (currentTag) => {
      if (currentTag === tagToToggle) {
        return { ...currentTag, collapsed: !currentTag.collapsed };
      }

      if (currentTag.children) {
        return {
          ...currentTag,
          children: currentTag.children.map(traverseAndToggleCollapse),
        };
      }

      return currentTag;
    };

    setTree(traverseAndToggleCollapse(tree));
  };

  const handleUpdateName = (tagToUpdate, newName) => {
    const traverseAndUpdateName = (currentTag) => {
      if (currentTag === tagToUpdate) {
        return { ...currentTag, name: newName };
      }

      if (currentTag.children) {
        return {
          ...currentTag,
          children: currentTag.children.map(traverseAndUpdateName),
        };
      }

      return currentTag;
    };

    setTree(traverseAndUpdateName(tree));
  };

  const handleUpdateData = (tagToUpdate, newData) => {
    const traverseAndUpdateData = (currentTag) => {
      if (currentTag === tagToUpdate) {
        return { ...currentTag, data: newData };
      }

      if (currentTag.children) {
        return {
          ...currentTag,
          children: currentTag.children.map(traverseAndUpdateData),
        };
      }

      return currentTag;
    };

    setTree(traverseAndUpdateData(tree));
  };

  return (
    <div className="App">
      <TagView 
      tag={tree}
      onAddChild={handleAddChild}
      onToggleCollapse={handleToggleCollapse}
      onUpdateName={handleUpdateName}
      onUpdateData={handleUpdateData}
      />
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
