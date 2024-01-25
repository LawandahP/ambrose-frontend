
export const logError = (error, additionalInfo) => {
    console.error('Error:', error);
    if (additionalInfo) {
      console.error('Additional Info:', additionalInfo);
    }
    // Here you can add integration with a centralized logging service if needed
  };