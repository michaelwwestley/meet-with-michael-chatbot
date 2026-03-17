const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

let step = "intro";

if (mode === "prayer") step = "decision";
if (mode === "gospel") step = "gospel";
if (mode === "explore") step = "intro";

const chat = document.getElementById("chat");
const quickButtons = document.getElementById("quickButtons");

function addMessage(text, sender="bot") {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function setQuickReplies(options) {
  quickButtons.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => handleInput(opt);
    quickButtons.appendChild(btn);
  });
}

function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";
  handleInput(text);
}

function handleInput(input) {
  let response = "";

  if (step === "intro") {
    response = "Can I ask you something important? Do you believe in God?";
    step = "belief";
    setQuickReplies(["Yes", "No", "Not sure"]);
  }

  else if (step === "belief") {
    response = "Thanks for being honest. Have you ever lied or done something you knew was wrong?";
    step = "law";
    setQuickReplies(["Yes", "Of course", "I'd rather not say"]);
  }

  else if (step === "law") {
    response = "I appreciate your honesty. If God judges by truth, do you think you'd be innocent or guilty?";
    step = "judgment";
    setQuickReplies(["Innocent", "Guilty", "Not sure"]);
  }

  else if (step === "judgment") {
    response = "This is why the message of Jesus matters so much. He took the punishment we deserve so we could be forgiven.";
    step = "gospel";
    setQuickReplies(["Tell me more", "I understand"]);
  }

  else if (step === "gospel") {
    response = "If you turn to Him and trust Him, you can receive forgiveness and new life. Is that something you want?";
    step = "decision";
    setQuickReplies(["Yes", "I'm not ready", "I have questions"]);
  }

  else if (step === "decision") {
    addMessage("This is an important moment.", "bot");

    const btn = document.createElement("button");
    btn.innerText = "Pray to Meet Jesus";
    btn.onclick = () => {
      window.location.href = "https://meetwithmike.org/pages/next-step";
    };

    quickButtons.innerHTML = "";
    quickButtons.appendChild(btn);
    return;
  }

  addMessage(response, "bot");
}

addMessage("Hi, I'm here to talk with you. Let's take this one step at a time.");
handleInput("");
