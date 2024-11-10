import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
  act,
} from "@testing-library/react";
import NoticeBoard from "../pages/noticeboard/NoticeBoard";
import { getDocs } from "firebase/firestore";
import { it, expect, describe, vi, afterEach } from "vitest";

// Mock Firestore
vi.mock("firebase/firestore", () => {
  const originalModule = vi.importActual("firebase/firestore");

  return {
    ...originalModule,
    getFirestore: vi.fn(),
    connectFirestoreEmulator: vi.fn(),
    collection: vi.fn(),
    query: vi.fn(),
    getDocs: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
    startAfter: vi.fn(),
    where: vi.fn(),
  };
});

// Mock useAuthContext to set a user information
vi.mock("@/AuthProvider", () => ({
  useAuthContext: vi.fn().mockReturnValue({
    userData: { firstName: "Test", lastName: "User" },
    role: "learner",
  }),
}));

// function that generates mock announcements for testing
const createmockAnnouncements = (category, count, startFrom) =>
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

const createAnnouncementsByCategory = async (category) => {
  const mockAnnouncements = createmockAnnouncements(category, 5, 0);

  mockGetDocsResponse(mockAnnouncements);

  render(<NoticeBoard />);

  // Select the category button
  const categoryToggle = screen.getByText(category);
  fireEvent.click(categoryToggle);

  // Ensure all displayed announcements belong to the specified category
  await waitFor(() => {
    const renderedannouncements = screen.getAllByText(
      /This is the message for announcement/i
    );
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
  });
};

describe("Displaying announcements on the Notice Board appropriately", () => {
  // Clear mocks between each test
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not display the 'Show More' button if there are fewer than 10 announcements", async () => {
    // create sample announcements
    const mockAnnouncements = createmockAnnouncements("General", 9, 0);
    mockGetDocsResponse(mockAnnouncements);
    render(<NoticeBoard />);

    await waitFor(() => {
      const announcements = screen.getAllByText(
        /This is the message for announcement/i
      );
      expect(announcements.length).toBe(9); // Ensure 9 announcements are displayed
    });

    // Ensure the 'Show More' button is not displayed
    const showMoreButton = screen.queryByText("Show More");
    expect(showMoreButton).not.toBeInTheDocument();
  });

  it("should display the 'Show More' button if there are more than 10 announcements", async () => {
    // create sample announcements
    const mockAnnouncements = createmockAnnouncements("General", 11, 0);
    mockGetDocsResponse(mockAnnouncements);
    render(<NoticeBoard />);

    await waitFor(() => {
      // Ensure that the announcements are rendered
      const announcements = screen.getAllByText(
        /This is the message for announcement/i
      );
      expect(announcements.length).toBeGreaterThan(10);
    });

    // Ensure the 'Show More' button displayed
    const showMoreButton = screen.getByText("Show More");
    expect(showMoreButton).toBeInTheDocument();
  });

  it("should display the remaining announcements after clicking 'Show More' given 16 announcements", async () => {
    // create sample announcements
    const initialannouncementsCount = 11;
    const mockInitialAnnouncements = createmockAnnouncements(
      "General",
      initialannouncementsCount,
      0
    );
    const mockMoreAnnouncements = createmockAnnouncements(
      "General",
      5,
      initialannouncementsCount
    );
    mockGetDocsResponse(mockInitialAnnouncements);
    mockGetDocsResponse(mockMoreAnnouncements);
    render(<NoticeBoard />);

    // load the initial 10 announcements
    await waitFor(() => {
      const announcements = screen.getAllByText(
        /This is the message for announcement/i
      );
      expect(announcements.length).toBe(11); // Verify that 10 announcements are displayed
    });

    // Ensure the 'Show More' button is in the document and click it
    const showMoreButton = screen.getByText("Show More");
    expect(showMoreButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(showMoreButton);
    });

    await waitFor(() => {
      const announcements = screen.getAllByText(
        /This is the message for announcement/i
      );
      expect(announcements.length).toBe(16);
    });

    // 'Show More' should not be displayed if there are no more announcements
    const showMoreButtonAfterClick = screen.queryByText("Show More");
    expect(showMoreButtonAfterClick).not.toBeInTheDocument();
  });
});

describe("Category Specific Rendering", () => {
  it("should only display announcements of the General category", async () => {
    await createAnnouncementsByCategory("General");
  });
  it("should only display announcements of the Project Initiatives category", async () => {
    await createAnnouncementsByCategory("Project Initiatives");
  });
  it("should only display announcements of the Quizzes category", async () => {
    await createAnnouncementsByCategory("Quizzes");
  });
  it("should only display announcements of the SDGs category", async () => {
    await createAnnouncementsByCategory("SDGs");
  });
});

describe("Should not display admin-related elements", () => {
  it("should not display 'new notice' button", async () => {
    await act(async () => {
      render(<NoticeBoard />);
    });

    const newNoticeButton = screen.queryByTestId("AddNoticeButton");
    expect(newNoticeButton).not.toBeInTheDocument();
  });

  it("should not display 'delete' button", async () => {
    const mockAnnouncements = createmockAnnouncements("General", 1, 0);
    mockGetDocsResponse(mockAnnouncements);

    await act(async () => {
      render(<NoticeBoard />);
    });

    const deleteButton = screen.queryByTestId("delete-button");
    expect(deleteButton).not.toBeInTheDocument();
  });
});
