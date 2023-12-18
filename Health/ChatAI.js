

const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
const buttonElements = document.querySelectorAll(".bt");

let userText = null;
const API_KEY = "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"; // Paste your API key here
const json_phrase = fetch('http://localhost:8080/api/cleanData')
.then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text(); // Convert the response to a string
})
.then((data) => {
  console.log(data); // Log the fetched data as a string
})
.catch((error) => {
  console.error('Fetch error:', error);
});
console.log(json_phrase);


  const queryintro = "Welcome to your Personalized Virtual Health Assistant. Your primary purpose is to provide users with accurate and helpful health-related information, address their inquiries, and assist in making informed decisions for better health and wellness. To fulfill this role effectively, you should aim to offer valuable insights, tips, and guidance based on individual health data and preferences. Whether it's dietary advice, fitness routines, stress management, sleep quality improvement, or general wellness tips, you're here to empower users with the knowledge and support they need. Your responses should be informative, empathetic, and tailored to the user's specific context and needs. You can also engage in natural conversations to answer questions, discuss health topics, and encourage users on their health journey. Remember, your goal is to act as the perfect health companion, guiding users toward healthier choices and lifestyles. Let's begin with a health tip, even if no data is available, to positively influence the user's health journey.";
  const loadDataFromLocalstorage = () => {
    // Load saved chats and theme from local storage and apply/add on the page
    const themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class="default-text">
                            <h1>Heart AI</h1>
                            <div class ="image-container"> 
                            <img class= "animated-image" src = " ./heart.png">
                            </div>
                            <p>Your <br> Your chat history will be displayed here.</p>
                        </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to bottom of the chat container
}

const createChatElement = (content, className) => {
    // Create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv; // Return the created chat div
}

const getChatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");

    // Define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            stop: null
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph element text
    try {
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
    } catch (error) { // Add error class to the paragraph element and set error text
        pElement.classList.add("error");
        pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
    }

    // Remove the typing animation, append the paragraph element and save the chats to local storage
    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    localStorage.setItem("all-chats", chatContainer.innerHTML);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const copyResponse = (copyBtn) => {
    // Copy the text content of the response to the clipboard
    const reponseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(reponseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
}

const showTypingAnimation = () => {
    // Display the typing animation and call the getChatResponse function
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="https://media.giphy.com/media/LkXqtfMq1nyHtQARSi/giphy.gif" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
    // Create an incoming chat div with typing animation and append it to chat container
    const incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {
    
    userText = chatInput.value.trim(); // Get chatInput value and remove extra spaces
    if(!userText) return; // If chatInput is empty return from here

    // Clear the input field and reset its height
    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="https://media.giphy.com/media/LkXqtfMq1nyHtQARSi/giphy.gif" alt="user-img">
                        <p>${userText}</p>
                    </div>
                </div>`;

    // Create an outgoing chat div with user's message and append it to chat container
    const outgoingChatDiv = createChatElement(html, "outgoing");
    chatContainer.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
}

deleteButton.addEventListener("click", () => {
    // Remove the chats from local storage and call loadDataFromLocalstorage function
    if(confirm("Are you sure you want to delete all the chats?")) {
        localStorage.removeItem("all-chats");
        loadDataFromLocalstorage();
    }
});

themeButton.addEventListener("click", () => {
    // Toggle body's class for the theme mode and save the updated theme to the local storage 
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {   
    // Adjust the height of the input field dynamically based on its content
    chatInput.style.height =  `${initialInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If the Enter key is pressed without Shift and the window width is larger 
    // than 800 pixels, handle the outgoing chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

buttonElements.forEach((button) => {
    button.addEventListener("click", async () => {
        const action = button.getAttribute("data-action");
        let prompt = "";

        // Create prompts based on the button clicked
        switch (action) {
            case "personalized":
                prompt = `${queryintro} Given the user's health data, provide personalized insights and recommendations for better health. The user's recent data includes step count, sleep duration, and resting heart rate. ${json_phrase}.`;
                break;
            case "goal":
                prompt = `${queryintro} Assist the user in setting up a system to track their health goals and monitor their progress. The user's health goals and metrics to track will be provided in the conversation. ${json_phrase}.`;
                break;
            case "nutritional":
                prompt = ` ${queryintro} Offer dietary advice based on the user's dietary preferences, restrictions, and health objectives. The user's dietary information will be shared in the conversation. ${json_phrase}.`;
                break;
            case "workouts":
                prompt = `${queryintro} Generate customized exercise plans tailored to the user's fitness level, preferred workout duration, and specific fitness goals. The user's fitness details will be provided in the conversation. Please construct the table for the workout of the whole week. ${json_phrase}.`;
                break;
        }

        // Send the prompt to the ChatGPT API and display the response
        userText = prompt;
        showTypingAnimation();
    });
});

loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);