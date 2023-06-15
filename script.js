const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const sendBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");
const popup = document.querySelector(".popup");

//* showing errors
const showError = (input, msg) => {
  const formBox = input.parentElement;
  const errorMsg = formBox.querySelector(".error-text");

  formBox.classList.add("error");
  errorMsg.textContent = msg; // this show message 'podaj haslo' insied input if will be error
};

//* error removal after correct filling.
const clearError = input => {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
};

//* validations
const checkForm = input => {
  input.forEach(el => {
    if (el.value === "") {
      showError(el, el.placeholder);
    } else {
      clearError(el);
    }
  });
};

//* count validation number of characters
//slice(0,-1); cuts off the colon
const checkLength = (input, min) => {
  if (input.value.length < min) {
    showError(
      input,
      `${input.previousElementSibling.innerText.slice(
        0,
        -1
      )} składa się z min. ${min} znaków `
    );
  }
};

//* check password lenght
const checkPassword = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Hasła do siebie nie pasują.");
  }
};

//* Regex
const checkEmail = email => {
  const re =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  if (re.test(email.value)) {
    clearError(email);
  } else {
    showError(email, "E-mail jest nie poprawny");
  }
};

//* approval of sending the form and counting errors
checkErrors = () => {
  const allInputs = document.querySelectorAll(".form-box");
  let errorCount = 0;

  //counting errors
  allInputs.forEach(el => {
    if (el.classList.contains("error")) {
      errorCount++;
    }
  });

  // add popup
  if (errorCount === 0) {
    popup.classList.add("show-popup");
  }
};

//the input argument from the 'checkform' function holds an array of inputs
//the argumnet el refers to each variable that is in the array
sendBtn.addEventListener("click", e => {
  e.preventDefault();

  checkForm([username, pass, pass2, email]);
  checkLength(username, 3); // (input= username , min= 3)
  checkLength(pass, 8);
  checkPassword(pass, pass2);
  checkEmail(email);
  checkErrors();
});

//* cleaning field
clearBtn.addEventListener("click", e => {
  e.preventDefault();

  [username, pass, pass2, email].forEach(el => {
    el.value = ""; // cleaning fields
    clearError(el); // cleanig errors
  });
});
