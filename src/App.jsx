import React, { useState } from "react";
import "./Styles/styles.css";
import "./App.css";
import "react-json-pretty/themes/monikai.css";
import {TagView} from "./Components/TageView";
import ReactJson from "react-json-pretty";

const App = () => {
  const [tree, setTree] = useState({
    "name": "Products",
    "children": [
      {
        "name": "Electronics",
        "children": [
          {
            "name": "Mobile Phones",
            "children": [
              {
                "name": "iPhone",
                "data": "iPhone 14X model"
              }
            ]
          },
          {
            "name": "Laptops",
            "children": [
              {
                "name": "Apple MacBook",
                "data": "High-performance laptops"
              }
            ]
          }
        ]
      },
      {
        "name": "Clothing",
        "children": [
          {
            "name": "Men's Clothing",
            "children": [
              {
                "name": "T-shirts",
                "data": "Various styles and sizes"
              }
            ]
          },
          {
            "name": "Women's Clothing",
            "children": [
              {
                "name": "Dresses",
                "data": "Casual and formal dresses"
              }
            ]
          }
        ]
      }
    ]  
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
    const newChild = parentTag.name === "root" || parentTag.name === "Products"
    ? { name: "New Child" }
    : { name: "New Child", data: "Data" };
  
    const traverseAndAddChild = (currentTag) => {
      if (currentTag === parentTag) {
        if (!currentTag.children) {
          currentTag.children = [];
        }
        currentTag.children.push(newChild);
        return currentTag;
      }
  
      if (currentTag.children) {
        return {
          ...currentTag,
          children: currentTag.children.map(traverseAndAddChild),
        };
      }
  
      return currentTag;
    };
  
    if (parentTag.name === "Products") {
      setTree({
        ...tree,
        children: [...tree.children, newChild],
      });
    } else {
      setTree(traverseAndAddChild({ ...tree }));
    }
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
        const updatedChildren = currentTag.children.map(traverseAndUpdateName);
        return { ...currentTag, children: updatedChildren };
      }
  
      return currentTag;
    };
  
    const updatedTree = traverseAndUpdateName({ ...tree });
    setTree(updatedTree);
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

  const copyToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = exportedJSON;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Data copied to clipboard!");
  };

  return (
    <div className="App">
      <h2 className="header">A Visual Tree Hierarchy Builder</h2>
      <div >
      <TagView 
      className="container"
      tag={tree}
      onAddChild={handleAddChild}
      onToggleCollapse={handleToggleCollapse}
      onUpdateName={handleUpdateName}
      onUpdateData={handleUpdateData}
      />
      </div>
      <button className="export-button" onClick={handleExport}>
        Export
      </button>
        {JSON.parse(exportedJSON)?.children.length>0  && <button className="copy-button" onClick={copyToClipboard}>
            Copy
        </button>}
      {JSON.parse(exportedJSON)?.children.length>0  && <div className="exported-json">
        <h3>Products Data</h3>
       <h4><ReactJson
          data={JSON.parse(exportedJSON)}
          theme="monikai" /></h4>
      </div>}
      <br />
      <br />
    </div>
  );
};

export default App;
