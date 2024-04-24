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

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    } else if (!isStrongPassword(values.password)) {
      errors.password = 'Password is weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }
  
    return errors;
  };
  
  function isStrongPassword(password) {
    // Define regex patterns for various criteria
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  
    // Check if password meets all criteria
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasNumber = numberRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);
  
    // Return true if all criteria are met, false otherwise
    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  }