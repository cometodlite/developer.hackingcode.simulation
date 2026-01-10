
// HCSiG (Web) - Restored Core Features (v1.6.9.x compatible with index_final.html + style.css)
// - Code Scan: gain random codes (rarity) + acquire overlay
// - Server Hack: choose target, spend energy, get credits/exp
// - CPU Upgrade: tier up with credit cost
// - Overclock: upgrade selected code up to Lv.100 with rarity-based costs
// - Energy Packs: count + use to refill energy
// - Save/Load: 3 slots via localStorage
//
// Note: This is a "restore" baseline (not a perfect 1:1 of your old script),
// but it brings back the missing gameplay loop with a clean, extendable structure.

(() => {
  "use strict";

  // ---------- Utils ----------
  const $ = (sel) => document.querySelector(sel);
  const byId = (id) => document.getElementById(id);
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function nowISO() {
    const d = new Date();
    const pad = (x) => String(x).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pickWeighted(items) {
    // items: [{item, w}]
    const total = items.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * total;
    for (const x of items) {
      r -= x.w;
      if (r <= 0) return x.item;
    }
    return items[items.length - 1].item;
  }

  function formatNum(n) {
    return (n ?? 0).toLocaleString("ko-KR");
  }

  // ---------- Game Data ----------
  const RARITIES = [
    { key: "common",   label: "COMMON",   w: 62, color: "#9aa0a6" },
    { key: "uncommon", label: "UNCOMMON", w: 25, color: "#7bd389" },
    { key: "epic",     label: "EPIC",     w: 10, color: "#7aa7ff" },
    { key: "myth",     label: "MYTH",     w: 2.5, color: "#f5c542" },
    { key: "ancient",  label: "ANCIENT",  w: 0.5, color: "#ffb86b" },
  ];

  const SERVERS = [
    { id: "sv-neo",   name: "NEO NODE",        baseDifficulty: 8,  baseReward: 250 },
    { id: "sv-arc",   name: "A.R.C GATE",      baseDifficulty: 14, baseReward: 520 },
    { id: "sv-fog",   name: "FOG HOLLOW HUB",  baseDifficulty: 18, baseReward: 780 },
    { id: "sv-wall",  name: "CARNOT WALL NET", baseDifficulty: 22, baseReward: 980 },
  ];

  const CPU_UPGRADE_COST = (tier) => {
    // tier 1 -> 2 cost, 2->3 ...
    return 500 + (tier - 1) * 700;
  };

  function rarityMeta(key) {
    return RARITIES.find(r => r.key === key) || RARITIES[0];
  }

  // Overclock costs (level ranges by 10) - based on your notes
  function overclockCost(rarityKey, nextLevel) {
    // nextLevel: the level we are upgrading TO (1..100)
    const band = Math.floor((nextLevel - 1) / 10) + 1; // 1..10 bands
    const baseByRarity = {
      common: 10000,
      uncommon: 20000,
      epic: 50000,
      myth: 90000,
      ancient: 140000,
    };
    const base = baseByRarity[rarityKey] ?? 10000;
    return base * band;
  }

  // Power scaling
  function codeBasePower(rarityKey) {
    const base = {
      common: randint(6, 12),
      uncommon: randint(10, 18),
      epic: randint(16, 28),
      myth: randint(24, 40),
      ancient: randint(32, 55),
    }[rarityKey] ?? randint(6, 12);
    return base;
  }

  function codeTotalPower(code) {
    // Overclock increases power slightly
    return Math.round(code.basePower * (1 + (code.overclockLevel ?? 0) * 0.012));
  }

  // ---------- State ----------
  const DEFAULT_STATE = () => ({
    version: "1.6.9.0-web-restore",
    level: 1,
    exp: 0,
    expMax: 20,
    credit: 0,
    cpuTier: 1,

    energy: 20,
    energyMax: 20,
    energyPacks: 0,

    inventory: {
      codes: [], // {id,name,rarity,basePower,overclockLevel,createdAt}
    },

    selected: {
      serverId: SERVERS[0].id,
      codeId: null,
    },

    stats: {
      scans: 0,
      hacks: 0,
      lastSaveAt: null,
    },

    logs: [],
  });

  let state = DEFAULT_STATE();

  // ---------- Persistence ----------
  const SAVE_KEY = (slot) => `HCSIG_SAVE_SLOT_${slot}`;

  function safeParse(jsonStr) {
    try { return JSON.parse(jsonStr); } catch { return null; }
  }

  function save(slot = 1) {
    state.stats.lastSaveAt = nowISO();
    localStorage.setItem(SAVE_KEY(slot), JSON.stringify(state));
    log(`슬롯 ${slot} 저장 완료 (${state.stats.lastSaveAt})`);
    renderAll();
  }

  function load(slot = 1) {
    const raw = localStorage.getItem(SAVE_KEY(slot));
    const parsed = raw ? safeParse(raw) : null;
    if (!parsed) {
      log(`슬롯 ${slot}에 저장 데이터가 없음`);
      return;
    }
    // Minimal schema merge
    state = { ...DEFAULT_STATE(), ...parsed };
    state.inventory = { ...DEFAULT_STATE().inventory, ...(parsed.inventory || {}) };
    state.selected = { ...DEFAULT_STATE().selected, ...(parsed.selected || {}) };
    state.stats = { ...DEFAULT_STATE().stats, ...(parsed.stats || {}) };
    state.logs = Array.isArray(parsed.logs) ? parsed.logs : [];
    log(`슬롯 ${slot} 불러오기 완료`);
    renderAll();
  }

  // ---------- Logs / Overlay ----------
  function log(msg) {
    state.logs.unshift(`[${nowISO()}] ${msg}`);
    state.logs = state.logs.slice(0, 60);
    renderLog();
  }

  function ensureOverlay() {
    let el = byId("hcsigOverlay");
    if (el) return el;

    el = document.createElement("div");
    el.id = "hcsigOverlay";
    el.style.cssText = `
      position: fixed; inset: 0; display: none; align-items: center; justify-content: center;
      background: rgba(0,0,0,.55); z-index: 9999;
      padding: 18px;
    `;
    el.innerHTML = `
      <div id="hcsigOverlayCard" style="
        width: min(560px, 95vw);
        border-radius: 14px;
        background: rgba(20,24,32,.98);
        border: 1px solid rgba(255,255,255,.08);
        box-shadow: 0 20px 60px rgba(0,0,0,.55);
        padding: 16px 16px 14px;
      ">
        <div id="hcsigOverlayTitle" style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">알림</div>
        <div id="hcsigOverlayBody" style="font-size: 14px; line-height: 1.5; opacity: .95;"></div>
        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top: 14px;">
          <button id="hcsigOverlayOk" style="padding:8px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06); color: #fff; cursor:pointer;">
            확인
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(el);

    byId("hcsigOverlayOk").addEventListener("click", () => hideOverlay());
    el.addEventListener("click", (e) => { if (e.target === el) hideOverlay(); });

    return el;
  }

  function showOverlay(title, bodyHtml) {
    const el = ensureOverlay();
    byId("hcsigOverlayTitle").textContent = title || "알림";
    byId("hcsigOverlayBody").innerHTML = bodyHtml || "";
    el.style.display = "flex";
  }

  function hideOverlay() {
    const el = byId("hcsigOverlay");
    if (el) el.style.display = "none";
  }

  // ---------- Gameplay ----------
  function spendEnergy(n) {
    if (state.energy < n) return false;
    state.energy -= n;
    return true;
  }

  function gainExp(n) {
    state.exp += n;
    while (state.exp >= state.expMax) {
      state.exp -= state.expMax;
      state.level += 1;
      // slight scaling
      state.expMax = Math.round(state.expMax * 1.08 + 2);
      log(`레벨업! → Lv.${state.level}`);
      showOverlay("레벨업!", `<b>Lv.${state.level}</b> 달성!<br>다음 필요 경험치: ${state.expMax}`);
    }
  }

  function gainCredit(n) {
    state.credit += n;
  }

  function addCode(code) {
    state.inventory.codes.unshift(code);
    if (!state.selected.codeId) state.selected.codeId = code.id;
  }

  function generateCodeName(rarityKey) {
    const pool = {
      common: ["Echo", "Pulse", "Trace", "Bit", "Wire", "Null"],
      uncommon: ["Vector", "Cipher", "Relay", "Shard", "Kernel", "Beacon"],
      epic: ["Astra", "Obsidian", "Rift", "Hyperion", "Nova", "Specter"],
      myth: ["Seraph", "Leviathan", "Chronos", "Eclipse", "Arcadia"],
      ancient: ["Primordial", "Abyssal", "Godhand", "Cataclysm", "Oracle"],
    }[rarityKey] || ["Code"];

    const suffix = ["Module", "Script", "Patch", "Exploit", "Suite", "Driver"][randint(0,5)];
    const base = pool[randint(0, pool.length - 1)];
    return `${base} ${suffix}`;
  }

  function rollRarity() {
    // CPU tier slightly improves odds: shift weight from common -> higher
    const t = state.cpuTier;
    const weights = RARITIES.map(r => ({ item: r.key, w: r.w }));
    // tweak
    const boost = clamp((t - 1) * 2.2, 0, 12); // up to +12
    // reduce common
    const common = weights.find(x => x.item === "common");
    if (common) common.w = Math.max(30, common.w - boost * 2);
    // distribute to higher rarities
    const add = boost / 4;
    for (const k of ["uncommon","epic","myth","ancient"]) {
      const w = weights.find(x => x.item === k);
      if (w) w.w += add * (k === "ancient" ? 0.6 : k === "myth" ? 0.9 : 1.2);
    }
    return pickWeighted(weights);
  }

  function codeScan() {
    if (!spendEnergy(1)) {
      showOverlay("에너지 부족", `에너지가 부족합니다.<br>에너지 팩을 사용하거나 회복을 기다려주세요.`);
      return;
    }

    state.stats.scans += 1;

    const rarityKey = rollRarity();
    const meta = rarityMeta(rarityKey);

    const code = {
      id: `code_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      name: generateCodeName(rarityKey),
      rarity: rarityKey,
      basePower: codeBasePower(rarityKey),
      overclockLevel: 0,
      createdAt: nowISO(),
    };

    addCode(code);
    gainExp(1);

    log(`코드 스캔 성공: ${meta.label} "${code.name}" 획득 (PWR ${code.basePower})`);

    showOverlay(
      "코드 획득!",
      `<div style="display:flex; gap:10px; align-items:center;">
         <div style="width:10px;height:10px;border-radius:50%;background:${meta.color};"></div>
         <div><b style="color:${meta.color}">${meta.label}</b> — <b>${code.name}</b></div>
       </div>
       <div style="margin-top:8px; opacity:.9;">기본 파워: <b>${code.basePower}</b><br>오버클럭: <b>Lv.${code.overclockLevel}</b></div>`
    );

    renderAll();
  }

  function serverHack() {
    if (!spendEnergy(2)) {
      showOverlay("에너지 부족", `에너지가 부족합니다.<br>서버 해킹은 <b>에너지 2</b>가 필요합니다.`);
      return;
    }

    const sv = SERVERS.find(s => s.id === state.selected.serverId) || SERVERS[0];
    state.stats.hacks += 1;

    // compute power
    const codes = state.inventory.codes;
    const best = codes.slice().sort((a,b) => codeTotalPower(b) - codeTotalPower(a))[0];
    const codePower = best ? codeTotalPower(best) : 0;

    const playerPower = (state.cpuTier * 8) + (state.level * 1.2) + (codePower * 0.6);
    const difficulty = sv.baseDifficulty * 10;

    const successChance = clamp((playerPower / difficulty) * 0.55 + 0.25, 0.08, 0.92);
    const roll = Math.random();

    if (roll <= successChance) {
      const reward = Math.round(sv.baseReward * (1 + state.cpuTier * 0.12) * randint(90, 130) / 100);
      gainCredit(reward);
      gainExp(3);
      log(`서버 해킹 성공: ${sv.name} +${formatNum(reward)} 크레딧 (성공률 ${(successChance*100).toFixed(1)}%)`);
      showOverlay("해킹 성공!", `<b>${sv.name}</b><br>크레딧 +<b>${formatNum(reward)}</b><br>성공률 ${(successChance*100).toFixed(1)}%`);
    } else {
      gainExp(1);
      log(`서버 해킹 실패: ${sv.name} (성공률 ${(successChance*100).toFixed(1)}%)`);
      showOverlay("해킹 실패", `<b>${sv.name}</b><br>성공률 ${(successChance*100).toFixed(1)}%`);
    }

    renderAll();
  }

  function cpuUpgrade() {
    const cost = CPU_UPGRADE_COST(state.cpuTier);
    if (state.credit < cost) {
      showOverlay("크레딧 부족", `CPU 업그레이드에는 <b>${formatNum(cost)}</b> 크레딧이 필요합니다.`);
      return;
    }
    state.credit -= cost;
    state.cpuTier += 1;

    // reward: increase energy max every 2 tiers
    if (state.cpuTier % 2 === 0) {
      state.energyMax += 2;
      state.energy = clamp(state.energy + 2, 0, state.energyMax);
      log(`CPU 티어 ${state.cpuTier} 달성: 에너지 최대치 +2`);
    }

    log(`CPU 업그레이드 완료 → Tier ${state.cpuTier} (-${formatNum(cost)} 크레딧)`);
    showOverlay("CPU 업그레이드", `CPU 티어가 <b>${state.cpuTier}</b>로 상승했습니다!`);
    renderAll();
  }

  function useEnergyPack() {
    if (state.energyPacks <= 0) {
      showOverlay("에너지 팩 없음", `에너지 팩이 없습니다.`);
      return;
    }
    state.energyPacks -= 1;
    state.energy = state.energyMax;
    log("에너지 팩 사용: 에너지 FULL");
    showOverlay("에너지 FULL", `에너지가 <b>${state.energy}/${state.energyMax}</b>로 회복되었습니다.`);
    renderAll();
  }

  function overclockSelected() {
    const code = state.inventory.codes.find(c => c.id === state.selected.codeId);
    if (!code) {
      showOverlay("오버클럭", `오버클럭할 코드를 선택하세요.`);
      return;
    }
    const next = (code.overclockLevel ?? 0) + 1;
    if (next > 100) {
      showOverlay("오버클럭", `이미 최대 레벨입니다. (Lv.100)`);
      return;
    }
    const cost = overclockCost(code.rarity, next);
    if (state.credit < cost) {
      showOverlay("크레딧 부족", `오버클럭 Lv.${next}에는 <b>${formatNum(cost)}</b> 크레딧이 필요합니다.`);
      return;
    }
    state.credit -= cost;
    code.overclockLevel = next;
    log(`오버클럭 성공: "${code.name}" → Lv.${next} (-${formatNum(cost)})`);
    renderAll();
  }

  // ---------- UI Rendering ----------
  function renderStatus() {
    const root = byId("statusArea");
    if (!root) return;

    root.innerHTML = `
      <div class="stat-box">
        <div class="stat-row"><span class="label">레벨</span><span class="value">${state.level}</span></div>
        <div class="stat-row"><span class="label">경험치</span><span class="value">${state.exp} / ${state.expMax}</span></div>
        <div class="stat-row"><span class="label">크레딧</span><span class="value">${formatNum(state.credit)}</span></div>
        <div class="stat-row"><span class="label">CPU 티어</span><span class="value">${state.cpuTier}</span></div>
        <div class="stat-row"><span class="label">에너지</span><span class="value">${state.energy} / ${state.energyMax}</span></div>

        <div style="margin-top:10px; display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <span class="label">에너지 팩</span>
          <span class="value">${state.energyPacks}</span>
          <button id="btnUseEnergyPack" class="btn">사용</button>
        </div>

        <div style="margin-top:10px; opacity:.85; font-size:12px;">
          마지막 저장: ${state.stats.lastSaveAt ?? "-"}
        </div>
      </div>

      <div class="block" style="margin-top:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <b>오버클럭</b>
          <button id="btnOverclock" class="btn">강화</button>
        </div>
        <div style="margin-top:8px;">
          <select id="codeSelect" style="width:100%; padding:8px; border-radius:10px;">
            ${state.inventory.codes.map(c => {
              const m = rarityMeta(c.rarity);
              const p = codeTotalPower(c);
              const sel = c.id === state.selected.codeId ? "selected" : "";
              return `<option value="${c.id}" ${sel}>[${m.label}] ${c.name} | PWR ${p} | OC Lv.${c.overclockLevel}</option>`;
            }).join("") || `<option value="">(보유 코드 없음)</option>`}
          </select>
        </div>
      </div>

      <div class="block" style="margin-top:12px;">
        <b>로그</b>
        <div id="logBox" style="margin-top:8px; max-height: 210px; overflow:auto; font-size:12px; line-height:1.45; opacity:.9;"></div>
      </div>
    `;

    const btnUse = byId("btnUseEnergyPack");
    if (btnUse) btnUse.onclick = useEnergyPack;

    const sel = byId("codeSelect");
    if (sel) {
      sel.onchange = () => {
        state.selected.codeId = sel.value || null;
      };
    }

    const btnOC = byId("btnOverclock");
    if (btnOC) btnOC.onclick = overclockSelected;

    renderLog();
  }

  function renderLog() {
    const box = byId("logBox");
    if (!box) return;
    box.innerHTML = state.logs.slice(0, 18).map(x => `<div>${x}</div>`).join("") || `<div style="opacity:.7;">로그 없음</div>`;
  }

  function renderActions() {
    const root = byId("actionArea");
    if (!root) return;

    const sv = SERVERS.find(s => s.id === state.selected.serverId) || SERVERS[0];
    const cpuCost = CPU_UPGRADE_COST(state.cpuTier);

    root.innerHTML = `
      <div class="actions-row" style="display:flex; gap:8px; flex-wrap:wrap;">
        <button id="btnScan" class="btn">코드 스캔</button>
        <button id="btnHack" class="btn">서버 해킹</button>
        <button id="btnCpu" class="btn">CPU 업그레이드</button>
      </div>

      <div style="margin-top:10px;">
        <div style="margin-bottom:6px; opacity:.9;">타겟 서버</div>
        <select id="serverSelect" style="width: 260px; max-width: 100%; padding:8px; border-radius:10px;">
          ${SERVERS.map(s => `<option value="${s.id}" ${s.id===state.selected.serverId?"selected":""}>${s.name}</option>`).join("")}
        </select>
        <div style="margin-top:8px; font-size:12px; opacity:.85;">
          난이도: ${sv.baseDifficulty} / 보상: ~${formatNum(sv.baseReward)}<br>
          CPU 업그레이드 비용: ${formatNum(cpuCost)} 크레딧
        </div>
      </div>

      <div style="margin-top:14px;">
        <b>로드아웃</b>
        <div style="margin-top:8px; display:flex; gap:8px; flex-wrap:wrap;">
          <select id="slotSelect" style="padding:8px; border-radius:10px;">
            <option value="1">슬롯 1</option>
            <option value="2">슬롯 2</option>
            <option value="3">슬롯 3</option>
          </select>
          <button id="btnSave" class="btn">슬롯 저장</button>
          <button id="btnLoad" class="btn">슬롯 불러오기</button>
        </div>
      </div>
    `;

    byId("btnScan").onclick = codeScan;
    byId("btnHack").onclick = serverHack;
    byId("btnCpu").onclick = cpuUpgrade;

    const serverSel = byId("serverSelect");
    if (serverSel) {
      serverSel.onchange = () => {
        state.selected.serverId = serverSel.value;
      };
    }

    const slotSel = byId("slotSelect");
    const getSlot = () => parseInt(slotSel?.value || "1", 10);

    byId("btnSave").onclick = () => save(getSlot());
    byId("btnLoad").onclick = () => load(getSlot());
  }

  function renderShop() {
    const root = byId("shopArea");
    if (!root) return;

    // Simple shop: Energy Pack
    const packPrice = 350;
    root.innerHTML = `
      <div class="block">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div>
            <b>에너지 팩</b>
            <div style="font-size:12px; opacity:.85; margin-top:2px;">에너지를 FULL로 회복</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700;">${formatNum(packPrice)} 💰</div>
            <button id="btnBuyPack" class="btn" style="margin-top:6px;">구매</button>
          </div>
        </div>
      </div>

      <div class="block" style="margin-top:12px;">
        <b>인벤토리 (코드)</b>
        <div id="codeList" style="margin-top:8px; max-height: 360px; overflow:auto;"></div>
      </div>
    `;

    byId("btnBuyPack").onclick = () => {
      if (state.credit < packPrice) {
        showOverlay("크레딧 부족", `에너지 팩 구매에는 <b>${formatNum(packPrice)}</b> 크레딧이 필요합니다.`);
        return;
      }
      state.credit -= packPrice;
      state.energyPacks += 1;
      log(`에너지 팩 구매 (-${formatNum(packPrice)})`);
      renderAll();
    };

    const list = byId("codeList");
    if (!list) return;

    if (state.inventory.codes.length === 0) {
      list.innerHTML = `<div style="opacity:.75; font-size:12px;">보유 코드가 없습니다. (코드 스캔으로 획득)</div>`;
      return;
    }

    list.innerHTML = state.inventory.codes.map(c => {
      const m = rarityMeta(c.rarity);
      const p = codeTotalPower(c);
      const isSel = c.id === state.selected.codeId;
      return `
        <div class="code-card" data-id="${c.id}" style="
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 12px;
          padding: 10px;
          margin-bottom: 8px;
          background: rgba(255,255,255,.03);
          cursor: pointer;
          ${isSel ? "outline: 2px solid rgba(122,167,255,.55);" : ""}
        ">
          <div style="display:flex; justify-content:space-between; gap:10px;">
            <div>
              <div style="font-weight:700;">
                <span style="display:inline-flex;align-items:center;gap:6px;">
                  <span style="width:8px;height:8px;border-radius:50%;background:${m.color};"></span>
                  <span style="color:${m.color};">${m.label}</span>
                </span>
                <span style="margin-left:8px;">${c.name}</span>
              </div>
              <div style="font-size:12px; opacity:.85; margin-top:4px;">
                PWR <b>${p}</b> · OC Lv.<b>${c.overclockLevel}</b> · 생성 ${c.createdAt}
              </div>
            </div>
            <div style="text-align:right; font-size:12px; opacity:.85;">
              강화비(다음): <b>${formatNum(overclockCost(c.rarity, Math.min(100, (c.overclockLevel||0)+1)))}</b>
            </div>
          </div>
        </div>
      `;
    }).join("");

    list.querySelectorAll(".code-card").forEach(card => {
      card.addEventListener("click", () => {
        state.selected.codeId = card.getAttribute("data-id");
        renderAll();
      });
    });
  }

  function renderAll() {
    renderStatus();
    renderActions();
    renderShop();
  }

  // ---------- More Menu ----------
  function attachMoreMenu() {
    const btn = byId("btnMore");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const body = `
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="opacity:.9;">HCSiG Web Restore<br><span style="opacity:.75; font-size:12px;">${state.version}</span></div>

          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button id="mmGiveCredits" style="padding:8px 10px; border-radius:10px; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.06); color:#fff; cursor:pointer;">테스트: +1000크레딧</button>
            <button id="mmGivePack" style="padding:8px 10px; border-radius:10px; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.06); color:#fff; cursor:pointer;">테스트: 에너지팩 +1</button>
          </div>

          <div style="font-size:12px; opacity:.85;">
            이 메뉴는 임시 복구용입니다. 필요 기능(컷씬/퀘스트/업적/업데이트 로그)을 여기서 확장하면 됩니다.
          </div>
        </div>
      `;
      showOverlay("더보기", body);

      // bind after overlay opens
      setTimeout(() => {
        const c = byId("mmGiveCredits");
        if (c) c.onclick = () => { gainCredit(1000); log("테스트: +1000 크레딧"); hideOverlay(); renderAll(); };
        const p = byId("mmGivePack");
        if (p) p.onclick = () => { state.energyPacks += 1; log("테스트: 에너지 팩 +1"); hideOverlay(); renderAll(); };
      }, 0);
    });
  }

  // ---------- Init ----------
  function initGame() {
    attachMoreMenu();
    renderAll();
    log("시스템 초기화 완료");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGame);
  } else {
    initGame();
  }

})();
