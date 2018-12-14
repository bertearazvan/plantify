const form1 = document.querySelector("#form1");
const form2 = document.querySelector("#form2");
let buttonLogin = document.getElementById("loginButton");
let buttonSignUp = document.getElementById("signUpButton");
let loginButtonConfirmation = document.getElementById(
  "loginButtonConfirmation"
);

let closeButtonLogin = document.getElementById("closeModalLogin");
let closeButtonSignUp = document.getElementById("closeModalSignUp");

buttonLogin.addEventListener("click", showLoginForm);
buttonSignUp.addEventListener("click", showSignUpForm);
loginButtonConfirmation.addEventListener("click", showLogin);

closeButtonLogin.addEventListener("click", closeLoginForm);
closeButtonSignUp.addEventListener("click", closeSignUpForm);

function showLogin() {
  closeSignUpForm();
  document.getElementById("confirmation").style.display = "none";
  showLoginForm();
}

function showLoginForm() {
  document.getElementById("modalLogin").style.display = "block";
  document.querySelector(".modal").classList.remove("zoomOutUp");
  document.querySelector(".modal").classList.add("zoomIn");
  closeSignUpForm();
}

function showSignUpForm() {
  document.getElementById("modalSignUp").style.display = "block";
  closeLoginForm();
}

function closeLoginForm() {
  document.querySelector(".modal").classList.add("zoomOutUp");
  document.querySelector(".modal").classList.remove("zoomIn");
  document.querySelector(".overlay").classList.add("overlayAnimationOut");
  setTimeout(function() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".overlay").classList.remove("overlayAnimationOut");
  }, 1800);
}

function closeSignUpForm() {
  document.getElementById("modalSignUp").style.display = "none";
}

form2.addEventListener("submit", e => {
  //preventDefault() - means that when the user click submit, the page will not reload automatically

  e.preventDefault();
  console.log(form2.elements);
  //calling function checkUser
  updateUsers(
    form2.elements.email.value,
    form2.elements.firstname.value,
    form2.elements.lastname.value,
    form2.elements.country.value,
    form2.elements.city.value,
    form2.elements.address.value
  );

  function updateUsers(formEmail, firstName, lastName, Country, City, Address) {
    fetch("http://5c04b49cd5f2070013d58166.mockapi.io/users")
      .then(res1 => res1.json())
      .then(userq => {
        var found1 = userq.some(function(d) {
          return d.email == formEmail;
        });

        console.log("sdsds");
        if (found1 === false) {
          const data = {
            email: formEmail,
            firstname: firstName,
            lastname: lastName,
            country: Country,
            city: City,
            address: Address
          };

          setTimeout(function confirmation() {
            console.log("confirmed");
            document.getElementById("modalSignUp").style.display = "none";
            document.getElementById("confirmation").style.display = "block";
          }, 1000);

          fetch("http://5c04b49cd5f2070013d58166.mockapi.io/users", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(res => res.json())
            .then(e => {
              console.log(e);
            });
        } else {
          alert("User already exists! Try another email!");
        }
      });
  }
});

//------------------------add user to database |^----------------------

form1.addEventListener("submit", e => {
  //preventDefault() - means that when the user clicks submit, the page will not reload automatically
  e.preventDefault();
  //calling function checkUser
  checkUser(form1.elements.email.value);
});

let foundUserId = 0;

function checkUser(emailForm) {
  fetch("http://5c04b49cd5f2070013d58166.mockapi.io/users")
    .then(res => res.json())
    .then(user => {
      /*user.forEach(d => {
        if (d.email == emailForm) {
          throw console.log("user found");
          return true;
        } else {
          console.log("user not found");
        }
      }); */

      var found = user.find(function(d) {
        return d.email == emailForm;
      });
      if (found != undefined) {
        console.log(found);
        console.log("You are logged in!");
        closeLoginForm();
        foundUserId = found.id;
        document.getElementById("loginButton").style.display = "none";
        document.querySelector(".overlay").classList.add("overlayAnimationOut");
        document.getElementById("signUpButton").style.display = "none";
        document.getElementById("plantATree").style.display = "inline";
        document.getElementById("yourName").innerHTML = found.firstname;
        document.getElementById("yourName").style.display = "inline";
        console.log(found.id);
      } else {
        alert("incorect username");
      }
    });
}

//---------------------------------------
