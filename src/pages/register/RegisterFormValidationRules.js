export default function validate(values) {
  let errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (localStorage.getItem('users')) {
    let jsonUsers = localStorage.getItem('users');
    for (let user in jsonUsers) {
      if (user['emailId'] === values.email) {
        errors.email = 'Email Id already exists';
      }
    }
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  } else if (!isStrongPassword(values.password)) {
    errors.password = 'Password is weak. It must contain at least one uppercase letter,\none lowercase letter, one number, and one special character.';
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password does not match';
  }

  return errors;
};

function isStrongPassword(password) {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  const hasUppercase = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);

  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}