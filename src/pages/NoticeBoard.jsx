import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import db from "../../firebaseFiles/firebaseConfig.js";
// import { useAuth } from "../../firebaseFiles/firebaseAuth.js";
import {
  collection,
  query,
  limit,
  getDocs,
  orderBy,
  startAfter,
  where,
  addDoc,
  doc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "@/AuthProvider";
//import { Textarea } from "@/components/ui/textarea"

import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import sanitizeHtml from 'sanitize-html';
import parse from "html-react-parser";

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [lastOnPage, setLastOnPage] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedTag, setSelectedTag] = useState("All");
    //const [content, setContent] = useState("");


  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("General");

  const [deletionReload, setDeletionReload] = useState(0);
  const [postReload, setPostReload] = useState(0);

  var modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      //[ { list: "bullet" }],
      ["link"],
      [{ list: "bullet" }]
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
    "bullet",
    "link",
  ];

  const transform = (node) => {
    //console.log(`NAME IS: ${node.name}`)
    if (node.attribs && node.attribs.class) {
      if (node.attribs.class.includes("ql-align-center")) {
        node.attribs.style = {
          ...node.attribs.style,
          textAlign: "center",
        };
      }
      if (node.attribs.class.includes("ql-align-right")) {
        node.attribs.style = {
          ...node.attribs.style,
          textAlign: "right",
        };
      }
      if (node.attribs.class.includes("ql-size-small")) {
        node.attribs.style = {
          ...node.attribs.style,
          fontSize: "0.75em",
        };
      }
      if (node.attribs.class.includes("ql-size-large")) {
        node.attribs.style = {
          ...node.attribs.style,
          fontSize: "2em",
        };
      }
      if (node.attribs.class.includes("ql-size-huge")) {
        node.attribs.style = {
          ...node.attribs.style,
          fontSize: "3em",
        };
      }
      if (node.attribs.class.includes("ql-indent-1")) {
        node.attribs.style = {
          ...node.attribs.style,
          marginLeft: "3em",
        };
      }

      node.attribs.className = node.attribs.class; // Convert class to className
      delete node.attribs.class; // Remove the old class attribute
    }
    if (node.name == "a") {
      node.attribs.style = {
        ...node.attribs.style,
        textDecoration: "underline",
        color: "blue",
      };
    }
    if (node.name == "p" && node.children.length === 1 && node.children[0].name == "br"){
      return <br />
    }
  };
  
  const handleProcedureContentChange = (newContent) => {
    setMessage(newContent);
    console.log("MESSAGE---->", message);
  };

  useEffect(() => {
    setNotices([]);
    getAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag, deletionReload, postReload]);

  // Add these state variables
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState(null);

  // Function to handle opening the confirmation modal
  const handleDeleteConfirm = (id) => {
    setNoticeToDelete(id); // Set the notice to delete
    setDeleteConfirmOpen(true); // Open the confirmation dialog
  };

  // Function to delete the post after confirmation
  const handleDelete = async () => {
    if (!noticeToDelete) return;
    try {
      const docRef = doc(db, "announcements", noticeToDelete);
      await deleteDoc(docRef);
      console.log("Notice deleted successfully");
      setDeleteConfirmOpen(false); // Close the confirmation dialog
      setDeletionReload(deletionReload + 1);
    } catch (e) {
      console.error("Error deleting notice: ", e);
    }
  };
    const { userData, role } = useAuthContext();
      const handlePost = async () => {
        
        try {
            const creationTime = Timestamp.now();

           // Count the total announcement there are to generate the custom id
            const announcementsRef = collection(db, "announcements");
            const queryToCount = query(announcementsRef);
            const querySnapshot = await getDocs(queryToCount);
            const totalAnnouncements = querySnapshot.size;
            
            const customDocId = `announcement${totalAnnouncements + 2}`;
            console.log("the id is: " + customDocId, "total announcments: " + totalAnnouncements);
            
            const authorName = `${userData?.firstName || 'Unauthorised'} ${userData?.lastName || 'User'}`;

            const message2 = sanitizeHtml(message)

            await addDoc(announcementsRef, {
              title,
              message: message2,
              category,
              creationTime,
              author: authorName
            });
            
            setPostReload(postReload + 1);
            console.log("Notice Saved");
          } catch (error) {
            console.error("Could not write to database: ", error);
          } finally {
            setTitle('');
            setMessage('');
            setCategory('General');
          }
    }
    
    const getAnnouncements = async (loadMore = false) => {
        setLoading(true);
        try {
                let collectionRef = collection(db, `announcements`);
                let announcementQuery;
                
                // pagination logic
                if (!(loadMore && lastOnPage)) {
                    // this is the first time we are fetching the announcements
                    if (selectedTag == "All") {
                        // Fetch all the announcements
                        announcementQuery = query(collectionRef, orderBy("creationTime", "desc"), limit(10));
                      } else {
                        // Fetch announcements whose category matches the selected tag
                        announcementQuery = query(collectionRef,
                          where("category", "==", selectedTag),
                          orderBy("creationTime", "desc"),
                          limit(10)
                        );
                      }
                    
                } else {
                    // to fetch more announcements
                    if (selectedTag == "All") {
                        announcementQuery = query(
                          collectionRef,
                          orderBy("creationTime", "desc"),
                          startAfter(lastOnPage),
                          limit(10)
                        );
                      } else {
                        announcementQuery = query(
                          collectionRef,
                          where("category", "==", selectedTag), // Filter by selected category
                          orderBy("creationTime", "desc"),
                          startAfter(lastOnPage),
                          limit(10)
                        );
                      }
                }
                let collectionSnap = await getDocs(announcementQuery);
            
                if (!collectionSnap.empty){
                    const newNotices = collectionSnap.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setNotices((prevNotices) => (loadMore ? [...prevNotices, ...newNotices] : newNotices));

                    
                    let lastNoticePosition = collectionSnap.docs.length - 1;
                    setLastOnPage(collectionSnap.docs[lastNoticePosition]);
                    
                    if (collectionSnap.docs.length < 10) {
                        setHasMore(false);
                    }
                
                } else {
                    setHasMore(false);
                }
          } catch (e) {
            console.error("Error retrieving announcements: ", e);
          }
          setLoading(false);
          return 0;
        };

  return (
    <div>
      <h1 className="pb-10 px-16">Notice Board</h1>

      {/* category selection to filter notices */}
      <div className="px-16 flex items-center justify-between">
        <ToggleGroup
          variant="default"
          size="default"
          type="single"
          className="justify-start"
          onValueChange={(value) => {
            if (value && value !== selectedTag) {
              setSelectedTag(value);
              setLastOnPage(null);
              setHasMore(true);
            }
          }}
        >
          <ToggleGroupItem
            value="All"
            className={`bg-orange-100 border-2 ${
              selectedTag === "All" ? "border-orange-300" : "border-transparent"
            }
           hover:border-orange-300 text-orange-600 data-[state=on]:border-orange-300`}
          >
            All
          </ToggleGroupItem>
          <ToggleGroupItem
            value="General"
            className={`bg-rose-100 border-2 ${
              selectedTag === "General"
                ? "border-rose-300"
                : "border-transparent"
            }
           hover:border-rose-300 text-rose-600 data-[state=on]:border-rose-300`}
          >
            General
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Project Initiatives"
            className={`bg-green-100 border-2 ${
              selectedTag === "Project Initiatives"
                ? "border-green-300"
                : "border-transparent"
            }
           hover:border-green-300 text-green-600 data-[state=on]:border-green-300`}
          >
            Project Initiatives
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Quizzes"
            className={`bg-purple-100 border-2 ${
              selectedTag === "Quizzes"
                ? "border-purple-300"
                : "border-transparent"
            }
           hover:border-purple-300 text-purple-600 data-[state=on]:border-purple-300`}
          >
            Quizzes
          </ToggleGroupItem>
          <ToggleGroupItem
            value="SDGs"
            className={`bg-sky-100 border-2 ${
              selectedTag === "SDGs" ? "border-sky-300" : "border-transparent"
            }
           hover:border-sky-300 text-sky-600 data-[state=on]:border-sky-300`}
          >
            SDGs
          </ToggleGroupItem>
        </ToggleGroup>
      {role === "admin" && (
        <Dialog className="max-w-3xl">
          <DialogTrigger asChild>
            <Button><PencilSquareIcon className="h-6 w-6 text-white" />  New Notice</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-full">
              <DialogHeader><DialogTitle className="flex justify-center text-4xl">Create New Notice</DialogTitle></DialogHeader>
              <div className="p-1">
                <label htmlFor="title">Title</label>
                <Input placeholder="Write your notice here..." id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                {title === '' && <span style={{ color: 'red' }}>please add a title</span>}
                <br/>
                <label>Category</label>
                
                {/* my plan: if they don't select one, write All to the notice.category */}
                <ToggleGroup variant="default" size="default" type="single" className="justify-start" onValueChange={(value) => setCategory(value || "General")}>
                    <ToggleGroupItem value="General" className="bg-rose-100 border-2 border-transparent hover:border-rose-300 text-rose-600 data-[state=on]:border-rose-300">General</ToggleGroupItem>
                    <ToggleGroupItem value="Project Initiatives" className="bg-green-100 border-2 border-transparent hover:border-green-300 text-green-600 data-[state=on]:border-green-300">Project Initiatives</ToggleGroupItem>
                    <ToggleGroupItem value="Quizzes" className="bg-purple-100 border-2 border-transparent hover:border-purple-300 text-purple-600 data-[state=on]:border-purple-300">Quizzes</ToggleGroupItem>
                    <ToggleGroupItem value="SDGs" className="bg-sky-100 border-2 border-transparent hover:border-sky-300 text-sky-600 data-[state=on]:border-sky-300">SDGs</ToggleGroupItem>
                </ToggleGroup>
                <br/>

                {/* <label htmlFor="message">Body</label>
                <Input placeholder="Write your notice here..." id="message" value={message} onChange={(e) => setMessage(e.target.value)}/> */}
                <div className="grid w-full gap-1.5 mb-5">
                  <label htmlFor="message">Body</label>
                  <div className="w-full p-1">
                    <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={message}
                    onChange={handleProcedureContentChange}
                    className="break-all"
                    style={{
                      height: "250px",
                      width: "100%",
                      maxWidth: "100%",
                      whiteSpace: "pre-wrap",
                      overflow: "hidden",
                      paddingTop:"10px",
                      display: "inline-block",
                      paddingBottom:"45px"
                    }}></ReactQuill>
                  </div>
                  
                  {/*<Textarea placeholder="Type your message here." id="message" value={message} onChange={(e) => setMessage(e.target.value)}/>*/}
                </div>
              </div>

            <DialogClose asChild>
              <Button onClick={handlePost} disabled={title === ''}>Post</Button>
            </DialogClose>
            
          </DialogContent>
        </Dialog>
        )}
     </div>
    
    <div>
        {notices.length > 0 ? (
          <ul className="pl-9 pr-16 list-none space-y-4">
            {notices.map((notice) => (
              <li key={notice.id}>
                <Card className="relative inline-block w-full">
                    <CardHeader className="flex flex-col items-start justify-between">
                        <CardTitle>{notice.title}</CardTitle>
                        
          
                        {/* Conditional Rendering of the Delete Button */}
                        {role === "admin" && (
                          <Button
                            className="absolute top-2 right-4 bg-white hover:bg-transparent text-xs py-1 px-2"
                            onClick={() => handleDeleteConfirm(notice.id)}>
                            <TrashIcon className="h-6 w-6 hover:text-red-600 text-gray-700" />
                          </Button>
                        )}
  
                        <CardDescription>{notice.author} &bull; {new Date(notice.creationTime.seconds * 1000).toLocaleString()}</CardDescription>
                        {/* Conditional Rendering of the tag */}
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full w-auto 
                        ${ notice.category === "All"
                            ? "bg-orange-100 text-orange-600"
                            : notice.category === "General"
                            ? "bg-rose-100 text-rose-600"
                            : notice.category === "Project Initiatives"
                            ? "bg-green-100 text-green-600"
                            : notice.category === "Quizzes"
                            ? "bg-purple-100 text-purple-600"
                            : notice.category === "SDGs"
                            ? "bg-sky-100 text-sky-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {notice.category}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p>{notice.message ? parse((notice.message).toString(), {
                    replace: (domNode) => {
                      transform(domNode); // Apply the transformation
                      return domNode; // Return the transformed node
                    },
                  }) : ""}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          !loading && (
            <p className="text-center text-2xl mt-10">
              No announcements available
            </p>
          )
        )}
      </div>
      {/* Conditional Rendering of the button for Pagination */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button onClick={() => getAnnouncements(true)} disabled={loading}>
            {loading ? "Please wait..." : "Show More"}
          </Button>
        </div>
      )}

      {/* Modal for confirming deletion */}
      {role === "admin" && (
        <Dialog open={isDeleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Notice</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this notice?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
              </DialogClose>

              <Button onClick={handleDelete}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
     )}
  </div>
)}

export default NoticeBoard;
