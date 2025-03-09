// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        const { token } = await response.json();
        // Store the token (e.g., in localStorage) and redirect the user
        localStorage.setItem('authToken', token);
        window.location.href = '/dashboard.html';
      } else {
        const { message } = await response.json();
        alert(message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  // Registration form submission
  document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
  
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
  
      if (response.ok) {
        alert('User registered successfully!');
        // You can clear the form or redirect the user to the login page
      } else {
        const { message } = await response.json();
        alert(message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  