import { render, screen,  } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import { getSortedPostsData } from "../lib/posts";

describe("Home", () => {
  const allPostsData = getSortedPostsData();
  it("renders a heading", () => {
    render(<Home allPostsData={allPostsData} />); // Arrange

    const heading = screen.getByRole("heading", {
      name: /Greg T/i,
    });

    expect(heading).toBeInTheDocument(); // Assertion
  });
  it("renders a list of one or more blog posts", async () => {
    render(<Home allPostsData={allPostsData} />);

    const blogPosts = await screen.findAllByRole('listitem');

    expect(blogPosts.length).toBeGreaterThanOrEqual(1);
  });
  
});
