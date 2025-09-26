import { getSVGCoords, debugLog, getCurrentStyle } from "./editor.js";

export function activatePath(svg, updateCodeBox) {
  let path = null;
  let pathData = "";

  function mousedown(e) {
    const {x, y} = getSVGCoords(svg, e);
    const style = getCurrentStyle();

    debugLog("Path mousedown vid:", x, y, "med stil:", style);

    pathData = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", style.stroke);
    path.setAttribute("stroke-width", style.strokeWidth);
    svg.appendChild(path);
  }

  function mousemove(e) {
    if (!path) return;
    const {x, y} = getSVGCoords(svg, e);
    pathData += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    path.setAttribute("d", pathData);
    updateCodeBox();
  }

  function mouseup() {
    path = null;
    updateCodeBox();
  }

  svg.addEventListener("mousedown", mousedown);
  svg.addEventListener("mousemove", mousemove);
  svg.addEventListener("mouseup", mouseup);

  return () => {
    svg.removeEventListener("mousedown", mousedown);
    svg.removeEventListener("mousemove", mousemove);
    svg.removeEventListener("mouseup", mouseup);
  };
}
