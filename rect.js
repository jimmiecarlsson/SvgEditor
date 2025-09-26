import { getSVGCoords } from "./editor.js";

export function activateRect(svg, updateCodeBox) {
  let rect = null;
  let start = null;

  function mousedown(e) {
    start = getSVGCoords(svg, e);
    rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", start.x);
    rect.setAttribute("y", start.y);
    rect.setAttribute("width", 0);
    rect.setAttribute("height", 0);
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2");
    svg.appendChild(rect);
  }

  function mousemove(e) {
    if (!rect) return;
    const {x, y} = getSVGCoords(svg, e);
    const w = x - start.x;
    const h = y - start.y;
    rect.setAttribute("width", Math.abs(w));
    rect.setAttribute("height", Math.abs(h));
    rect.setAttribute("x", Math.min(start.x, x));
    rect.setAttribute("y", Math.min(start.y, y));
    updateCodeBox();
  }

  function mouseup() {
    rect = null;
    start = null;
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
