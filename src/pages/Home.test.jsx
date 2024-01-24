import { test, vi, expect } from 'vitest'
import { render, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import HomePage from './Home'
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

 
})