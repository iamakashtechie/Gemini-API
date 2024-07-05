// chat.js

// Get DOM elements
const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('user-input');

// Function to append a message to the chat window
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to send a message to the Gemini API and get a response
async function sendMessage() {
    // Get the user input value
    const message = userInput.value;

    // Append the user's message to the chat window
    appendMessage(message, 'user');

    // Clear the input field
    userInput.value = '';

    try {
        // Make the API request to the Gemini AI API
        const response = await axios.post('https://api.google.com/gemini/v1/chat', {
            // The request payload
            query: message
        }, {
            // The request headers
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer AIzaSyBYww97oVlFZ5ucWgzerDnzt4Q52pVJIkM` // Replace with your actual API key
            }
        });

        // Get the response message from the Gemini API
        const geminiMessage = response.data.reply;

        // Append the Gemini API's response to the chat window
        appendMessage(geminiMessage, 'gemini');

    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        appendMessage('Sorry, something went wrong. Please try again.', 'gemini');
    }
}
