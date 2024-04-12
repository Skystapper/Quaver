
async function login(){
  
    // let folder = e.href.split("/").slice(-1)[0]
    let a = await fetch(`http://127.0.0.1:5500/account.json`)
    let response = await a.json()
    console.log(response.users)
    console.log(response.users[0].email)
    console.log(response.users[0].password)
    let emails = response.users.map(user => user.email);
    let passwords = response.users.map(user => user.password);
    
    console.log(emails, passwords);


   
        // ... (fetching and processing the response)
    
        // Move the event listener registration inside a DOMContentLoaded event listener
        document.addEventListener('DOMContentLoaded', async function() {
            // Select the email input element
            const emailInput = await document.querySelector('.email input[type="text"]');
    
            // Add an event listener to the login form for form submission
            document.querySelector('.login-btn').addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the default form submission
                console.log(emailInput.value);
                const enteredEmail = emailInput.value; // Get the entered email
    
                // Check if the entered email exists in the 'emails' array
                if (emails.includes(enteredEmail)) {
                    // Email exists, perform login logic
                    console.log('Email exists. Perform login logic here.');
                } else {
                    // Email does not exist, show an error message or handle accordingly
                    console.log('Email does not exist. Show error message or handle accordingly.');
                }
            });
        });
   
}


login() 

