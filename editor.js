import { activatePath } from "./path.js";
import { activateLine } from "./line.js";
import { activateRect } from "./rect.js";
import { activateCircle } from "./circle.js";
import { activatePolyline } from "./polyline.js";

const svg = document.getElementById("canvas");
const codeBox = document.getElementById("code");
const clearBtn = document.getElementById("clear");
const copyBtn = document.getElementById("copy");
const downloadBtn = document.getElementById("download");
const toolbar = document.querySelector(".btn-group");

let cleanupTool = null;

// =====================
// Hjälpfunktioner
// =====================
export function getSVGCoords(svg, evt) {
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

export function updateCodeBox() {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  codeBox.value = svgString;
  debugLog("SVG uppdaterad:", svgString);
}

// =====================
// Debug-hjälpare
// =====================
const DEBUG = false; // ändra till true för att aktivera

export function debugLog(...args) {
  if (DEBUG) {
    console.log(...args);
  }
}


// =====================
// Filnamns-generator
// =====================
let downloadCounter = 1;
let lastDate = null;

function generateFileName(prefix = "draw") {
  const now = new Date();
  const y = String(now.getFullYear()).slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const dateStr = `${y}${m}${d}`;

  if (lastDate !== dateStr) {
    downloadCounter = 1;
    lastDate = dateStr;
  }

  const fileName = `${prefix}-${downloadCounter}-${dateStr}.svg`;
  downloadCounter++;
  return fileName;
}

// =====================
// Verktygshantering
// =====================
function setTool(toolName) {
  //console.log("Byter till verktyg:", toolName);

  // Ta bort tidigare eventlyssnare
  if (cleanupTool) {
    cleanupTool();
    cleanupTool = null;
  }

  // Markera aktiv knapp
  toolbar.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
  const activeBtn = toolbar.querySelector(`[data-tool="${toolName}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  // Aktivera rätt verktyg
  if (toolName === "path") {
    cleanupTool = activatePath(svg, updateCodeBox);
  } else if (toolName === "line") {
    cleanupTool = activateLine(svg, updateCodeBox);
  } else if (toolName === "rect") {
    cleanupTool = activateRect(svg, updateCodeBox);
  } else if (toolName === "circle") {
    cleanupTool = activateCircle(svg, updateCodeBox);
  } else if (toolName === "polyline") {
    cleanupTool = activatePolyline(svg, updateCodeBox);
  }
  debugLog("Byter till verktyg:", toolName);
}


// =====================
// Getters för färg och tjocklek
// =====================
export function getCurrentStyle() {
  const colorInput = document.getElementById("strokeColor");
  const widthInput = document.getElementById("strokeWidth");

  return {
    stroke: colorInput.value || "#000000",
    strokeWidth: widthInput.value || "5"
  };
}

// =====================
// UI-knappar
// =====================
toolbar.addEventListener("click", e => {
  if (e.target.closest("button[data-tool]")) {
    const toolName = e.target.closest("button[data-tool]").dataset.tool;
    setTool(toolName);
    
  }
});

clearBtn.addEventListener("click", () => {
  svg.innerHTML = "";
  updateCodeBox();
  debugLog("Canvas rensad");
});

copyBtn.addEventListener("click", () => {
  codeBox.select();
  document.execCommand("copy");
  debugLog("SVG kopierad till urklipp");
});

downloadBtn.addEventListener("click", () => {
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);

  if (!source.match(/^<svg[^>]+xmlns=/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = generateFileName();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  debugLog("SVG nedladdad:", a.download);
});

// Modal → uppdatera kod vid öppning
const codeModal = document.getElementById("codeModal");
codeModal.addEventListener("show.bs.modal", () => {
  console.log("Modal öppnas → uppdaterar kod");
  updateCodeBox();
  debugLog("Modal öppnas → uppdaterar kod");
});

// =====================
// Standardverktyg vid start
// =====================
setTool("line");
