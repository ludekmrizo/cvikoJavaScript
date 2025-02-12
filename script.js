"use strict";

const updatePrice = () => {
  let priceBasic = Number(document.getElementById("food-select").value);
  let priceWeigth = Number(document.getElementById("quantity").value);
  let price = priceBasic * priceWeigth;

  document.getElementById("base-price").value = price + " Kč";

  let bio = document.getElementById("bio").checked ? price * 0.3 : 0;
  let premium = document.getElementById("premium").checked ? price * 0.5 : 0;
  let unPremium = document.getElementById("low-quality").checked ? price * -0.15 : 0;
  let giftPack = document.getElementById("gift-pack").checked ? 500 : 0;

  price += bio + premium + unPremium + giftPack;

  let deliveryPrice = document.querySelector("input[name='delivery']:checked").value;
  if (deliveryPrice == "10") {
    price += price * 0.1;
  } else if (deliveryPrice == "250") {
    price += 250;
  }

  document.getElementById("total-price").value = price + " Kč";
};

document.getElementById("food-select").addEventListener("change", updatePrice);
document.getElementById("quantity").addEventListener("input", updatePrice);
document.querySelectorAll(".form-check-input").forEach((input) => input.addEventListener("change", updatePrice));

document.getElementById("check-budget").addEventListener("click", () => {
  let total = parseInt(document.getElementById("total-price").value.replace("Kč", "").trim());
  let budget = parseInt(document.getElementById("budget").value);

  if (isNaN(budget) || budget <= 0) {
    document.getElementById("budget-result").textContent = "⚠️ Zadejte platnou částku!";
    document.getElementById("budget-result").classList.add("text-danger");
    return;
  }

  let resultText = budget >= total ? "✅ Váš rozpočet je dostatečný!" : "❌ Váš rozpočet není dostatečný!";
  document.getElementById("budget-result").textContent = resultText;
  document.getElementById("budget-result").classList.toggle("text-danger", budget < total);
  document.getElementById("budget-result").classList.toggle("text-success", budget >= total);
});

// Validace e-mailu
document.getElementById("order-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const email = emailInput.value.trim();

  const emailPattern = /^[a-zA-Z0-9]+$/;

  if (emailPattern.test(email)) {
    emailError.textContent = "✅ E-mail je platný! Neobsahuje speciální znaky 👍";
    emailError.classList.remove("text-danger");
    emailError.classList.add("text-success");
  } else {
    emailError.textContent = "❌ Neplatný e-mail! Obsahuje speciální znaky.";
    emailError.classList.remove("text-success");
    emailError.classList.add("text-danger");
  }
});

window.addEventListener("load", updatePrice);
