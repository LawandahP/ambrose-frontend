// src/pages/LandingPage.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
import LandingPage from '../pages/LandingPage';
import { UserContext } from '../hooks/useAuth';

// Mock the UserContext to simulate user authentication states
const mockUserDetails = {
  name: 'Test User',
  email: 'test@example.com',
  login: 'vader'
};

// Helper function to render LandingPage with context
const renderLandingPageWithContext = (userDetails) => {
  return render(
    <UserContext.Provider value={{ userDetails }}>
      <LandingPage />
    </UserContext.Provider>
  );
};

describe('LandingPage', () => {
  it('does not show login button when user is authenticated', () => {
    renderLandingPageWithContext(mockUserDetails);

    expect(screen.queryByText('Login with Github')).not.toBeInTheDocument();
  });
});