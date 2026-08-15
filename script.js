const PIN = "7890";

let apiKeys = JSON.parse(
  localStorage.getItem("keyvault_keys") || "[]"
);


document.addEventListener(
  "DOMContentLoaded",
  function () {

    document
      .getElementById("unlockButton")
      .addEventListener("click", unlock);


    document
      .getElementById("pinInput")
      .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
          unlock();
        }

      });


    document
      .querySelector(".lock-button")
      .addEventListener("click", lockVault);


    document
      .getElementById("addKeyButton")
      .addEventListener(
        "click",
        openAddKey
      );


    document
      .getElementById("saveKeyButton")
      .addEventListener(
        "click",
        saveKey
      );


    document
      .getElementById("cancelKeyButton")
      .addEventListener(
        "click",
        closeAddKey
      );


    document
      .getElementById("searchInput")
      .addEventListener(
        "input",
        renderKeys
      );


    renderKeys();

  }
);


/* UNLOCK */

function unlock() {

  const input =
    document.getElementById("pinInput");

  const error =
    document.getElementById("error");


  if (input.value === PIN) {

    error.textContent = "";

    document
      .getElementById("lockScreen")
      .style.display = "none";

    document
      .getElementById("mainApp")
      .style.display = "block";

    renderKeys();

  } else {

    error.textContent =
      "❌ Incorrect PIN";

    input.value = "";

  }

}


/* LOCK */

function lockVault() {

  document
    .getElementById("mainApp")
    .style.display = "none";

  document
    .getElementById("lockScreen")
    .style.display = "flex";

  document
    .getElementById("pinInput")
    .value = "";

}


/* OPEN ADD PANEL */

function openAddKey() {

  document
    .getElementById("addKeyPanel")
    .style.display = "block";

  document
    .getElementById("addKeyPanel")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* CLOSE ADD PANEL */

function closeAddKey() {

  document
    .getElementById("addKeyPanel")
    .style.display = "none";

}


/* SAVE KEY */

function saveKey() {

  const provider =
    document
      .getElementById("providerInput")
      .value
      .trim();


  const name =
    document
      .getElementById("keyNameInput")
      .value
      .trim();


  const key =
    document
      .getElementById("apiKeyInput")
      .value
      .trim();


  if (!provider || !name || !key) {

    alert(
      "Please fill all fields."
    );

    return;

  }


  apiKeys.push({

    id: Date.now(),

    provider: provider,

    name: name,

    key: key

  });


  localStorage.setItem(
    "keyvault_keys",
    JSON.stringify(apiKeys)
  );


  document
    .getElementById("providerInput")
    .value = "";

  document
    .getElementById("keyNameInput")
    .value = "";

  document
    .getElementById("apiKeyInput")
    .value = "";


  closeAddKey();

  renderKeys();

}


/* RENDER KEYS */

function renderKeys() {

  const container =
    document.getElementById(
      "keysContainer"
    );


  const count =
    document.getElementById(
      "keyCount"
    );


  const search =
    document.getElementById(
      "searchInput"
    ).value.toLowerCase();


  const filtered =
    apiKeys.filter(function(item) {

      return (
        item.provider.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search)
      );

    });


  count.textContent =
    apiKeys.length;


  container.innerHTML = "";


  if (filtered.length === 0) {

    container.innerHTML = `
      <div class="empty-vault">
        <div class="empty-icon">🔑</div>
        <h2>No keys found</h2>
        <p>Add an API key to your vault.</p>
      </div>
    `;

    return;

  }


  filtered.forEach(function(item) {

    const card =
      document.createElement("div");


    card.className =
      "key-card";


    card.innerHTML = `

      <div class="key-info">

        <small>
          ${escapeHTML(item.provider)}
        </small>

        <strong>
          ${escapeHTML(item.name)}
        </strong>

        <div
          class="key-value"
          id="key-${item.id}"
        >
          ••••••••••••••••
        </div>

      </div>


      <div class="key-actions">

        <button
          onclick="toggleKey(${item.id})"
        >
          👁️
        </button>

        <button
          onclick="copyKey(${item.id})"
        >
          📋
        </button>

        <button
          onclick="deleteKey(${item.id})"
        >
          🗑️
        </button>

      </div>

    `;


    container.appendChild(card);

  });

}


/* SHOW / HIDE */

function toggleKey(id) {

  const item =
    apiKeys.find(
      key => key.id === id
    );


  const element =
    document.getElementById(
      "key-" + id
    );


  if (!item || !element) return;


  if (
    element.dataset.visible === "true"
  ) {

    element.textContent =
      "••••••••••••••••";

    element.dataset.visible =
      "false";

  } else {

    element.textContent =
      item.key;

    element.dataset.visible =
      "true";

  }

}


/* COPY */

async function copyKey(id) {

  const item =
    apiKeys.find(
      key => key.id === id
    );


  if (!item) return;


  try {

    await navigator.clipboard.writeText(
      item.key
    );

    alert("✅ API key copied!");

  } catch {

    alert(
      "Clipboard access is unavailable."
    );

  }

}


/* DELETE */

function deleteKey(id) {

  if (
    !confirm("Delete this API key?")
  ) {
    return;
  }


  apiKeys =
    apiKeys.filter(
      key => key.id !== id
    );


  localStorage.setItem(
    "keyvault_keys",
    JSON.stringify(apiKeys)
  );


  renderKeys();

}


/* ESCAPE HTML */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}
