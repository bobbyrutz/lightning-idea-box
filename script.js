const form = document.getElementById("ideaForm");
const input = document.getElementById("ideaInput");
const list = document.getElementById("ideaList");


const SERVER_URL = "https://lightning-idea-box.onrender.com";

// Load saved ideas from the server
async function loadIdeas() {
  try {
    const res = await fetch(`${SERVER_URL}/ideas`);
    const data = await res.json();
    list.innerHTML = "";
    data.forEach((idea) => {
      const li = document.createElement("li");
      li.textContent = idea;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading ideas:", err);
  }
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const idea = input.value.trim();

  if (!idea) {
    input.focus();
    return;
  }

  try {
    await fetch(`${SERVER_URL}/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idea }),
    });

    input.value = "";
    input.focus(); // 👈 THIS SHOULD NOW WORK
    await loadIdeas();
  } catch (err) {
    console.error("Error saving idea:", err);
    input.focus(); // try to refocus even on failure
  }
});

// Initial load
window.addEventListener("DOMContentLoaded", () => {
  input.focus(); // 👈 Focus when page loads too!
  loadIdeas();
});
