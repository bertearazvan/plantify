window.onload = function() {
  let name = document.getElementById("paymentName");
  const cardnumber = document.getElementById("cardnumber");
  const expirationdate = document.getElementById("expiration-date");
  const securitycode = document.getElementById("security-code");

  //from https://codepen.io/ammonious/pen/ZqGeqX

  var cardnumber_mask = new IMask(cardnumber, {
    mask: "0000 0000 0000 0000"
  });

  var expirationdate_mask = new IMask(expirationdate, {
    mask: "MM{ / }YY",
    blocks: {
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12
      },
      YY: {
        mask: IMask.MaskedRange,
        from: 18,
        to: 25
      }
    }
  });
  var securitycode_mask = new IMask(securitycode, {
    mask: "000"
  });

  name.addEventListener("input", function() {
    if (name.value.length == 0) {
      document.getElementById("nameCardSvg").innerHTML = "John Doe";
    } else {
      document.getElementById("nameCardSvg").innerHTML = this.value;
    }
  });

  cardnumber_mask.on("accept", function() {
    if (cardnumber_mask.value.length == 0) {
      document.getElementById("cardNumberSvg").innerHTML =
        "0123 4567 8910 1112";
    } else {
      document.getElementById("cardNumberSvg").innerHTML =
        cardnumber_mask.value;
    }
  });

  expirationdate_mask.on("accept", function() {
    if (expirationdate_mask.value.length == 0) {
      document.getElementById("dateCardSvg").innerHTML = "12/18";
    } else {
      document.getElementById("dateCardSvg").innerHTML =
        expirationdate_mask.value;
    }
  });
};

let paymentButton = document.getElementById("paymentButton");
let closeButtonPayment = document.getElementById("closeModalPayment");
let payButton = document.getElementById("payButton");

let homeButton = document.getElementById("homeButton");

homeButton.addEventListener("click", function() {
  console.log("pressed home button");
  document.getElementById("confirmationPayment").style.display = "none";
});

payButton.addEventListener("click", function() {
  console.log("Show confirmation");
  document.getElementById("confirmationPayment").style.display = "block";
  closePayment();
});

closeButtonPayment.addEventListener("click", closePayment);

function closePayment() {
  console.log("closePayment");
  document.getElementById("formPayment").style.display = "none";
}
