import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
// import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import "@testing-library/jest-dom";
import Layout from "../components/layout";
import Home from "../pages";
import { getSortedPostsData } from "../lib/posts";

mockRouter.useParser(createDynamicRouteParser(['/', '/posts/[id]']));

describe("Router", () => {
    it("navigates to dynamic page", async () => {
        mockRouter.push('/posts/ssg-ssr');
        expect(mockRouter).toMatchObject({
          pathname: '/posts/[id]',
          query: { id: 'ssg-ssr' }
        });
    });
});