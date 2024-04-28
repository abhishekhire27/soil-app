import bcrypt from 'bcryptjs-react';

async function comparePasswords(enteredPassword, storedHashedPassword) {
  try {
    return await bcrypt.compare(enteredPassword, storedHashedPassword);
  } catch (error) {
    return false;
  }
}

export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (localStorage.getItem('users')) {
    let isMatched = false;
    let jsonUsers = JSON.parse(localStorage.getItem('users'));
    jsonUsers.forEach(user => {
      if (user['emailId'] === values.email) {
        isMatched = true;
        let passwordMatch = comparePasswords(values.password, user['password']);
        if (!passwordMatch) {
          errors.email = 'Email Id and password does not match';
          return;
        }
      }
    });

    if (!isMatched) {
      errors.email = 'Email Id does not exist';
    }
  }
  else{
    errors.email = 'Email Id does not exist';
  }
 

return errors;
};