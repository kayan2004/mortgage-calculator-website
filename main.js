var calculateRepayments = (amount, term, rate, type) => {
  let monthlyInterest = rate / 1200;
  let monthlyTerm = term * 12;
  let res = [];
  if (type === "Interest Only") {
    let monthlyPayment = monthlyInterest * amount;
    res[0] = monthlyPayment;
    res[1] = monthlyPayment * monthlyTerm;
    return res;
  } else if (type === "Repayment") {
    let monthlyPayment =
      (amount * (monthlyInterest * Math.pow(1 + monthlyInterest, 360))) /
      (Math.pow(1 + monthlyInterest, 360) - 1);
    return [monthlyPayment, monthlyPayment * monthlyTerm];
  }
};

var errorStateHandler = () => {
  const inputGroups = document.querySelectorAll(".input-group");
  const radioGroups = document.querySelectorAll(".radio-group");

  inputGroups.forEach((inputGroup) => {
    if (inputGroup.querySelector(".child").value === "") {
      inputGroup.classList.add("error-state");
      const sibling = inputGroup.nextElementSibling;
      const spanElement = inputGroup.querySelector(".input-group-text");
      sibling.classList.remove("hidden");
      spanElement.classList.add("span-error-state");
    }
    if (inputGroup.querySelector(".child").value !== "") {
      inputGroup.classList.remove("error-state");
      const sibling = inputGroup.nextElementSibling;
      const spanElement = inputGroup.querySelector(".input-group-text");
      sibling.classList.add("hidden");
      spanElement.classList.remove("span-error-state");
    }
  });

  radioGroups.forEach((radioGroup) => {});
};

var focusStateHandler = () => {
  const inputGroups = document.querySelectorAll(".input-group");
  inputGroups.forEach((inputGroup) => {
    const inputElement = inputGroup.querySelector(".child");
    let spanElement = inputGroup.querySelector(".input-group-text");
    inputElement.addEventListener("focus", () => {
      inputGroup.classList.add("focus");
      spanElement.classList.add("span-focus-state");
    });
    inputElement.addEventListener("blur", () => {
      spanElement.classList.remove("span-focus-state");
      inputGroup.classList.remove("focus");
    });
  });
};

var clearButton = () => {
  let amount = document.getElementById("mortage-amount-input");
  let term = document.getElementById("mortgage-term-input");
  let rate = document.getElementById("interest-rate-input");
  let empty = document.getElementById("empty-results");
  let complete = document.getElementById("completed-results");

  amount.value = "";
  term.value = "";
  rate.value = "";

  const radioButtons = document.querySelectorAll(
    '#radio-container input[type="radio"]'
  );

  radioButtons.forEach((radioButton) => {
    radioButton.checked = false;
  });

  empty.classList.remove("hidden");
  complete.classList.add("hidden");
};

document.addEventListener("DOMContentLoaded", () => {
  let link = document.getElementById("clear-button");
  link.addEventListener("click", () => {
    clearButton();
  });

  let button = document.getElementById("calculate-repayments");
  let form = document.getElementById("radio-container");

  let monthlyPayment = document.getElementById("monthly-payment");
  let total = document.getElementById("total");
  let empty = document.getElementById("empty-results");
  let complete = document.getElementById("completed-results");

  focusStateHandler();
  button.addEventListener("click", () => {
    empty.classList.add("hidden");
    complete.classList.remove("hidden");
    let amount = document.getElementById("mortage-amount-input").value;
    let term = document.getElementById("mortgage-term-input").value;
    let rate = document.getElementById("interest-rate-input").value;

    const optionDivs = form.getElementsByClassName("radio-group");

    let selectedOption;
    for (let i = 0; i < optionDivs.length; i++) {
      const radioButton = optionDivs[i].querySelector('input[type="radio"]');
      if (radioButton && radioButton.checked) {
        selectedOption = radioButton.value;
        break;
      } else {
        let err = document.getElementById("type-error");
        err.classList.remove("hidden");
      }
    }

    errorStateHandler();

    let type = selectedOption;

    res = calculateRepayments(amount, term, rate, type);
    monthlyPayment.innerText = res[0];
    total.innerText = res[1];
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll(
    "#radio-container .radio-group"
  );

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      radioButton.classList.add("hidden");
    }
  });
});
