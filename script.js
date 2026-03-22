const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const chatDemoBody = document.getElementById("chat-demo-body");
const chatDemoForm = document.getElementById("chat-demo-form");
const chatDemoInput = document.getElementById("chat-demo-input");
const chatDemoStatus = document.getElementById("chat-demo-status");
const chatDemoAvatar = document.getElementById("chat-demo-avatar");
const chatDemoButtons = Array.from(document.querySelectorAll("[data-chat-action]"));

if (chatDemoBody && chatDemoForm && chatDemoInput && chatDemoStatus && chatDemoAvatar && chatDemoButtons.length) {
  let chatDemoState = "greeting";
  let chatDemoTimer = null;

  function scrollChatDemo() {
    chatDemoBody.scrollTop = chatDemoBody.scrollHeight;
  }

  function setChatDemoStatus(mode) {
    chatDemoStatus.className = "chat-demo-status";

    if (mode === "thinking") {
      chatDemoStatus.classList.add("is-thinking");
      chatDemoStatus.textContent = "Thinking";
      return;
    }

    if (mode === "lost-link") {
      chatDemoStatus.classList.add("is-lost");
      chatDemoStatus.textContent = "Connection lost";
      return;
    }

    chatDemoStatus.textContent = "Online";
  }

  function setChatDemoAvatar(mode) {
    chatDemoAvatar.className = "chat-demo-avatar";

    if (mode === "thinking") {
      chatDemoAvatar.classList.add("is-thinking");
      return;
    }

    if (mode === "lost-link") {
      chatDemoAvatar.classList.add("is-lost");
      return;
    }

    chatDemoAvatar.classList.add("is-greeting");
  }

  function clearChatDemoTimer() {
    if (chatDemoTimer) {
      window.clearTimeout(chatDemoTimer);
      chatDemoTimer = null;
    }
  }

  function setActiveChatDemoButton(action) {
    chatDemoButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.chatAction === action);
    });
  }

  function addChatDemoMessage(role, content, isTyping = false) {
    const item = document.createElement("div");
    item.className = `chat-demo-message ${role}`;

    if (isTyping) {
      item.innerHTML = '<span class="chat-demo-typing"><span></span><span></span><span></span></span>';
    } else {
      item.textContent = content;
    }

    chatDemoBody.appendChild(item);
    scrollChatDemo();
    return item;
  }

  function getChatDemoReply(message) {
    const value = message.toLowerCase();

    if (value.includes("project")) {
      return "Featured work highlights an AI chatbot system built for production use, real-time support, and long-term maintenance.";
    }

    if (value.includes("research")) {
      return "The research direction focuses on practical NLP, chatbot behavior, retrieval workflows, and deployable language systems.";
    }

    if (value.includes("contact")) {
      return "Visitors can reach out through email, GitHub, or LinkedIn in the contact section of this portfolio.";
    }

    return "This is a local demo response. The UI is ready for interaction, while the backend API can be connected later if needed.";
  }

  function triggerGreetingDemo() {
    chatDemoState = "greeting";
    clearChatDemoTimer();
    setChatDemoStatus("greeting");
    setChatDemoAvatar("greeting");
    addChatDemoMessage("bot", "Xin chao. I am in greeting mode and ready to introduce the portfolio experience.");
  }

  function triggerThinkingDemo(sourceMessage) {
    chatDemoState = "thinking";
    clearChatDemoTimer();
    setChatDemoStatus("thinking");
    setChatDemoAvatar("thinking");
    const typingNode = addChatDemoMessage("bot", "", true);

    chatDemoTimer = window.setTimeout(() => {
      typingNode.remove();
      chatDemoState = "greeting";
      setChatDemoStatus("greeting");
      setChatDemoAvatar("greeting");
      addChatDemoMessage(
        "bot",
        sourceMessage
          ? getChatDemoReply(sourceMessage)
          : "This simulates the thinking state before the assistant sends a response."
      );
    }, 1200);
  }

  function triggerLostLinkDemo() {
    chatDemoState = "lost-link";
    clearChatDemoTimer();
    setChatDemoStatus("lost-link");
    setChatDemoAvatar("lost-link");
    addChatDemoMessage("bot", "Connection lost demo enabled. The component stays interactive, but it does not call any live API.");
  }

  chatDemoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.chatAction;
      setActiveChatDemoButton(action);

      if (action === "greeting") {
        triggerGreetingDemo();
        return;
      }

      if (action === "thinking") {
        triggerThinkingDemo();
        return;
      }

      triggerLostLinkDemo();
    });
  });

  chatDemoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = chatDemoInput.value.trim();
    if (!message) {
      return;
    }

    addChatDemoMessage("user", message);
    chatDemoInput.value = "";

    if (chatDemoState === "lost-link") {
      addChatDemoMessage("bot", "The widget is currently showing the lost link state. Switch back to Greeting or Thinking to continue the demo.");
      return;
    }

    triggerThinkingDemo(message);
  });

  setChatDemoStatus("greeting");
  setChatDemoAvatar("greeting");
}
