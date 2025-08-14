
function toggleTheme() {
  const body = document.body;
  body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
}
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll("main section").forEach(sec => sec.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.section).classList.add("active");
  });
});
function setPreset(level) {
  const len = document.getElementById("length");
  const up = document.getElementById("uppercase");
  const num = document.getElementById("numbers");
  const sym = document.getElementById("symbols");
  const norep = document.getElementById("noRepeat");
  const out = document.getElementById("output");

  if (level === 'low') {
    len.value = 8; up.checked = false; num.checked = false; sym.checked = false; norep.checked = false;
    out.style.border = "3px solid red";
  } else if (level === 'secure') {
    len.value = 12; up.checked = true; num.checked = true; sym.checked = false; norep.checked = false;
    out.style.border = "3px solid orange";
  } else {
    len.value = 20; up.checked = true; num.checked = true; sym.checked = true; norep.checked = true;
    out.style.border = "3px solid green";
  }
  document.getElementById("valoreLunghezza").textContent = len.value;
  aggiornaBarra();
  aggiornaPassword();
}
function aggiornaBarra() {
  const slider = document.getElementById("length");
  const fill = document.getElementById("sliderFill");
  const val = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  fill.style.width = val + "%";
  document.getElementById("valoreLunghezza").textContent = slider.value;
}
function generaPassword(l, opt) {
  const abc = "abcdefghijklmnopqrstuvwxyz";
  let chars = abc;
  if (opt.uppercase) chars += abc.toUpperCase();
  if (opt.numbers) chars += "0123456789";
  if (opt.symbols) chars += "!@#$%^&*()[]{}<>?";
  let out = "", used = new Set();
  while (out.length < l) {
    const c = chars[Math.floor(Math.random() * chars.length)];
    if (!opt.noRepeat || !used.has(c)) {
      out += c;
      used.add(c);
    }
  }
  return out;
}
function aggiornaPassword() {
  const l = parseInt(document.getElementById("length").value);
  const o = {
    uppercase: document.getElementById("uppercase").checked,
    numbers: document.getElementById("numbers").checked,
    symbols: document.getElementById("symbols").checked,
    noRepeat: document.getElementById("noRepeat").checked
  };
  const p = generaPassword(l, o);
  const out = document.getElementById("output");
  out.value = p;
  out.select(); document.execCommand("copy");
  document.getElementById("copiato").style.opacity = 1;
  setTimeout(() => document.getElementById("copiato").style.opacity = 0, 2000);
}
["length", "uppercase", "numbers", "symbols", "noRepeat"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    aggiornaBarra(); aggiornaPassword();
  });
});
aggiornaBarra();
aggiornaPassword();
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => document.getElementById("ipVal").textContent = data.ip)
  .catch(() => document.getElementById("ipVal").textContent = "Errore");
function calcolaSubnet() {
  const input = document.getElementById("subnetInput").value.trim();
  const match = input.match(/^(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})$/);
  const out = document.getElementById("subnetOutput");
  if (!match) return out.innerHTML = "<p>⚠️ Formato invalido</p>";
  const ip = match[1].split(".").map(Number), cidr = +match[2];
  if (ip.some(o => o < 0 || o > 255) || cidr > 32) return out.innerHTML = "<p>⚠️ IP/CIDR errato</p>";
  const ipNum = ip.reduce((a,b) => (a<<8)+b);
  const mask = cidr === 0 ? 0 : 0xffffffff << (32 - cidr);
  const net = ipNum & mask, bc = net | (~mask >>> 0);
  const toIP = n => [(n>>24)&255,(n>>16)&255,(n>>8)&255,n&255].join(".");
  out.innerHTML = `
    <p><strong>IP:</strong> ${toIP(ipNum)}</p>
    <p><strong>Netmask:</strong> ${toIP(mask)}</p>
    <p><strong>Rete:</strong> ${toIP(net)}</p>
    <p><strong>Broadcast:</strong> ${toIP(bc)}</p>
    ${cidr < 31 ? `<p><strong>Range host:</strong> ${toIP(net+1)} – ${toIP(bc-1)}</p>` : ""}
  `;
}
