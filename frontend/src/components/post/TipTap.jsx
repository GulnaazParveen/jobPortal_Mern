// import React from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Underline from "@tiptap/extension-underline";
// // define your extension array
// const extensions = [
//     StarterKit,
//     Underline
// ]
// const content = "";

// const TipTap = ({ onEditorContentSave }) => {
//   const editor = useEditor({
//     extensions,
//     content,
//   });
//   if (!editor) {
//     return null;
//   }
//   const handleEditorContent = () => {
//     const html = editor.getHTML();
//     // first take fucntion from parents then paas data child to paraent with props
//     // console.log(html);
//     onEditorContentSave(html)
//   };
//   return (
//     <div>
//       <div>
//         <button type="button"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           disabled={!editor.can().chain().focus().toggleBold().run()}
//           className={editor.isActive("bold") ? "is-active" : ""}
//         >
//           <strong>B</strong>
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           disabled={!editor.can().chain().focus().toggleItalic().run()}
//           className={editor.isActive("italic") ? "is-active" : ""}
//         >
//           <em>I</em>
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           className={editor.isActive("underline") ? "is-active" : ""}
//         >
//           <u>U</u>
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           disabled={!editor.can().chain().focus().toggleStrike().run()}
//           className={editor.isActive("strike") ? "is-active" : ""}
//         >
//           <s>S</s>
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().toggleCode().run()}
//           disabled={!editor.can().chain().focus().toggleCode().run()}
//           className={editor.isActive("code") ? "is-active" : ""}
//         >
//           Code
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().setParagraph().run()}
//           className={editor.isActive("paragraph") ? "is-active" : ""}
//         >
//           P
//         </button>
//         <button type="button"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 1 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 1 }) ? "is-active" : ""
//           }
//         >
//           H1
//         </button>
//         <button type="button"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 2 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 2 }) ? "is-active" : ""
//           }
//         >
//           H2
//         </button>
//         <button type="button"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 3 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 3 }) ? "is-active" : ""
//           }
//         >
//           H3
//         </button>
//         <button type="button"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 4 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 4 }) ? "is-active" : ""
//           }
//         >
//           H4
//         </button>
//         <button type="button"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 5 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 5 }) ? "is-active" : ""
//           }
//         >
//           H5
//         </button>
//         <button type="button"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 6 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 6 }) ? "is-active" : ""
//           }
//         >
//           H6
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={editor.isActive("bulletList") ? "is-active" : ""}
//         >
//           ul
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={editor.isActive("orderedList") ? "is-active" : ""}
//         >
//           ol
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//           className={editor.isActive("codeBlock") ? "is-active" : ""}
//         >
//           Code block
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().toggleBlockquote().run()}
//           className={editor.isActive("blockquote") ? "is-active" : ""}
//         >
//           bq
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().undo().run()}
//           disabled={!editor.can().chain().focus().undo().run()}
//         >
//           undo
//         </button>
//         <button type="button"
//           onClick={() => editor.chain().focus().redo().run()}
//           disabled={!editor.can().chain().focus().redo().run()}
//         >
//           redo
//         </button>
//       </div>
//       <div>
//         {" "}
//         <EditorContent editor={editor} />
//       </div>
//       <button type="button" onClick={handleEditorContent}>save</button>
//     </div>
//   );
// };

// export default TipTap

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
