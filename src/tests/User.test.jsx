import { test, expect, vi } from 'vitest'
import { render, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import UserPage from '../pages/User'
import { UserContext } from '../hooks/useAuth';

test('UserPage renders user data correctly', async () => {
  // Mock the axios.get function to return sample data
  axios.get = vi.fn().mockImplementation((url) => {
    if (url.includes('users')) {
      return Promise.resolve({ data: { name: 'Test User' } })
    }
    if (url.includes('albums')) {
      return Promise.resolve({ data: [{ id: 1, title: 'Test Album' }] })
    }
  })

  // Mock user context
  const mockUserDetails = {
    name: 'Test User',
    email: 'test@example.com',
    login: 'vader'
  };

  // Render the UserPage component
  render(
    <UserContext.Provider value={{ userDetails: mockUserDetails }}>
      <MemoryRouter initialEntries={['/user/1']}>
        <UserPage />
      </MemoryRouter>
    </UserContext.Provider>
  )

  // Wait for the async actions to complete
  await waitFor(() => screen.getByText('Test User Albums'))

  // Check that the user data is displayed correctly
  expect(screen.getByText('Test User Albums')).toBeInTheDocument()
  expect(screen.getByText('Test Album')).toBeInTheDocument()
})