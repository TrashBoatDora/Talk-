/**
 * Serverless Function: Secure proxy for Google Gemini API
 * This function keeps the API key secure on the backend
 * Deploy on Vercel or Netlify
 */

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    try {
        // Get the user's prompt from request body
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Get API key from environment variable (SECURE)
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY environment variable is not set');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Construct the Gemini API URL
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

        // Construct request body for Gemini API
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: `You are a helpful English conversation partner. The user said: "${prompt}". Please respond naturally and help them practice English. Keep your response conversational and concise (2-3 sentences maximum).`
                        }
                    ]
                }
            ]
        };

        // Make the API call to Google Gemini
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', response.status, errorText);
            return res.status(response.status).json({ 
                error: `Gemini API error: ${response.status}`,
                details: errorText
            });
        }

        // Parse the response
        const data = await response.json();

        // Extract the AI's response text
        if (data.candidates && 
            data.candidates.length > 0 && 
            data.candidates[0].content && 
            data.candidates[0].content.parts && 
            data.candidates[0].content.parts.length > 0) {
            
            const aiText = data.candidates[0].content.parts[0].text;
            
            // Return the AI's response to frontend
            return res.status(200).json({ 
                success: true,
                response: aiText 
            });
        } else {
            console.error('Unexpected Gemini API response structure:', data);
            return res.status(500).json({ 
                error: 'Unexpected API response structure',
                data: data
            });
        }

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
