const PAGE_URL = window.location.origin; // Get the current origin (protocol + hostname + port)

const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const form = document.querySelector("#form");
const errorText = document.querySelector("#error-text");
const formBtn = document.getElementById('form-btn');

//Regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//Validators
let emailValidation = false;
let passwordValidation = false;

form.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    await axios.post(`${PAGE_URL}/api/login`, user, { withCredentials: true });
    window.location.pathname = `/todos/`;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de error (4xx, 5xx)
      errorText.innerHTML = error.response.data.error;
    } else {
      // Ocurrió un error de red o el servidor no está disponible
      errorText.innerHTML = 'No se pudo conectar. Revisa tu conexión o inténtalo más tarde.';
      console.error('Error de red o de conexión:', error.message);
    }
  }
});

const validation = () => {
  let isEnabled = emailValidation && passwordValidation;
  formBtn.disabled = !isEnabled;
};

emailInput.addEventListener("input", (e) => {
  emailValidation = emailRegex.test(e.target.value);
  validation();
});

passwordInput.addEventListener("input", (e) => {
  passwordValidation = e.target.value.length >= 1;
  validation();
});