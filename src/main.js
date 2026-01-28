import './style.css'

// DOM Elements
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotFab = document.getElementById('chatbot-fab');
const closeChatBtn = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatOptions = document.getElementById('chat-options');

// State
let isChatOpen = false;
let cart = [];
const menu = [
  { id: 1, name: 'Margherita', price: 12 },
  { id: 2, name: 'Pepperoni', price: 14 },
  { id: 3, name: 'Veggie Supreme', price: 15 },
  { id: 4, name: 'Future Special', price: 18 }
];

// Toggle Chat
function toggleChat() {
  isChatOpen = !isChatOpen;
  if (isChatOpen) {
    chatbotContainer.classList.remove('hidden');
    chatbotFab.classList.add('hidden');
    if (chatMessages.children.length === 0) {
      // Start conversation if empty
      addBotMessage("Hi! I'm Chef Bot. 🍕 How can I help you today?");
      showOptions([
        { label: 'Order Pizza', action: 'showMenu' },
        { label: 'View Locations', action: 'showLocations' },
        { label: 'Support', action: 'contactSupport' }
      ]);
    }
  } else {
    chatbotContainer.classList.add('hidden');
    chatbotFab.classList.remove('hidden');
  }
}

// Event Listeners
chatbotFab.addEventListener('click', toggleChat);
closeChatBtn.addEventListener('click', toggleChat);

// Chat Logic
function addBotMessage(text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message bot';
  msgDiv.innerText = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addUserMessage(text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message user';
  msgDiv.innerText = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showOptions(options) {
  chatOptions.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt.label;
    btn.onclick = () => handleOptionClick(opt);
    chatOptions.appendChild(btn);
  });
}

function handleOptionClick(option) {
  // 1. Add user selection as message
  addUserMessage(option.label);

  // 2. Process action
  setTimeout(() => {
    switch (option.action) {
      case 'showMenu':
        addBotMessage("Here's our menu from the future:");
        const menuOptions = menu.map(item => ({
          label: `${item.name} ($${item.price})`,
          action: 'addToCart',
          payload: item
        }));
        showOptions(menuOptions);
        break;

      case 'addToCart':
        const item = option.payload;
        cart.push(item);
        addBotMessage(`Added ${item.name} to your cart. Yummy choice! 😋`);
        addBotMessage("Would you like anything else?");
        showOptions([
          { label: 'Add more pizza', action: 'showMenu' },
          { label: 'Checkout', action: 'checkout' }
        ]);
        break;

      case 'checkout':
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        addBotMessage(`Your total is $${total}.`);
        addBotMessage("Processing your order with quantum speed... 🚀");
        setTimeout(() => {
          addBotMessage("Order #2077 confirmed! It will materialize at your doorstep in 15 minutes.");
          showOptions([{ label: 'Start Over', action: 'reset' }]);
          cart = [];
        }, 1500);
        break;

      case 'showLocations':
        addBotMessage("We have locations in New York, Tokyo, and Mars Base Alpha.");
        showOptions([{ label: 'Back to Start', action: 'reset' }]);
        break;

      case 'contactSupport':
        addBotMessage("Connecting you to a human... just kidding, I can handle it! (Not really, call 555-PIZZA).");
        showOptions([{ label: 'Back to Start', action: 'reset' }]);
        break;

      case 'reset':
        chatMessages.innerHTML = '';
        addBotMessage("Hi again! Ready for round two?");
        showOptions([
          { label: 'Order Pizza', action: 'showMenu' },
          { label: 'View Locations', action: 'showLocations' }
        ]);
        break;
    }
  }, 500); // Small delay for realism
}

// Order Now Button on Hero
const orderBtn = document.getElementById('order-now-btn');
if (orderBtn) {
  orderBtn.addEventListener('click', () => {
    if (!isChatOpen) toggleChat();
    // Simulate clicking simple order start
    // But better to just open chat
  });
}
