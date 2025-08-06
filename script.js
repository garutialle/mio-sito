function generaPassword(lunghezza, opzioni) {
  const lettere = "abcdefghijklmnopqrstuvwxyz";
  const lettereMaiuscole = lettere.toUpperCase();
  const numeri = "0123456789";
  const simboli = "!@#$%^&*()_+[]{}<>?/";

  let caratteri = lettere;
  if (opzioni.uppercase) caratteri += lettereMaiuscole;
  if (opzioni.numbers) caratteri += numeri;
  if (opzioni.symbols) caratteri += simboli;

  let password = "";
  for (let i = 0; i < lunghezza; i++) {
    const randIndex = Math.floor(Math.random() * caratteri.length);
    password += caratteri[randIndex];
  }
  return password;
}

document.getElementById("length").addEventListener("input", (e) => {
  document.getElementById("valoreLunghezza").textContent = e.target.value;
});

document.getElementById("genera").addEventListener("click", () => {
  const lunghezza = parseInt(document.getElementById("length").value);
  const opzioni = {
    uppercase: document.getElementById("uppercase").checked,
    numbers: document.getElementById("numbers").checked,
    symbols: document.getElementById("symbols").checked,
  };

  const password = generaPassword(lunghezza, opzioni);
  const output = document.getElementById("output");
  output.value = password;

  // Copia automatica
  output.select();
  document.execCommand("copy");
  document.getElementById("copiato").style.display = "block";
  setTimeout(() => {
    document.getElementById("copiato").style.display = "none";
  }, 1500);
});

