import React, { useState } from "react";
import "../App.css";

export const TagView = ({
  tag,
  onAddChild,
  onToggleCollapse,
  onUpdateName,
  onUpdateData
}) => {
  const [newChildName, setNewChildName] = useState("New Child");
  const [editingName, setEditingName] = useState(false);

  const isCollapsible = tag.children && tag.children.length > 0;
  const isCollapsed = tag.collapsed;

  return (
    <div className="tag">
      <div className="tag-header">
        {isCollapsible && (
          <button className="collapse-button">
            {isCollapsed ? ">" : "v"}
          </button>
        )}
        {editingName ? (
          <form>
            <input
              type="text"
              value={newChildName}
              autoFocus
            />
          </form>
        ) : (
          <div className="tag-name" >
            {tag.name}
          </div>
        )}
        <button className="add-child-button">
          Add Child
        </button>
      </div>
      {!isCollapsed && (
        <div className="tag-content">
        {tag.data !== undefined && (
          <div className="tag-data">
            <div>
            Data :
            <input
              type="text"
              value={tag.data}
              placeholder="Enter data..."
            />
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};