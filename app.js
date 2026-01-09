// HCSiG minimal app.js (auto-render version)
// This file guarantees that UI panels are populated on load.

const state = {
  level: 1,
  exp: 0,
  expMax: 20,
  credit: 0,
  cpuTier: 1,
  energy: 20,
  energyMax: 20,
};

function renderStatus() {
  const el = document.getElementById("statusArea");
  if (!el) return;
  el.innerHTML = `
    <div>레벨 ${state.level}</div>
    <div>경험치 ${state.exp} / ${state.expMax}</div>
    <div>크레딧 ${state.credit}</div>
    <div>CPU 티어 ${state.cpuTier}</div>
    <div>에너지 ${state.energy} / ${state.energyMax}</div>
  `;
}

function renderActions() {
  const el = document.getElementById("actionArea");
  if (!el) return;
  el.innerHTML = `
    <button id="scanBtn">코드 스캔</button>
    <button id="hackBtn">서버 해킹</button>
    <button id="cpuBtn">CPU 업그레이드</button>
  `;

  document.getElementById("scanBtn").onclick = () => {
    if (state.energy <= 0) return alert("에너지가 부족합니다.");
    state.energy--;
    state.exp++;
    if (state.exp >= state.expMax) {
      state.exp = 0;
      state.level++;
    }
    renderStatus();
  };
}

function renderShop() {
  const el = document.getElementById("shopArea");
  if (!el) return;
  el.innerHTML = `
    <div>상점 준비 중</div>
  `;
}

function initGame() {
  renderStatus();
  renderActions();
  renderShop();
}

// Force init on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGame);
} else {
  initGame();
}
