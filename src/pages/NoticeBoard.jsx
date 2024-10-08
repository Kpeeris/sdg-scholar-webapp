import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import db from "../../firebaseFiles/firebaseConfig.js";
// import { useAuth } from "../../firebaseFiles/firebaseAuth.js";
import { collection, query, limit, getDocs, orderBy, startAfter, where, setDoc, doc, Timestamp} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NoticeBoard = () => {
    // const currentUser = useAuth();
    const [notices, setNotices] = useState([]);
    const [lastOnPage, setLastOnPage] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedTag, setSelectedTag] = useState("All");


    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        setNotices([]);
        getAnnouncements();
      }, [selectedTag]);

    const handlePost = async () => {
        
        // if (!currentUser) {
        //     console.error("User is not logged in.");
        //     return;
        // }

        try {
            const creationTime = Timestamp.now();

           // Count the total announcement there are to generate the custom id
            const announcementsRef = collection(db, "announcements");
            const queryToCount = query(announcementsRef);
            const querySnapshot = await getDocs(queryToCount);
            const totalAnnouncements = querySnapshot.size;
            const customDocId = `announcement${totalAnnouncements + 1}`;

            await setDoc(doc(db, "announcements", customDocId), {
              title,
              message,
              category,
              creationTime,
              //author: currentUser.email
            });
      
            console.log("Notice Saved");
          } catch (error) {
            console.error("Could not write to database: ", error);
          }
    }
    
    const getAnnouncements = async (loadMore = false) => {
        setLoading(true);
        try {
                let collectionRef = collection(db, `announcements`);
                //let announcementQuery = query(collectionRef, orderBy("creationTime", "desc"), limit(20));
                let announcementQuery;
                
                // pagination logic
                if (!(loadMore && lastOnPage)) {
                    // this is the first time we are fetching the announcements
                    if (selectedTag == "All") {
                        // Fetch all the announcements
                        announcementQuery = query(collectionRef, orderBy("creationTime", "desc"), limit(20));
                      } else {
                        // Fetch announcements whose category matches the selected tag
                        announcementQuery = query(collectionRef,
                          where("category", "==", selectedTag),
                          orderBy("creationTime", "desc"),
                          limit(20)
                        );
                      }
                    
                } else {
                    // to fetch more announcements
                    if (selectedTag == "All") {
                        announcementQuery = query(
                          collectionRef,
                          orderBy("creationTime", "desc"),
                          startAfter(lastOnPage),
                          limit(20)
                        );
                      } else {
                        announcementQuery = query(
                          collectionRef,
                          where("category", "==", selectedTag), // Filter by selected category
                          orderBy("creationTime", "desc"),
                          startAfter(lastOnPage),
                          limit(20)
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
                    
                    if (collectionSnap.docs.length < 20) {
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
      <ToggleGroup variant="default" size="default" type="single" className="justify-start"
      onValueChange={(value) => {
        if (value && value !== selectedTag){
            setSelectedTag(value);
            setLastOnPage(null);
            setHasMore(true);
        }}}>
          <ToggleGroupItem value="All" className={`bg-orange-100 border-2 ${selectedTag === "All" ? "border-orange-300" : "border-transparent"}
           hover:border-orange-300 text-orange-600 data-[state=on]:border-orange-300`}>All</ToggleGroupItem>
          <ToggleGroupItem value="General" className={`bg-rose-100 border-2 ${selectedTag === "General" ? "border-rose-300" : "border-transparent"}
           hover:border-rose-300 text-rose-600 data-[state=on]:border-rose-300`}>General</ToggleGroupItem>
          <ToggleGroupItem value="Project Initiatives" className={`bg-green-100 border-2 ${selectedTag === "Project Initiatives" ? "border-green-300" : "border-transparent"}
           hover:border-green-300 text-green-600 data-[state=on]:border-green-300`}>Project Initiatives</ToggleGroupItem>
          <ToggleGroupItem value="Quizzes" className={`bg-purple-100 border-2 ${selectedTag === "Quizzes" ? "border-purple-300" : "border-transparent"}
           hover:border-purple-300 text-purple-600 data-[state=on]:border-purple-300`}>Quizzes</ToggleGroupItem>
          <ToggleGroupItem value="SDGs" className={`bg-sky-100 border-2 ${selectedTag === "SDGs" ? "border-sky-300" : "border-transparent"}
           hover:border-sky-300 text-sky-600 data-[state=on]:border-sky-300`}>SDGs</ToggleGroupItem>
      </ToggleGroup>

      <Dialog>
        <DialogTrigger asChild>
          <Button>New Notice</Button>
        </DialogTrigger>
        <DialogContent>
          
            <DialogHeader><DialogTitle className="flex justify-center text-4xl">New Notice</DialogTitle></DialogHeader>
            <DialogDescription></DialogDescription>
            <label htmlFor="title">Title</label>
            <Input placeholder="Write your notice here..." id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>

            <label>Category</label>
            {/* my plan: if they don't select one, write All to the notice.category */}
            <ToggleGroup variant="default" size="default" type="single" className="justify-start" onValueChange={(value) => setCategory(value || "General")}>
                <ToggleGroupItem value="General" className="bg-rose-100 border-2 border-transparent hover:border-rose-300 text-rose-600 data-[state=on]:border-rose-300">General</ToggleGroupItem>
                <ToggleGroupItem value="Project Initiatives" className="bg-green-100 border-2 border-transparent hover:border-green-300 text-green-600 data-[state=on]:border-green-300">Project Initiatives</ToggleGroupItem>
                <ToggleGroupItem value="Quizzes" className="bg-purple-100 border-2 border-transparent hover:border-purple-300 text-purple-600 data-[state=on]:border-purple-300">Quizzes</ToggleGroupItem>
                <ToggleGroupItem value="SDGs" className="bg-sky-100 border-2 border-transparent hover:border-sky-300 text-sky-600 data-[state=on]:border-sky-300">SDGs</ToggleGroupItem>
            </ToggleGroup>

            <label htmlFor="message">Body</label>
            <Input placeholder="Write your notice here..." id="message" value={message} onChange={(e) => setMessage(e.target.value)}/>


            {/* <Button onClick={handlePost}>Post</Button> */}

          <DialogClose asChild>
            <Button onClick={handlePost}>Post</Button>
          </DialogClose>
          
        </DialogContent>
      </Dialog>
     </div>
    
    <div>
        {notices.length > 0 ? (
            <ul className="pl-9 pr-16 list-none space-y-4">
            {notices.map((notice) => (
                <li key={notice.id}>
                <Card className="inline-block w-full">
                    <CardHeader className="flex flex-col items-start">
                        <CardTitle>{notice.title}</CardTitle>
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
                        }`}>
                        {notice.category}
                        </span>
                    </CardHeader>
                    <CardContent>
                        <p>{notice.message}</p>
                    </CardContent>
                </Card>
                </li>
        
            ))}
            </ul>
        ) : !loading && (
        <p className="text-center text-2xl mt-10">No announcements available</p>
        )}
      </div>
       {/* Conditional Rendering of the button for Pagination */}
       {hasMore && (
        <div className="flex justify-center mt-12">
          <Button onClick={() => getAnnouncements(true)} disabled={loading}>{loading ? "Please wait..." : "Show More"}</Button>
        </div>
      )}
  </div>
)}

export default NoticeBoard;
