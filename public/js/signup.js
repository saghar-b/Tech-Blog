const loginFormHandler = async (event) => {
  event.preventDefault();


  const email = document.querySelector('#email-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (email && password) {
    
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username,email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert('Failed to Sign Up');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', loginFormHandler);
