import React, { useState, useEffect } from 'react';
import './DocumentQA.css'; // Ensure you have the necessary CSS for styling

const DocumentQA = () => {
    const [messages, setMessages] = useState([
        { 
            sender: 'assistant', 
            text: 'Welcome to Experential Retail Bot 📱 You\'ve come to the right place! 💬 Ask your queries, I can help you compare and find the perfect device that suits you well🔍✨' 
        },
    ]);
    
    const [inputText, setInputText] = useState('');
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = false;

            rec.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
            };

            rec.onend = () => {
                console.log('Speech recognition service disconnected');
            };

            setRecognition(rec);
        } else {
            console.error('SpeechRecognition not supported in this browser.');
        }
    }, []);

    const samplePrompts = [
        "Which is the best value for money mobile if I want to have a good camera and processor under 50,000 INR?",
        "Which is better, iPhone 12 or Google Pixel 6, if I want good processing power?",
        "Can you compare iPhone 13 and Google Pixel 7?"
    ];

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;
    
        const userMessage = { sender: 'user', text: inputText };
        setMessages([...messages, userMessage]);
    
        fetch('https://us-central1-telehealth-365911.cloudfunctions.net/dashboarddata/copilot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: inputText, 
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handling the response for newline
                const rawText = data.result || 'Sorry, I couldn\'t find an answer.';
                // Remove unwanted symbols
                const filteredText = rawText
                .replace(/[*]/g, '') // Remove asterisks
                .replace(/📱|💬|[\u{1F600}-\u{1F64F}]/gu, ''); // Add more symbols as needed
                const formattedText = filteredText.replace(/\n/g, '<br />');
                const assistantMessage = { sender: 'assistant', text: formattedText };
                setMessages(prevMessages => [...prevMessages, assistantMessage]);
            })
            .catch(error => {
                console.error('Error:', error);
                const assistantMessage = { sender: 'assistant', text: 'Something went wrong. Please try again later.' };
                setMessages(prevMessages => [...prevMessages, assistantMessage]);
            });
    
        setInputText('');
    };
    
    useEffect(() => {
        const chatWindow = document.querySelector('.chat-window');
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, [messages]);

    const startVoiceRecognition = () => {
        if (recognition) {
            recognition.start();
        }
    };

    const handleSamplePromptClick = (prompt) => {
        setInputText(prompt);
        handleSendMessage();
    };

    return (
        <div className="chat-page-container">
            <div className="chat-container">
                <div className="chat-window">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.sender === 'assistant' ? (
                                <div className="assistant-message">
                                    <i className="fas fa-lightbulb assistant-icon"></i>
                                    <span className="assistant-bubble" dangerouslySetInnerHTML={{ __html: msg.text }} />
                                </div>
                            ) : (
                                <div className="user-message">
                                    <i className="fas fa-user-circle user-icon"></i>
                                    <span className="user-bubble">{msg.text}</span>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="sample-prompts">
                        {samplePrompts.map((prompt, index) => (
                            <button 
                                key={index} 
                                className="sample-prompt-button" 
                                onClick={() => handleSamplePromptClick(prompt)}
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="input-section">
                    <input
                        type="text"
                        placeholder="Enter your question here"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
                    />
                    <button onClick={startVoiceRecognition} className="voice-button">
                        <i className="fas fa-microphone"></i>
                    </button>
                    <button onClick={handleSendMessage}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentQA;
