import { test, vi, expect } from 'vitest'
import { render, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import HomePage from '../pages/Home'
import { UserContext } from '../hooks/useAuth' // import your UserContext

test('HomePage renders user and album data correctly', async () => {
  // Mock the axios.get function to return sample data
  axios.get = vi.fn().mockImplementation((url) => {
    if (url.includes('users')) {
      return Promise.resolve({ data: [{ id: 1, name: 'Test User' }] })
    }
    if (url.includes('albums')) {
      return Promise.resolve({ data: [{ id: 1, userId: 1, title: 'Test Album' }] })
    }
  })

  // Mock user context
  const mockUserDetails = { name: 'Test User' }

  // Render the HomePage component
  render(
    <UserContext.Provider value={{ userDetails: mockUserDetails }}>
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    </UserContext.Provider>
  )

  // Wait for the async actions to complete
  await waitFor(() => screen.getByText('Welcome, Test User'))

  // Check that the user data is displayed correctly
  expect(screen.getByText('Welcome, Test User')).toBeInTheDocument()
  expect(screen.getByText('Test User')).toBeInTheDocument()
  expect(screen.getByText('1')).toBeInTheDocument() // album count
})