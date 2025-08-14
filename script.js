
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".section").forEach(s => s.style.display = "none");
    document.getElementById(btn.dataset.section).style.display = "block";
  });
});
function toggleTheme() {
  const body = document.body;
  body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
}
function aggiornaPassword() {
  const len = document.getElementById("length").value;
  const up = document.getElementById("uppercase").checked;
  const num = document.getElementById("numbers").checked;
  const sym = document.getElementById("symbols").checked;
  const norep = document.getElementById("noRepeat").checked;
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const syms = "!@#$%^&*()_+";
  let pool = chars + (up ? upper : "") + (num ? nums : "") + (sym ? syms : "");
  let pass = "";
  while (pass.length < len && pool.length > 0) {
    const char = pool[Math.floor(Math.random() * pool.length)];
    if (norep && pass.includes(char)) continue;
    pass += char;
  }
  document.getElementById("output").value = pass;
  document.getElementById("copiato").style.display = "none";
}
document.getElementById("length").addEventListener("input", () => {
  document.getElementById("valoreLunghezza").textContent = document.getElementById("length").value;
  aggiornaPassword();
});
["uppercase", "numbers", "symbols", "noRepeat"].forEach(id => {
  document.getElementById(id).addEventListener("change", aggiornaPassword);
});
document.getElementById("output").addEventListener("click", () => {
  navigator.clipboard.writeText(document.getElementById("output").value);
  document.getElementById("copiato").style.display = "block";
});
function setPreset(level) {
  const len = document.getElementById("length");
  const up = document.getElementById("uppercase");
  const num = document.getElementById("numbers");
  const sym = document.getElementById("symbols");
  const norep = document.getElementById("noRepeat");
  const output = document.getElementById("output");
  if (level === 'low') {
    len.value = 8; up.checked = false; num.checked = false; sym.checked = false; norep.checked = false;
    output.style.border = "2px solid red";
  } else if (level === 'secure') {
    len.value = 12; up.checked = true; num.checked = true; sym.checked = false; norep.checked = false;
    output.style.border = "2px solid orange";
  } else if (level === 'high') {
    len.value = 20; up.checked = true; num.checked = true; sym.checked = true; norep.checked = true;
    output.style.border = "2px solid green";
  }
  document.getElementById("valoreLunghezza").textContent = len.value;
  aggiornaPassword();
}
fetch("https://api64.ipify.org?format=json").then(res => res.json()).then(data => {
  document.getElementById("ipVal").textContent = data.ip;
});
function calcolaSubnet() {
  const input = document.getElementById("subnetInput").value;
  const output = document.getElementById("subnetOutput");
  const [ip, cidr] = input.split("/");
  if (!ip || !cidr) return output.textContent = "Formato non valido.";
  const mask = 0xFFFFFFFF << (32 - parseInt(cidr));
  const ipNum = ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0);
  const netNum = ipNum & mask;
  const broadcastNum = netNum | (~mask >>> 0);
  const toIp = n => [24,16,8,0].map(s => (n >> s) & 255).join(".");
  output.innerHTML = `
    <p>🧩 Subnet Mask: ${toIp(mask)}</p>
    <p>🌐 Network: ${toIp(netNum)}</p>
    <p>📣 Broadcast: ${toIp(broadcastNum)}</p>
    <p>👥 Host disponibili: ${Math.max(0, (2 ** (32 - parseInt(cidr)) - 2))}</p>
  `;
}
