function getLeetcodeTitle() {
  const selector =
    "div.text-title-large.font-semibold.text-text-primary.dark\\:text-text-primary a";
  console.log("Attempting to select an element with selector:", selector);
  const el = document.querySelector(selector);
  console.log("Selected element:", el);
  const title = (el == null ? void 0 : el.innerText) || "No Title Found";
  console.log("Detected title:", title);
  return title;
}

function sendToBackground(title) {
  if (title !== "No Title Found") {
    console.log("Content script: Sending title to background:", title);
    chrome.runtime.sendMessage({
      action: "setLeetcodeTitle",
      leetcodeTitle: title,
    });
  }
}

function injectFloatingIconWithPopup() {
  if (document.getElementById("leetcode-similar-extension")) return;

  const container = document.createElement("div");
  container.id = "leetcode-similar-extension";
  container.style.position = "fixed";
  container.style.top = "230px";
  container.style.right = "30px";
  container.style.zIndex = "9999";
  container.style.cursor = "pointer";

  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("coin.png");
  icon.style.width = "36px";
  icon.style.height = "36px";
  icon.style.display = "block";

  const hoverBox = document.createElement("div");
  hoverBox.id = "hover-box";
  hoverBox.style.position = "absolute";
  hoverBox.style.top = "44px";
  hoverBox.style.right = "0";
  hoverBox.style.background = "#1e1e1e";
  hoverBox.style.color = "white";
  hoverBox.style.padding = "12px 16px";
  hoverBox.style.border = "1px solid #444";
  hoverBox.style.borderRadius = "8px";
  hoverBox.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.5)";
  hoverBox.style.fontSize = "14px";
  hoverBox.style.display = "none";
  hoverBox.style.minWidth = "220px";

  const title = getLeetcodeTitle(); // Get title from existing function

  // Fetch related data from backend
  fetch(`http://localhost:5001/related?title=${encodeURIComponent(title)}`)
    .then((res) => res.json())
    .then((data) => {
      const related = data?.data;
      if (related && Object.keys(related).length > 0) {
        hoverBox.innerHTML = `<div><strong>Similar Questions:</strong></div><ul style="list-style:none; padding: 8px 0 0 0; margin:0;">`;
        for (const [platform, question] of Object.entries(related)) {
          hoverBox.innerHTML += `<li style="padding: 4px 0;"><a href="${question}" target="_blank" style="color: #4ea1ff; text-decoration: none;">${platform}</a></li>`;
        }
        hoverBox.innerHTML += `</ul>`;
      } else {
        hoverBox.innerHTML = "<div>No similar questions found.</div>";
      }
    })
    .catch((err) => {
      console.error("Failed to fetch related questions:", err);
      hoverBox.innerHTML = "<div>Error loading suggestions.</div>";
    });

  icon.addEventListener("mouseenter", () => {
    hoverBox.style.display = "block";
  });

  container.addEventListener("mouseleave", () => {
    hoverBox.style.display = "none";
  });

  container.appendChild(icon);
  container.appendChild(hoverBox);
  document.body.appendChild(container);
}

function initializeScript() {
  console.log("Content script initialized.");

  const observer = new MutationObserver(() => {
    if (chrome.runtime && chrome.runtime.id) {
      console.log("MutationObserver triggered.");
      const title = getLeetcodeTitle();
      sendToBackground(title);
      injectFloatingIconWithPopup();
    } else {
      console.warn("Extension context invalidated, MutationObserver disconnected.");
      observer.disconnect();
    }
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
    console.log("MutationObserver observing document.body.");
  } else {
    console.warn("document.body not available for MutationObserver.");
  }

  console.log("Running initial check.");
  const initialTitle = getLeetcodeTitle();
  console.log("Initial check - Detected title:", initialTitle);
  if (initialTitle !== "No Title Found") {
    sendToBackground(initialTitle);
    injectFloatingIconWithPopup();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeScript);
  console.log("Waiting for DOMContentLoaded.");
} else {
  initializeScript();
  console.log("DOM already loaded or interactive, initializing immediately.");
}