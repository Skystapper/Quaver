// Function to validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to handle registration
function register() {
    const usernameInput = document.querySelector('#registerFormContent .input-box:nth-of-type(1) input');
    const emailInput = document.querySelector('#registerFormContent .input-box:nth-of-type(2) input');
    const passwordInput = document.querySelector('#registerFormContent .input-box:nth-of-type(3) input');
    const agreeCheckbox = document.querySelector('#registerFormContent .checkbox1 input[type="checkbox"]');

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Check if username is empty
    if (username === '') {
        alert('Please enter a username.');
        usernameInput.focus();
        return;
    }

    // Check if email is empty or in invalid format
    if (email === '') {
        alert('Please enter an email address.');
        emailInput.focus();
        return;
    } else if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
    }

    // Check if password is empty or too short
    if (password === '') {
        alert('Please enter a password.');
        passwordInput.focus();
        return;
    } else if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        passwordInput.focus();
        return;
    }

    // Check if the terms & conditions checkbox is checked
    if (!agreeCheckbox.checked) {
        alert('Please agree to terms & conditions.');
        return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the provided username already exists
    if (users.some(user => user.username === username)) {
        alert('Username already exists. Please choose another one.');
        return;
    }

    // Add new user to the users array
    users.push({ username: username, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    // Redirect or perform any other actions after successful registration
}

document.querySelector("loggedInUser")



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
