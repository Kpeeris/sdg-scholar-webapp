import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import { useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "@/AuthProvider";

import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../../firebase/firebaseConfig.js";

import parse from "html-react-parser";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import cityFooter from "/src/assets/images/city_footer.png";
import sanitizeHtml from "sanitize-html";

/**
 * Content page
 * This component is used to display the content of the target and allow the admin to edit the content
 */
const Content = () => {
  const { moduleId } = useParams(); // Capture the module ID from the URL
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [textEditorShow, setTextEditorShow] = useState(false);

  const { role } = useAuthContext();

  let isAdmin = role === "admin";

  const [content, setContent] = useState("");
  const [pulledContent, setPulledContent] = useState("");
  const [databaseError, setDatabaseError] = useState("");

  const storage = getStorage();

  let dbModuleId = moduleId;
  if (moduleId === "a") {
    dbModuleId = "8";
  } else if (moduleId === "b") {
    dbModuleId = "9";
  } else if (moduleId === "c") {
    dbModuleId = "10";
  }

  /**
   * Custom transformation for parsed HTML nodes to adjust styles.
   * @param {Object} node - The HTML node to transform
   */
  const transform = (node) => {
    if (node.attribs) {
      if (typeof node.attribs.style === "string") {
        const styleObject = {};

        node.attribs.style.split(";").forEach((style) => {
          const [key, value] = style.split(":").map((s) => s.trim());
          console.log(`KEY: ${key} AND VALUE: ${value}`);
          if (key && value) {
            // Convert CSS keys to camelCase for React styles (e.g., "font-size" to "fontSize")
            const camelCaseKey = key.replace(/-([a-z])/g, (g) =>
              g[1].toUpperCase()
            );
            styleObject[camelCaseKey] = value;
          }
        });
        node.attribs.style = styleObject;
      } else if (!node.attribs.style && node.attribs.class) {
        node.attribs.style = {};
      }

      if (node.attribs.class) {
        if (node.attribs.class.includes("ql-align-center")) {
          node.attribs.style.textAlign = "center";
        }
        if (node.attribs.class.includes("ql-align-right")) {
          node.attribs.style.textAlign = "right";
        }
        if (node.attribs.class.includes("ql-size-small")) {
          node.attribs.style.fontSize = "0.875em";
        }
        if (node.attribs.class.includes("ql-size-large")) {
          node.attribs.style.fontSize = "1.25em";
        }
        if (node.attribs.class.includes("ql-size-huge")) {
          node.attribs.style.fontSize = "2em";
        }
        if (node.attribs.class.includes("ql-indent-1")) {
          node.attribs.style.marginLeft = "3em";
        }

        delete node.attribs.class; // Remove the old class attribute
      }
      if (node.name == "a") {
        node.attribs.style = { textDecoration: "underline", color: "blue" };
      }
    }

    if (
      node.name == "p" &&
      node.children.length === 1 &&
      node.children[0].name == "br"
    ) {
      console.log("THERE IS A BREAK HERE");
      node = <br />;
    }
  };

  /**
   * Retrieve content from the database from the specified module ID
   * @async
   * @param {string} moduleId - The module ID to retrieve content for
   */
  const getContent = async (moduleId) => {
    try {
      const docRef = doc(db, `quizzes/sdg11t${moduleId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data().content);
        setContent(docSnap.data().content);
        setPulledContent(docSnap.data().content);
      } else {
        console.log("Document does not exist");
      }
    } catch (e) {
      console.error("Error retrieving document: ", e);
      setDatabaseError(e);
    }
  };

  useEffect(() => {
    getContent(dbModuleId);
    console.log(`${content}`);
  }, []);

  //text editor styling credit to https://medium.com/@aalam-info-solutions-llp/how-to-build-a-text-editor-in-react-js-d5c7fdb321ef
  /**
   * Text editor toolbar and format configurations
   * Modules: toolbar options
   * Formats: text formats allosed by ReactQuill
   */
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      //[ { list: "bullet" }],
      ["link", "image"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  /**
   * Handle changes to the content in the text editor
   * @param {string} newContent - The updated content from the text editor
   */
  const handleProcedureContentChange = (newContent) => {
    setContent(newContent);
    console.log("content---->", newContent);
  };

  /**
   * Write content to the database with sanitization
   * @param {string} newContent - The new content to write to the database
   */
  const adminContentWrite = async (newContent) => {
    const docRef = doc(db, `quizzes/sdg11t${dbModuleId}`);
    const writeableContent = sanitizeHtml(newContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),

      allowedSchemes: sanitizeHtml.defaults.allowedSchemes.concat(["data"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        p: ["class", "style"],
        span: ["class", "style"],
        s: ["class", "style"],
        strong: ["class", "style"],
        u: ["class", "style"],
        em: ["class", "style"],
      },
      allowedStyles: {
        "*": {
          color: [/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/],
          fontSize: [/^\d+(\.\d+)?(px|em|%)$/],
          textAlign: [/^left|right|center|justify$/],
        },
      },
    });

    try {
      console.log("doc reference is :  ", docRef);
      await updateDoc(docRef, { content: writeableContent });
      console.log(`WRITING:         ${writeableContent}`);
      console.log("update successful");
    } catch (e) {
      console.error("Error retrieving document: ", e);
    }
  };

  /**
   * Handle to toggle between edit and read mode
   * @param {string} newContent - from editor to be saved
   */
  const handleClick = (newContent) => {
    console.log("NEW CONTENT", newContent);
    setTextEditorShow(false);
    if (newContent) {
      console.log("new content is --->", newContent);
      adminContentWrite(newContent);
    } else {
      console.log("NO NEW CONTENT");
    }
  };

  /**
   * Handle to cancel editing and revert to original content
   */
  const handleCancelClick = () => {
    setTextEditorShow(false);
    setContent(pulledContent);
  };

  /**
   * Retrieve images from Firebase Storage
   * @async
   */
  const retrieveImages = async () => {
    console.log(`${isNaN(Number(dbModuleId))}`);
    try {
      getDownloadURL(
        ref(
          storage,
          `/sdg11/target${dbModuleId}/GOAL_11_TARGET_11.${
            isNaN(Number(moduleId)) ? moduleId.toUpperCase() : dbModuleId
          }.png`
        )
      ).then((url) => {
        setImage1Url(url);
      });
      getDownloadURL(
        ref(
          storage,
          `sdg11/target${dbModuleId}/MC_Target_11.${
            isNaN(Number(moduleId)) ? moduleId.toUpperCase() : dbModuleId
          }.png`
        )
      ).then((url) => {
        console.log(url);
        setImage2Url(url);
      });
    } catch (error) {
      console.error("Error retrieving images:", error);

      // Handling different error types
      if (error.code === "storage/object-not-found") {
        console.error("The file does not exist at the specified path.");
      } else if (error.code === "storage/unauthorized") {
        console.error("User does not have permission to access the file.");
      } else {
        console.error("Unknown error occurred:", error.message);
      }
    }
  };

  useEffect(() => {
    retrieveImages();
  }, []);

  const moduleTitle = `Target 11.${moduleId}`;

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideMenu moduleTitle={moduleTitle} moduleId={moduleId} />
      {databaseError ? (
        <div>
          <Alert variant="destructive">
            <ExclamationCircleIcon className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{databaseError}</AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="ml-[250px]">
          {/* City Footer image */}
          <div className="">
            <img
              src={cityFooter}
              alt="little city"
              className="fixed bottom-0 left-0 z-10 pointer-events-none"
              style={{ marginLeft: "250px", width: "calc(100% - 250px)" }}
            />
          </div>
          {/* Sky background */}
          <div className="fixed h-full w-full ml-[250px] top-0 left-0 z-0 bg-custom-gradient pointer-events-none"></div>

          <div className="py-12 px-16 overflow-auto">
            <div className="flex justify-between">
              {/* Title */}
              {textEditorShow ? (
                <h1> Editing {moduleTitle} Content</h1>
              ) : (
                <h1>{moduleTitle} Content</h1>
              )}
              <br />

              {/* Edit Button */}
              {isAdmin && !textEditorShow ? (
                <Button
                  className="text-lg"
                  onClick={() => setTextEditorShow(true)}
                >
                  <PencilSquareIcon className="h-5 w-5 mr-1 text-white" /> Edit
                  Content
                </Button>
              ) : null}
            </div>
            <br />

            {/* Permanent images relating to the target*/}
            <div className="relative flex">
              <div>
                <img src={image1Url} alt="Image 1" className="h-60" />
              </div>
              <div>
                <img src={image2Url} alt="Image 2" className="h-60" />
              </div>
            </div>
            <br />

            {/* Content */}
            <div className="relative">
              {textEditorShow === false ? (
                // Read mode
                <div className="bg-white rounded-lg mb-32 p-11">
                  {content
                    ? parse(content, {
                        replace: (domNode) => {
                          transform(domNode); // Apply the transformation
                          return domNode; // Return the transformed node
                        },
                      })
                    : null}
                </div>
              ) : (
                // Edit mode
                <div>
                  <div className="bg-white pb-11">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      value={content}
                      onChange={handleProcedureContentChange}
                      style={{
                        height: "400px",
                        maxWidth: "100%",
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                      }}
                    ></ReactQuill>
                  </div>

                  <div className="mb-24 mt-10 space-x-3">
                    <Button
                      onClick={() => {
                        handleClick(content);
                      }}
                    >
                      Publish
                    </Button>

                    <Button
                      onClick={() => {
                        handleCancelClick();
                      }}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
