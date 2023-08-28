import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
// import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import { getSortedPostsData } from "../lib/posts";

// jest.mock('next/router', () => jest.requireActual('next-router-mock'));
mockRouter.useParser(createDynamicRouteParser(['/', '/posts/[id]']));
// jest.mock('next/router', () => ({
//   useRouter: jest.fn(), 
  // usePathname: jest.fn().mockReturnValue("/posts/ssg-ssr"),
// }));

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
  it("navigates to another page when clicking on the blog post", async () => {
    // const mockedRouter = {
    //   push: jest.fn(),
    //   pathname: '/',
    // };
    // useRouter.mockReturnValue(mockedRouter);
    render(<Home allPostsData={allPostsData} />);

    expect(mockRouter).toMatchObject({
      pathname: '/',
      query: {}
    });
    // let blogLink = await screen.getAllByRole('listitem');
    // expect(blogLink.length).toBe(2);
    // userEvent.click(screen.getByText('When to Use Static Generation v.s. Server-side Rendering'));
    // expect(mockRouter).toHaveBeenCalled();
    // expect(screen.queryByRole("link", {
    //   name: /Strava/i,
    // })).not.toBeInTheDocument();
    
    mockRouter.push('/posts/ssg-ssr');
    expect(mockRouter).toMatchObject({
      pathname: '/posts/[id]',
      query: { id: 'ssg-ssr' }
    });

  });
});
