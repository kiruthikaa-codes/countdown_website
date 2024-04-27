import React, { useRef } from "react";

const TextEditor = ({ onSubmit }) => {
  const editorRef = useRef(null);

  const handleKeyPress = (event) => {
    // If Enter key is pressed, submit the message
    if (event.key === 'Enter') {
      onSubmit(editorRef.current.innerText);
    }
  };

  const handleColorChange = (color) => {
    // Apply text color to the selected text
    document.execCommand('foreColor', false, color);
  };

  return (
    <div>
      <div
        ref={editorRef}
        contentEditable={true}
        style={{ border: "1px solid #ccc", minHeight: "100px", padding: "10px" }}
        onKeyPress={handleKeyPress}
      ></div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => handleColorChange('red')} style={{ color: 'red' }}>Red</button>
        <button onClick={() => handleColorChange('blue')} style={{ color: 'blue' }}>Blue</button>
        {/* Add more color options as needed */}
      </div>
    </div>
  );
};

export default TextEditor;
