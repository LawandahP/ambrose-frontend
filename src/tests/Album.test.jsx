import { test, vi, expect } from 'vitest'
import { render, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios'
import AlbumPage from '../pages/Album'
import { UserContext } from '../hooks/useAuth';

test('AlbumPage renders photos correctly', async () => {
  // Mock the axios.get function to return sample data
  axios.get = vi.fn().mockImplementation((url) => {
    if (url.includes('albums')) {
      return Promise.resolve({ data: { id: 1, title: 'Test Album' } })
    }
    if (url.includes('photos')) {
      return Promise.resolve({ data: [{ id: 1, albumId: 1, title: 'Test Photo', url: 'https://example.com/photo.jpg' }] })
    }
  })

  // Mock user context
  const mockUserDetails = { name: 'Test User' }

  // Render the AlbumPage component
  render(
    <UserContext.Provider value={{ userDetails: mockUserDetails }}>
      <MemoryRouter initialEntries={['/album/1']}>
        <AlbumPage />
      </MemoryRouter>
    </UserContext.Provider>
  )

  // Wait for the async actions to complete
  await waitFor(() => screen.getByText('Test Album Album Photos'))

  // Check that the album data is displayed correctly
  expect(screen.getByText('Test Album Album Photos')).toBeInTheDocument()
  expect(screen.getByText('Test Photo')).toBeInTheDocument()
})