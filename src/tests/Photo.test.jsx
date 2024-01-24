import { test, vi, expect} from 'vitest'
import { render, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import PhotoPage from '../pages/Photo'
import { UserContext } from '../hooks/useAuth' // import your UserContext

test('PhotoPage renders photo data correctly', async () => {
  // Mock the axios.get function to return sample data
  axios.get = vi.fn().mockImplementation((url) => {
    if (url.includes('photos')) {
      return Promise.resolve({ data: { id: 1, title: 'Test Photo', url: 'https://example.com/photo.jpg' } })
    }
  })

  // Mock user context
  const mockUserDetails = { name: 'Test User' }

  // Render the PhotoPage component
  render(
    <UserContext.Provider value={{ userDetails: mockUserDetails }}>
      <MemoryRouter initialEntries={['/photo/1']}>
        <PhotoPage />
      </MemoryRouter>
    </UserContext.Provider>
  )

  // Wait for the async actions to complete
  await waitFor(() => screen.getByText('Test Photo'))

  // Check that the photo data is displayed correctly
  expect(screen.getByText('Test Photo')).toBeInTheDocument()
})