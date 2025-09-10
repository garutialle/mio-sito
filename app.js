// Funzione per mostrare una sezione
function showSection(sectionId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}

// Carica l'IP pubblico da un servizio esterno
async function loadIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    document.getElementById("ip-value").textContent = data.ip;
  } catch (error) {
    document.getElementById("ip-value").textContent = "Errore nel caricamento dell'IP";
  }
}

// Generatore di password semplice
function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById("password-value").textContent = password;
}

// Al caricamento della pagina, mostra subito l'IP
window.addEventListener("load", () => {
  showSection("ip");
  loadIP();
});
