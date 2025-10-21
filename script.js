// DOM Elements
const chatWindow = document.getElementById('chat-window');
const statusElement = document.getElementById('status');
const recordBtn = document.getElementById('record-btn');

// State
let isRecording = false;

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert('Sorry, your browser does not support Speech Recognition. Please use Chrome or Edge.');
}

const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;
recognition.interimResults = false;

// ===== UI Functions =====

/**
 * Add a message to the chat window
 * @param {string} sender - Either 'User' or 'AI'
 * @param {string} text - The message content
 */
function addMessage(sender, text) {
    // Remove welcome message if it exists
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    if (sender === 'User') {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('ai-message');
    }
    
    messageDiv.textContent = text;
    
    // Append to chat window
    chatWindow.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ===== Text-to-Speech (TTS) =====

/**
 * Speak the given text using browser's TTS
 * @param {string} text - Text to speak
 */
function speak(text) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Update status while speaking
    utterance.onstart = () => {
        statusElement.textContent = 'AI is speaking...';
    };
    
    utterance.onend = () => {
        statusElement.textContent = 'Click the button to speak';
    };
    
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        statusElement.textContent = 'Error in speech synthesis';
    };
    
    window.speechSynthesis.speak(utterance);
}

// ===== Speech-to-Text (STT) =====

// Handle recording button click
recordBtn.addEventListener('click', () => {
    if (!isRecording) {
        // Start recording
        try {
            recognition.start();
            isRecording = true;
            recordBtn.textContent = 'Stop';
            recordBtn.classList.add('recording');
            statusElement.textContent = 'Listening...';
        } catch (error) {
            console.error('Error starting recognition:', error);
            statusElement.textContent = 'Error: Could not start recording';
        }
    } else {
        // Stop recording
        recognition.stop();
        isRecording = false;
        recordBtn.textContent = 'Speak';
        recordBtn.classList.remove('recording');
        statusElement.textContent = 'Processing...';
    }
});

// Handle speech recognition results
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log('Recognized:', transcript);
    
    // Display user's message
    addMessage('User', transcript);
    
    // Get AI response
    getAIResponse(transcript);
};

// Handle recognition end
recognition.onend = () => {
    isRecording = false;
    recordBtn.textContent = 'Speak';
    recordBtn.classList.remove('recording');
    
    if (statusElement.textContent === 'Listening...') {
        statusElement.textContent = 'Click the button to speak';
    }
};

// Handle recognition errors
recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isRecording = false;
    recordBtn.textContent = 'Speak';
    recordBtn.classList.remove('recording');
    
    let errorMessage = 'Error: ';
    switch (event.error) {
        case 'no-speech':
            errorMessage += 'No speech detected. Please try again.';
            break;
        case 'audio-capture':
            errorMessage += 'Microphone not found or not working.';
            break;
        case 'not-allowed':
            errorMessage += 'Microphone access denied. Please allow microphone access.';
            break;
        default:
            errorMessage += event.error;
    }
    
    statusElement.textContent = errorMessage;
    
    setTimeout(() => {
        statusElement.textContent = 'Click the button to speak';
    }, 3000);
};

// ===== AI Response - Secure Backend API =====

/**
 * Get AI response from our secure backend API
 * @param {string} promptText - User's input text
 */
async function getAIResponse(promptText) {
    statusElement.textContent = 'AI is thinking...';
    
    try {
        // Make API call to our OWN backend endpoint
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                prompt: promptText 
            })
        });
        
        if (!response.ok) {
            throw new Error(`Backend Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Check if the response was successful
        if (data.success && data.response) {
            const aiText = data.response;
            
            // Display AI message
            addMessage('AI', aiText);
            
            // Speak the response
            speak(aiText);
        } else if (data.error) {
            throw new Error(data.error);
        } else {
            throw new Error('Unexpected response format');
        }
        
    } catch (error) {
        console.error('Error calling backend API:', error);
        
        const errorMessage = 'Sorry, I encountered an error. Please try again.';
        addMessage('AI', errorMessage);
        statusElement.textContent = 'Error: ' + error.message;
        
        setTimeout(() => {
            statusElement.textContent = 'Click the button to speak';
        }, 3000);
    }
}
