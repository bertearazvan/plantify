let donateButton = document.getElementById("donateButton");
let closeDonate = document.getElementById("closeModalDonate");

donateButton.addEventListener("click", function() {
  document.getElementById("modalDonate").style.display = "block";
});

closeDonate.addEventListener("click", closeDonateFunction);

function closeDonateFunction() {
  document.getElementById("modalDonate").style.display = "none";
}

let formDonator = document.getElementById("formDonate");

let buttonSend = document.getElementById("donateFormButton");

let homeButtonDonate = document.getElementById("homeButtonDonate");

homeButtonDonate.addEventListener("click", function() {
  document.getElementById("confirmationEmail").style.display = "none";
});

buttonSend.addEventListener("click", function() {
  document.getElementById("confirmationEmail").style.display = "block";
  closeDonateFunction();
});

var compostNumber = 0;
var seedsNumber = 0;
var toolsNumber = 0;

document.getElementById("compostMinus").addEventListener("click", function() {
  if (compostNumber == 0) {
    compostNumber = 0;
    document.getElementById("compostOption").checked == false;
  }

  if (compostNumber > 0) {
    compostNumber--;
  }

  document.getElementById("compostNumber").innerHTML = compostNumber;
});

document.getElementById("compostPlus").addEventListener("click", function() {
  document.getElementById("compostOption").checked = true;
  compostNumber++;
  document.getElementById("compostNumber").innerHTML = compostNumber;
});

document.getElementById("toolsMinus").addEventListener("click", function() {
  if (toolsNumber == 0) {
    toolsNumber = 0;
    document.getElementById("toolsOption").checked = false;
  }

  if (toolsNumber > 0) {
    toolsNumber--;
  }

  document.getElementById("toolsNumber").innerHTML = toolsNumber;
});

document.getElementById("toolsPlus").addEventListener("click", function() {
  toolsNumber++;
  document.getElementById("toolsOption").checked = true;
  document.getElementById("toolsNumber").innerHTML = toolsNumber;
});

document.getElementById("seedsMinus").addEventListener("click", function() {
  if (seedsNumber == 0) {
    document.getElementById("seedsOption").checked = false;
    seedsNumber = 0;
  }

  if (seedsNumber > 0) {
    seedsNumber--;
  }

  document.getElementById("seedsNumber").innerHTML = seedsNumber;
});

document.getElementById("seedsPlus").addEventListener("click", function() {
  seedsNumber++;
  document.getElementById("seedsOption").checked = true;
  document.getElementById("seedsNumber").innerHTML = seedsNumber;
});

formDonator.addEventListener("submit", e => {
  e.preventDefault();
  console.log("region: " + formDonator.elements.regionsdonation.value);
  console.log("seeds?: " + formDonator.elements.seeds.checked);
  console.log("seeds number: " + seedsNumber);
  console.log("tools?: " + formDonator.elements.tools.checked);
  console.log("tools number: " + toolsNumber);
  console.log("compost?: " + formDonator.elements.compost.checked);
  console.log("compost number: " + compostNumber);

  updateDonator(
    formDonator.elements.regionsdonation.value,
    formDonator.elements.seeds.checked,
    seedsNumber,
    formDonator.elements.tools.checked,
    toolsNumber,
    formDonator.elements.compost.checked,
    compostNumber
  );

  function updateDonator(
    donatorRegion,
    donatorSeeds,
    donatorSeedsNumber,
    donatorTools,
    donatorToolsNumber,
    donatorCompost,
    donatorCompostNumber
  ) {
    const data = {
      region: donatorRegion,
      seeds: donatorSeeds,
      seedsnumber: donatorSeedsNumber,
      tools: donatorTools,
      toolsnumber: donatorToolsNumber,
      fertilizer: donatorCompost,
      fertilizernumber: donatorCompostNumber
    };

    fetch(
      "http://5c04b49cd5f2070013d58166.mockapi.io/users/" +
        foundUserId +
        "/donator",
      {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(e => {
        alert("You donated");
        console.log(e);
      });
  }
});
