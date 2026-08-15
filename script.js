const PIN = "7890";


document.addEventListener(
  "DOMContentLoaded",
  function () {

    const button =
      document.getElementById("unlockButton");

    const input =
      document.getElementById("pinInput");


    button.addEventListener(
      "click",
      unlock
    );


    input.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Enter") {
          unlock();
        }

      }
    );

  }
);


function unlock() {

  const input =
    document.getElementById("pinInput");

  const error =
    document.getElementById("error");

  const lockScreen =
    document.getElementById("lockScreen");

  const mainApp =
    document.getElementById("mainApp");


  if (input.value === PIN) {

    error.textContent = "";

    lockScreen.style.display = "none";

    mainApp.style.display = "block";

  } else {

    error.textContent =
      "❌ Incorrect PIN";

    input.value = "";

  }

}
