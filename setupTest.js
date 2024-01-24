// /**setupTest.js */
// import { expect } from 'vitest';
// import matchers from '@testing-library/jest-dom/matchers';

// expect.extend(matchers);


import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'


afterEach(() => {
    cleanup()
})