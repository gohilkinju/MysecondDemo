// ✅ Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ✅ Password validation (optional for now)
export const isValidPassword = (password) => {
  return password.length >= 6;
};
