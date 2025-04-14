
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
// Import the CSS file for consistent styling
import "./tiptap.css";

// Define your extension array
const extensions = [StarterKit, Underline];
const content = "";

const TipTap = ({ onEditorContentSave }) => {
  const editor = useEditor({
    extensions,
    content, // Start with an empty string if you don't want any default content
    placeholder: "Start typing here...",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onEditorContentSave(html);
    },
  }); 
  
  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="tiptap-toolbar">
        <button type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`tiptap-button ${
            editor.isActive("bold") ? "is-active" : ""
          }`}
        >
          <strong>B</strong>
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`tiptap-button ${
            editor.isActive("italic") ? "is-active" : ""
          }`}
        >
          <em>I</em>
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`tiptap-button ${
            editor.isActive("underline") ? "is-active" : ""
          }`}
        >
          <u>U</u>
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`tiptap-button ${
            editor.isActive("strike") ? "is-active" : ""
          }`}
        >
          <s>S</s>
        </button>
        {/* Add other buttons similarly */}
        <button type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="tiptap-button"
        >
          Undo
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="tiptap-button"
        >
          Redo
        </button>
      </div>
      <div className="tiptap-editor-container">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTap;
