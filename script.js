const SERVER_IP = "m1di.cringe.team";

const ipEl = document.getElementById("server-ip");
const copyBtn = document.getElementById("copy-ip");
const statusCircle = document.getElementById("status-circle");
const statusText = document.getElementById("status-text");
const onlineCount = document.getElementById("online-count");
const recordCount = document.getElementById("record-count");

if(ipEl) ipEl.textContent = SERVER_IP;

if(copyBtn){
  copyBtn.addEventListener("click", async ()=>{
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      showToast("IP скопирован: " + SERVER_IP);
    } catch {
      window.prompt("Скопируйте IP серверa:", SERVER_IP);
    }
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

// Фон двигается при движении мыши
const bgEl = document.querySelector(".bg");
document.addEventListener("pointermove", (e)=>{
  if(bgEl){
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    bgEl.style.transform = `scale(1.03) translate(${x}px, ${y}px)`;
  }
});
document.addEventListener("pointerleave", ()=>{if(bgEl) bgEl.style.transform = "scale(1.02)";});

// Реальный онлайн и статус
async function updateServerStatus() {
  try {
    const res = await fetch('https://api.mcsrvstat.us/2/m1di.cringe.team');
    const data = await res.json();

    let online = data.online ? data.players.online || 0 : 0;
    onlineCount.textContent = online;

    // Обновление рекорда
    if(online > parseInt(recordCount.textContent)){
      recordCount.textContent = online;
    }

    statusText.textContent = data.online ? "Онлайн" : "Оффлайн";
    statusCircle.style.background = data.online ? "lime" : "red";

  } catch(e){
    console.error("Ошибка запроса сервера", e);
  }
}

updateServerStatus();
setInterval(updateServerStatus, 30000);
