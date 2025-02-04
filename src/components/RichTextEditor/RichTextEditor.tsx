import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";
import { useSpring, animated } from "react-spring";

const RichTextEditor = () => {
  const [content, setContent] = useState(() => {
    return localStorage.getItem("userData") || "";
  });

  const editorAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: {
      tension: 280,
      friction: 20,
      mass: 1
    }
  });

  useEffect(() => {
    localStorage.setItem("richTextContent", content);
  }, [content]);

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <animated.div className="text-editor-container" style={editorAnimation}>
      <h2>Rich Text Editor</h2>
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        className="text-editor"
      />
    </animated.div>
  );
};

RichTextEditor.modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

RichTextEditor.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
];

export default RichTextEditor;