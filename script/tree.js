let formPlant = document.getElementById("formPlant");

let buttonPayTree = document.getElementById("plantFormButton");

let closeFormPlant = document.getElementById("closeModalPlant");

let plantButton = document.getElementById("plantButton");

buttonPayTree.addEventListener("click", goToPayment);

closeFormPlant.addEventListener("click", closeForm);

plantButton.addEventListener("click", function() {
  document.getElementById("modalPlant").style.display = "block";
});

function goToPayment() {
  document.getElementById("formPayment").style.display = "block";
  closeForm();
}

function treeExists() {
  document.getElementById("formPayment").style.display = "none";
  document.getElementById("modalPlant").style.display = "block";
}

function closeForm() {
  document.getElementById("modalPlant").style.display = "none";
}

formPlant.addEventListener("submit", e => {
  e.preventDefault();
  console.log(formPlant.elements.regions.value);
  console.log(formPlant.elements.trees.value);
  console.log(formPlant.elements.plantname.value);

  updateTree(
    formPlant.elements.regions.value,
    formPlant.elements.trees.value,
    formPlant.elements.plantname.value
  );

  function updateTree(treeRegion, treeType, treeName) {
    fetch(
      "http://5c04b49cd5f2070013d58166.mockapi.io/users/" +
        foundUserId +
        "/tree"
    )
      .then(res => res.json())
      .then(user => {
        var found2 = user.some(function(d) {
          console.log(d.id);
          return d.id != null;
        });

        console.log("passed through");

        if (found2 === false) {
          console.log("didn't find");
          const data = {
            name: treeName,
            region: treeRegion,
            type: treeType
          };

          fetch(
            "http://5c04b49cd5f2070013d58166.mockapi.io/users/" +
              foundUserId +
              "/tree",
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
              console.log(e);
            });
        } else {
          treeExists();
          alert("You already planted");
        }
      });
  }
});
