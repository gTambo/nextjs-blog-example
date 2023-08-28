import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router'; // Next.js's useRouter for routing
// import mockRouter from 'next-router-mock';
import Home from "../pages/index";
import "@testing-library/jest-dom";
import { getSortedPostsData } from "../lib/posts";

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  const allPostsData = getSortedPostsData();
  it("renders a heading", () => {
    render(<Home allPostsData={allPostsData} />); // Arrange

    // screen.debug();
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
