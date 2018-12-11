let formVolunteer = document.getElementById("formVolunteer");

let closeVoluteer = document.getElementById("closeModalVoluteer");

let attendButton = document.getElementById("attendEvents");

let volunteerButton = document.getElementById("volunteerButton");

volunteerButton.addEventListener("click", function() {
  document.getElementById("modalVolunteer").style.display = "block";
});

closeVoluteer.addEventListener("click", function() {
  document.getElementById("modalVolunteer").style.display = "none";
});

attendButton.addEventListener("click", function() {
  document.getElementById("modalVolunteer").style.display = "none";
  document.getElementById("confirmationEvents").style.display = "block";
});

function volunteerExists() {
  document.getElementById("modalVolunteer").style.display = "block";
  document.getElementById("confirmationEvents").style.display = "none";
}

document
  .getElementById("homeButtonEvents")
  .addEventListener("click", function() {
    document.getElementById("confirmationEvents").style.display = "none";
  });

let userVolunteer = true;

formVolunteer.addEventListener("submit", e => {
  e.preventDefault();

  updateVoluteer(userVolunteer);

  function updateVoluteer(volunteerForm) {
    console.log("refresh");
    fetch(
      "http://5c04b49cd5f2070013d58166.mockapi.io/users/" +
        foundUserId +
        "/volunteer"
    )
      .then(res => res.json())
      .then(user => {
        var found3 = user.some(function(d) {
          console.log(d.id);
          return d.voluteer == false || d.id != null;
        });

        console.log("passed through");

        if (found3 === false) {
          console.log("not voluteer");
          const data = {
            volunteer: volunteerForm
          };

          fetch(
            "http://5c04b49cd5f2070013d58166.mockapi.io/users/" +
              foundUserId +
              "/volunteer",
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
          volunteerExists();
          alert("You already attended this event");
        }
      });
  }
});
