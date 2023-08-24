import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { getSortedPostsData } from "../lib/posts";
 
describe('Home', () => {
  const allPostsData = getSortedPostsData();
  it('renders a heading', () => {
    render(<Home allPostsData={allPostsData}/>) // Arrange
 
    const heading = screen.getByRole('heading', {
      name: /Greg T/i,
    }) // Act
 
    expect(heading).toBeInTheDocument()  // Assertion
  })
})