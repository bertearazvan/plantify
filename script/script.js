//Function to add box shadow to navigation menu after 10px scroll

window.onscroll = function() {
  if (window.pageYOffset > 10) {
    document.querySelector("nav").classList.add("shadow-anim");
  } else {
    document.querySelector("nav").classList.remove("shadow-anim");
  }
};

//-------------------
