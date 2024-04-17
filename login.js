// Function to handle login
function login() {
    const usernameInput = document.querySelector('#loginFormContent .input-box.username input');
    const passwordInput = document.querySelector('#loginFormContent .input-box.password input');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Check if username is empty
    if (username === '') {
        alert('Please enter a username.');
        usernameInput.focus();
        return;
    }

    // Check if password is empty
    if (password === '') {
        alert('Please enter a password.');
        passwordInput.focus();
        return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the provided username and password match any user
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Store the logged-in user's information in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        // Redirect or perform any other actions after successful login
        // For example, you can redirect to index.html here
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password.');
    }
}
