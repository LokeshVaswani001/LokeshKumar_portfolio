// script.js

function toggleChat() {
  document.getElementById("chatbox")
    .classList.toggle("hidden");
}

// AI CHAT FUNCTION

async function sendMessage() {

  const inputField = document.getElementById("userInput");
  const chatlog = document.getElementById("chatlog");

  const input = inputField.value;

  if (!input) return;

  chatlog.innerHTML += `
    <p><b>You:</b> ${input}</p>
  `;

  inputField.value = "";

  chatlog.innerHTML += `
    <p id="loading"><b>AI:</b> Typing...</p>
  `;

  try {

    const response = await fetch(
      "http://localhost:3000/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_GROQ_API_KEY"
        },

        body: JSON.stringify({

          model: "llama3-8b-8192",

          messages: [

            {
              role: "system",

              content: `
You are an AI assistant for Lokesh Kumar portfolio website.

Keep replies:
- Short
- Professional
- Friendly
- Recruiter-focused
`
            },

            {
              role: "user",
              content: input
            }

          ]
        })
      }
    );

    const data = await response.json();

    document.getElementById("loading").remove();

    chatlog.innerHTML += `
      <p><b>AI:</b> ${data.choices[0].message.content}</p>
    `;

    chatlog.scrollTop = chatlog.scrollHeight;

  }

  catch (error) {

    document.getElementById("loading").remove();

    chatlog.innerHTML += `
      <p><b>AI:</b> Error connecting.</p>
    `;
  }
}
// MOBILE NAVBAR

const menuToggle =
document.getElementById("menu-toggle");

const navLinks =
document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});