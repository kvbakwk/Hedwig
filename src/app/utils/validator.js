export const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

export const validatePassword = (password) => {
  const pattern = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9@$!%*#?&]{8,}$/;
  return pattern.test(password);
};

export const validatePasswords = (password1, password2) => {
  return password1 == password2;
};

export const validateFullname = (fullname) => {
  const pattern = /[A-Z][A-Za-z]+\s[A-Z][A-Za-z]+/;
  return pattern.test(fullname);
};
