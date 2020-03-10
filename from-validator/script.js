const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show input error message
showError = (input, message) => {
  // inputs parent element
  const formControl = input.parentElement;
  //manipulate formcontrol class
  formControl.className = "form-control error";
  //select small
  const small = formControl.querySelector("small");
  //change smalls innerText
  small.innerText = message;
};

//show success outline
showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

// check mail is valid
checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())) {
      showSuccess(input);
  } else {
      showError(input, "Email is not valid")
  }
};

//check required fields
checkRequired = inputArr => {
  inputArr.forEach(input => {
      //trim is to trim white spaces
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

//check passwords match
checkPasswordsMatch = (input1, input2) => {
    if(input1.value !== input2.value) {
        showError(input1, "Passwords dont match");
    }
}

//get field name
getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check input length
checkLength = (input, min, max) => {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} cannot be greater than ${max} characters`);
    } else {
        showSuccess(input)
    }
}

// Event listeners
form.addEventListener("submit", function(event) {
  event.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2)
});
