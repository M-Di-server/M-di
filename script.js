const SERVER_IP = "m1di.cringe.team";

const ipEl = document.getElementById("server-ip");
const copyBtn = document.getElementById("copy-ip");

if(ipEl) ipEl.textContent = SERVER_IP;

if(copyBtn){
  copyBtn.addEventListener("click", async ()=>{
    try { await navigator.clipboard.writeText(SERVER_IP); showToast("IP скопирован: " + SERVER_IP); }
    catch { window.prompt("Скопируйте IP серверa:", SERVER_IP); }
  });
}

function showToast(text, duration = 2000){
  const t = document.createElement("div");
  t.className = "site-toast";
  t.textContent = text;
  Object.assign(t.style, {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    padding: "10px 14px",
    borderRadius: "10px",
    background: "linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0.7))",
    color: "white",
    zIndex: 60,
    boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
    fontWeight: 600
  });
  document.body.appendChild(t);
  setTimeout(()=>t.style.opacity = "0", duration - 300);
  setTimeout(()=>t.remove(), duration);
}

const bgEl = document.querySelector(".bg");
document.addEventListener("pointerdown", ()=>{
  if(bgEl) bgEl.style.filter = "blur(4px) saturate(1.05) brightness(0.7)";
});
document.addEventListener("pointerup", ()=>{
  if(bgEl) bgEl.style.filter = "blur(6px) saturate(1.05) brightness(0.6)";
});
