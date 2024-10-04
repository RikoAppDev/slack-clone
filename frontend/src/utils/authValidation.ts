export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function validatePassword(
  comparePasswords: boolean,
  password: string,
  passwordRepeated: string | undefined = undefined
): string | null {
  const minLength = 8;
  const hasNumber = /[0-9]/;
  const hasLetter = /[a-zA-Z]/;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;

  if (!password) {
    return 'Password is required';
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  if (!hasNumber.test(password)) {
    return 'Password must contain at least one number';
  }
  if (!hasLetter.test(password)) {
    return 'Password must contain at least one letter';
  }
  if (!hasSymbol.test(password)) {
    return 'Password must contain at least one symbol';
  }
  if (comparePasswords && password != passwordRepeated) {
    return 'Passwords did not match';
  }
  return null;
}

export function validateSignupFormInput(
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
): string | null {
  if (!firstname) {
    return 'First name is required';
  }
  if (!lastname) {
    return 'Last name is required';
  }
  if (!username) {
    return 'Username is required';
  }
  if (!email) {
    return 'Email is required';
  }
  if (!password) {
    return 'Password is required';
  }
  return null;
}

export function validateTermsAndConditions(
  termsAccepted: boolean
): string | null {
  if (!termsAccepted) {
    return 'You must accept the terms and conditions';
  }
  return null;
}

export function validateLoginFormInput(
  email: string,
  password: string
): string | null {
  if (!email) {
    return 'Email is required';
  }
  if (!password) {
    return 'Password is required';
  }
  return null;
}
