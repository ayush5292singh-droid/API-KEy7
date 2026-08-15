const PIN = "7890";


document.addEventListener("DOMContentLoaded", function () {

  const pinInput = document.getElementById("pinInput");
  const unlockButton = document.getElementById("unlockButton");

  unlockButton.addEventListener("click", unlock);

  pinInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      unlock();
    }
  });


  /* LOCK BUTTON */

  document
    .querySelector(".lock-button")
    .addEventListener("click", lockVault);


  /* QUICK ACTIONS */

  const actions =
    document.querySelectorAll(".action-card");


  actions[0].addEventListener("click", function () {
    alert("➕ Add API Key\n\nThe API Key Vault will be added in Part 3.");
  });


  actions[1].addEventListener("click", function () {
    document
      .querySelector(".keys-section")
      .scrollIntoView({
        behavior: "smooth"
      });
  });


  actions[2].addEventListener("click", function () {
    alert("💰 Balance\n\nBalance and API usage will be added later.");
  });


  actions[3].addEventListener("click", function () {
    alert("⚙️ Settings\n\nSettings will be added later.");
  });


  /* BOTTOM NAV */

  const nav =
    document.querySelectorAll(".nav-item");


  nav[0].addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  nav[1].addEventListener("click", function () {
    document
      .querySelector(".keys-section")
      .scrollIntoView({
        behavior: "smooth"
      });
  });


  nav[2].addEventListener("click", function () {
    alert("💰 Balance will be added later.");
  });


  nav[3].addEventListener("click", function () {
    alert("⚙️ Settings will be added later.");
  });

});


/* =========================
   UNLOCK
========================= */

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

  } else {

    error.textContent =
      "❌ Incorrect PIN";

    input.value = "";

  }

}


/* =========================
   LOCK
========================= */

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

  document
    .getElementById("error")
    .textContent = "";

}
