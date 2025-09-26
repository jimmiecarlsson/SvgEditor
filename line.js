import { getSVGCoords, getCurrentStyle } from "./editor.js";

export function activateLine(svg, updateCodeBox) {
  let line = null;

  function mousedown(e) {
    const start = getSVGCoords(svg, e);
    const style = getCurrentStyle();

    line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", start.x);
    line.setAttribute("y1", start.y);
    line.setAttribute("x2", start.x);
    line.setAttribute("y2", start.y);
    line.setAttribute("stroke", style.stroke);
    line.setAttribute("stroke-width", style.strokeWidth);
    svg.appendChild(line);
  }

  function mousemove(e) {
    if (!line) return;
    const {x, y} = getSVGCoords(svg, e);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    updateCodeBox();
  }

  function mouseup() {
    line = null;
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
