const actions = document.getElementById("actions");
const card = document.querySelector(".invite-card");

const responseCopy = {
  YES: {
    icon: "💗",
    title: "That made me smile.",
    copy: "Thank you for saying yes. Let's choose a day and a place that feel comfortable for both of us. I'm looking forward to spending that time with you."
  },
  TIME: {
    icon: "🌷",
    title: "Take your time.",
    copy: "Thank you for being honest. There's no rush to decide, and I won't keep asking. Whenever you're ready, we can talk."
  },
  FRIENDS: {
    icon: "🤍",
    title: "Thank you for telling me.",
    copy: "I respect that. Our friendship matters to me, and I won't pressure you to feel differently."
  }
};

actions.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-answer]");
  if (!button || button.disabled) return;

  const answer = button.dataset.answer;
  const endpoint = window.INVITATION_CONFIG?.responseEndpoint?.trim();

  if (!endpoint) {
    showMessage("⚙️", "One setup step remains", "This invitation is in preview mode. The response buttons work visually, but responses are not being saved yet. Follow SETUP.md to connect your private response sheet before sending the link.");
    return;
  }

  actions.querySelectorAll("button").forEach((item) => item.disabled = true);
  button.textContent = "Sending your answer…";

  try {
    const form = new URLSearchParams();
    form.set("answer", answer);
    form.set("source", "date-invitation");
    await fetch(endpoint, { method: "POST", mode: "no-cors", body: form });
    showMessage(responseCopy[answer].icon, responseCopy[answer].title, responseCopy[answer].copy);
  } catch (error) {
    actions.querySelectorAll("button").forEach((item) => item.disabled = false);
    button.textContent = "Please try again";
    alert("Your response couldn't be sent. Please check your connection and try again.");
  }
});

function showMessage(icon, title, copy) {
  card.innerHTML = `
    <div class="topline">THANK YOU FOR BEING HONEST</div>
    <div class="thanks-icon">${icon}</div>
    <h2 class="thanks-title">${title}</h2>
    <p class="thanks-copy">${copy}</p>
    <div class="divider"><span>♡</span></div>
    <p class="subtext">Whatever your answer, it deserves to be respected.</p>
    <div class="footer">MADE WITH CARE <span>✦</span></div>
  `;
}
