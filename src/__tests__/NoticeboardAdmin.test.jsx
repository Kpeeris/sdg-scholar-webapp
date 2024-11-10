import { render, screen, waitFor, fireEvent, within, act } from "@testing-library/react";
import NoticeBoard from "../pages/NoticeBoard";
import { getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { it, expect, describe, vi, afterEach} from "vitest";
// import ReactQuill from "react-quill";
// import { addDoc } from "firebase/firestore";

const mockCollectionRef = { id: "announcements" }; // Mock collection reference

// Mock Firestore
vi.mock("firebase/firestore", () => {
  const originalModule = vi.importActual("firebase/firestore");

  return {
    ...originalModule,
    getFirestore: vi.fn(),
    connectFirestoreEmulator: vi.fn(),
    collection: vi.fn(() => mockCollectionRef),
    //collection: vi.fn(),
    query: vi.fn(),
    getDocs: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(), 
    startAfter: vi.fn(),
    addDoc: vi.fn(),
    deleteDoc: vi.fn(),
    doc: vi.fn().mockReturnValue({ id: "test-id" }),
    where: vi.fn(),
    Timestamp: {
      now: vi.fn(() => ({
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0,
      })),
    },
  };
});

// Mock useAuthContext to set a user information
vi.mock("@/AuthProvider", () => ({
  useAuthContext: vi.fn().mockReturnValue({
    userData: { firstName: "Test", lastName: "User" },
    role: "admin",
  }),
}));

// functions that generates mock announcements for testing
const createMockAnnouncements = (category, count, startFrom) => 
  Array.from({ length: count }, (_, index) => ({
  id: `announcement${index + 1 + startFrom}`,
  title: `announcement ${index + 1 + startFrom}`,
  message: `This is the message for announcement ${index + 1}`,
  category: category,
  creationTime: { seconds: Date.now() / 1000 },
  author: `Author ${index + 1}`,
}));

const mockGetDocsResponse = (announcements) => {
  getDocs.mockResolvedValueOnce({
    docs: announcements.map((announcement) => ({
      id: announcement.id,
      data: () => announcement,
    })),
    size: announcements.length,
    empty: announcements.length === 0,
  });
};

const createAnnouncementByCategory = async (category) => {
  const mockAnnouncements = createMockAnnouncements(category, 5, 0);

  mockGetDocsResponse(mockAnnouncements);

  render(<NoticeBoard />);

  // Select the category button
  const categoryToggle = screen.getByText(category);
  fireEvent.click(categoryToggle);

  // Ensure all displayed announcements belong to the specified category
  await waitFor(() => {
    const renderedannouncements = screen.getAllByText(/This is the message for announcement/i);
    expect(renderedannouncements.length).toBe(5);
  });

  // Check each rendered announcement to ensure it has the specified category
  mockAnnouncements.forEach((announcement) => {
    const announcementElement = screen.getByText(announcement.title);
    expect(announcementElement).toBeInTheDocument();

    // get inside each element of the list
    const announcementContainer = announcementElement.closest("li");
    const categoryElement = within(announcementContainer).getByText(category);
    expect(categoryElement).toBeInTheDocument();

    // Print each notice's details for debugging
    // console.log("Notice Details:", {
    //   id: notice.id,
    //   title: notice.title,
    //   message: notice.message,
    //   category: notice.category,
    //   author: notice.author,
    //   creationTime: new Date(notice.creationTime.seconds * 1000).toLocaleString(),
    // });
  });
};

describe("Displaying announcements on the Notice Board appropriately", () => {
  
  // Clear mocks between each test
  afterEach(() => {
    vi.clearAllMocks(); 
  });

  it("should not display the 'Show More' button if there are fewer than 10 announcements", async () => {

    // create sample announcements
    const mockAnnouncements = createMockAnnouncements("General", 9, 0);
    mockGetDocsResponse(mockAnnouncements);
    render(<NoticeBoard />);
    
    await waitFor(() => {
      const announcements = screen.getAllByText(/This is the message for announcement/i);
      expect(announcements.length).toBe(9);
    });
    
    // Ensure the 'Show More' button is not displayed
    const showMoreButton = screen.queryByText("Show More");
    expect(showMoreButton).not.toBeInTheDocument(); // The button should not appear
    });

  it("should display the 'Show More' button if there are more than 10 announcements", async () => {

    // create sample announcements
    const mockAnnouncements = createMockAnnouncements("General", 11, 0);
    mockGetDocsResponse(mockAnnouncements);
    render(<NoticeBoard />);

    await waitFor(() => {
      // Ensure that the announcements are rendered
      const announcements = screen.getAllByText(/This is the message for announcement/i);
      expect(announcements.length).toBeGreaterThan(10);
    });

    // Ensure the 'Show More' button displayed
    const showMoreButton = screen.getByText("Show More");
    expect(showMoreButton).toBeInTheDocument();
  });


  it("should display the remaining announcements after clicking 'Show More' given 16 announcements", async () => {
   
    // create sample announcements
    const initialannouncementsCount = 11;
    const mockInitialannouncements = createMockAnnouncements("General", initialannouncementsCount, 0);
    const mockMoreannouncements = createMockAnnouncements("General", 5, initialannouncementsCount);
    mockGetDocsResponse(mockInitialannouncements);
    mockGetDocsResponse(mockMoreannouncements);
    render(<NoticeBoard />);

    // load the initial 10 announcements
    await waitFor(() => {
      const announcements = screen.getAllByText(/This is the message for announcement/i);
      expect(announcements.length).toBe(11);
    });

    // Ensure the 'Show More' button displayed
    const showMoreButton = screen.getByText("Show More");
    expect(showMoreButton).toBeInTheDocument();

    // Click the 'Show More' button
    await act(async () => {
      fireEvent.click(showMoreButton);
    });

    await waitFor(() => {
      const announcements = screen.getAllByText(/This is the message for announcement/i);
      expect(announcements.length).toBe(16);
    });

    // 'Show More' should not be displayed if there are no more announcements
    const showMoreButtonAfterClick = screen.queryByText("Show More");
    expect(showMoreButtonAfterClick).not.toBeInTheDocument();
  });

});
 
describe("Category Specific Rendering", () => {
  it("should only display announcements of the General category", async () => {
    await createAnnouncementByCategory("General");
  });
  it("should only display announcements of the Project Initiatives category", async () => {
    await createAnnouncementByCategory("Project Initiatives");
  });
  it("should only display announcements of the Quizzes category", async () => {
    await createAnnouncementByCategory("Quizzes");
  });
  it("should only display announcements of the SDGs category", async () => {
    await createAnnouncementByCategory("SDGs");
  });
});



describe("Testing of admin-specific elements and tasks", () => {
  it("should display 'new notice' button", async () => {
    await act(async () => {
      render(<NoticeBoard />);
    });

    // "New Notice" button should be displayed
    const newNoticeButton = screen.getByText("Add Notice");
    expect(newNoticeButton).toBeInTheDocument();

  });
  it("should display 'delete' button", async () => {
      const mockAnnouncements = createMockAnnouncements("General", 1, 0);
      mockGetDocsResponse(mockAnnouncements);

      await act(async () => {
        render(<NoticeBoard />);
      });
  
      await waitFor(() => {
        const announcementTitle = screen.getByText(/This is the message for announcement/i);
        expect(announcementTitle).toBeInTheDocument();
      });

      // delete button should be displayed
      const deleteButton = screen.getByTestId("delete-button");
      expect(deleteButton).toBeInTheDocument();
    });

    it("should delete a single announcement", async () => {
      const mockAnnouncements = createMockAnnouncements("General", 1, 0);
      mockGetDocsResponse(mockAnnouncements);

      await act(async () => {
        render(<NoticeBoard />);
      });

      await waitFor(() => {
        const announcementTitle = screen.getByText("announcement 1");
        expect(announcementTitle).toBeInTheDocument();
      });

      // Simulate clicking the delete button
      const deleteButton = screen.getByTestId("delete-button");
      await act(async () => {
        fireEvent.click(deleteButton);
      });

      // Confirmation dialog should be displayed
      const dialogTitle = screen.getByText("Delete Notice");
      expect(dialogTitle).toBeInTheDocument();

      // Confirm detetion from dialog
      const confirmButton = screen.getByText("Confirm");
      await act(async () => {
        fireEvent.click(confirmButton);
      });

      // Ensure the deleteDoc was called with the correct document reference
      expect(deleteDoc).toHaveBeenCalledWith(expect.objectContaining({ id: "test-id" }));

    });


    // PROBLEM WITH GETTING REACTQUILL
    it("should create a new announcement", async () => {
      await act(async () => {
        render(<NoticeBoard />);
      });
  
  
      // Check that the "New Notice" button is visible to admin
      const newNoticeButton = screen.getByText("Add Notice");
      expect(newNoticeButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(newNoticeButton);
      });

      // check that dialog heading exists
      const dialogTitle = screen.getByText("Add Notice");
      expect(dialogTitle).toBeInTheDocument();

      // fill in the title for the new notice
      const titleInput = screen.getByPlaceholderText("Write your notice here...");
      await act(async () => {
        fireEvent.change(titleInput, { target: { value: "Test Announcement Title" } });
      });

      // select a category for the new notice
      const categoryButtons = screen.getAllByText("General");
      const categoryButton = categoryButtons.find(button => button.getAttribute("role") === "radio"); 
      await act(async () => {
        fireEvent.click(categoryButton);
      });
      
      const postButton = screen.getByText("Post");
      await act(async () => {
        fireEvent.click(postButton);
      });

      expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, {
        title: "Test Announcement Title",
        message: expect.any(String),
        category: "General",
        creationTime: expect.objectContaining({
          seconds: expect.any(Number),
          nanoseconds: expect.any(Number),
        }),
        author: "Test User",
      });
  
    });
});