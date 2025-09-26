import { getSVGCoords, getCurrentStyle } from "./editor.js";

export function activateCircle(svg, updateCodeBox) {
  let circle = null;
  let start = null;

  function mousedown(e) {
    start = getSVGCoords(svg, e);
    const style = getCurrentStyle();

    circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", start.x);
    circle.setAttribute("cy", start.y);
    circle.setAttribute("r", 0);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", style.stroke);
    circle.setAttribute("stroke-width", style.strokeWidth);
    svg.appendChild(circle);
  }

  function mousemove(e) {
    if (!circle) return;
    const {x, y} = getSVGCoords(svg, e);
    const dx = x - start.x;
    const dy = y - start.y;
    const r = Math.sqrt(dx*dx + dy*dy);
    circle.setAttribute("r", r);
    updateCodeBox();
  }

  function mouseup() {
    circle = null;
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
