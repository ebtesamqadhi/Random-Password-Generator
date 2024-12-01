const lengthslider = document.querySelector(".pass-length input"),
  option = document.querySelectorAll(".option input"),
  copy = document.querySelector(".input-box span"),
  passwordInput = document.querySelector(".input-box input"),
  passIndicator = document.querySelector(".pass-indicator"),
  generateBtn = document.querySelector(".genertae-btn");

const character = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let staticPassword = "",
    exeDuplicate = false,
    randomPassword = "";
  passLength = lengthslider.value;

  option.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exe-duplicate" && option.id !== "spaces") {
        staticPassword += character[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        exeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (exeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passIndicator.id =
    lengthslider.value <= 8
      ? "weak"
      : lengthslider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerHTML = lengthslider.value;
  generatePassword();
  updatePassIndicator();
};
updateSlider();

const copyPass = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copy.innerText = "Done";
  setTimeout(() => {
    copy.innerText = "Copy";
  }, 1500);
};

lengthslider.addEventListener("input", updateSlider);
copy.addEventListener("click", copyPass);
generateBtn.addEventListener("click", generatePassword);
