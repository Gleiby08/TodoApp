const PAGE_URL = window.location.origin; // Get the current origin (protocol + hostname + port)

const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const form = document.querySelector("#form");
const errorText = document.querySelector("#error-text");
const formBtn = document.getElementById('form-btn');

//Regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD_LENGTH = 6;

//Validators
let emailValidation = false;
let passwordValidation = false;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formBtn.disabled = true;
  formBtn.textContent = 'Iniciando sesión...';
  errorText.innerHTML = ''; // Limpiar errores previos

  try {
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    await axios.post(`${PAGE_URL}/api/login`, user, { withCredentials: true });
    window.location.pathname = `/todos/`;
  } catch (error) {
    if (error.response) {
      errorText.innerHTML = error.response.data.error;
    } else {
      errorText.innerHTML = 'No se pudo conectar. Revisa tu conexión o inténtalo más tarde.';
      console.error('Error de red o de conexión:', error.message);
    }
  } finally {
    // Se ejecuta tanto si hay éxito como si hay error,
    // pero en caso de éxito, la redirección es casi instantánea.
    formBtn.disabled = false;
    formBtn.textContent = 'Iniciar Sesión';
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
  passwordValidation = e.target.value.length >= MIN_PASSWORD_LENGTH;
  validation();
});