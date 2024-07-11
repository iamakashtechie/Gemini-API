// Import dotenv for local development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // Load environment variables from .env file locally
}

import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";

const API_KEY = process.env.API_KEY; // API_KEY environment variable

const genAI = new GoogleGenerativeAI(API_KEY);
let chat;

async function initializeChat() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 200000,
    },
  });
}

async function sendMessage() {
  const input = document.getElementById("input");
  const msg = input.value.trim(); // Trim input to remove whitespace
  if (msg === "") return; // Exit if input is empty
  input.value = "";

  // Append user message on the right side
  appendUserMessage(msg);

  // Show loading animation on the left side
  showLoadingAnimation();

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = await response.text();

  // Remove loading animation
  removeLoadingAnimation();

  // Append AI response message on the left side
  appendModelMessage(text);
}

function appendUserMessage(text) {
  const chatbox = document.getElementById("chatbox");
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container user";
  const message = document.createElement("div");
  message.className = "message";
  message.textContent = text;
  messageContainer.appendChild(message);
  chatbox.appendChild(messageContainer);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function appendModelMessage(text) {
  const chatbox = document.getElementById("chatbox");
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container model";
  const message = document.createElement("div");
  message.className = "message";
  message.textContent = text;
  messageContainer.appendChild(message);
  chatbox.appendChild(messageContainer);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function showLoadingAnimation() {
  const chatbox = document.getElementById("chatbox");
  const loadingIndicator = document.createElement("div");
  loadingIndicator.className = "loading-indicator";
  loadingIndicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  chatbox.appendChild(loadingIndicator);
}

function removeLoadingAnimation() {
  const chatbox = document.getElementById("chatbox");
  const loadingIndicator = chatbox.querySelector(".loading-indicator");
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}

document.getElementById("sendButton").addEventListener("click", sendMessage);

initializeChat();
