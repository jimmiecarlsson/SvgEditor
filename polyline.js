import { getSVGCoords, getCurrentStyle } from "./editor.js";

export function activatePolyline(svg, updateCodeBox) {
  let polyline = null;
  let points = [];

  function mousedown(e) {
    const {x, y} = getSVGCoords(svg, e);
    const style = getCurrentStyle();

    if (!polyline) {
      // Starta en ny polyline
      polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      polyline.setAttribute("fill", "none");
      polyline.setAttribute("stroke", style.stroke);
      polyline.setAttribute("stroke-width", style.strokeWidth);
      svg.appendChild(polyline);
    }

    // Lägg till ny punkt
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    polyline.setAttribute("points", points.join(" "));
    updateCodeBox();
  }

  function mousemove(e) {
    if (!polyline) return;
    // Temporär punkt för förhandsvisning
    const {x, y} = getSVGCoords(svg, e);
    const previewPoints = [...points, `${x.toFixed(1)},${y.toFixed(1)}`];
    polyline.setAttribute("points", previewPoints.join(" "));
  }

  function dblclick() {
    // Avsluta polyline vid dubbelklick
    polyline = null;
    points = [];
    updateCodeBox();
  }

  svg.addEventListener("mousedown", mousedown);
  svg.addEventListener("mousemove", mousemove);
  svg.addEventListener("dblclick", dblclick);

  return () => {
    svg.removeEventListener("mousedown", mousedown);
    svg.removeEventListener("mousemove", mousemove);
    svg.removeEventListener("dblclick", dblclick);
  };
}
