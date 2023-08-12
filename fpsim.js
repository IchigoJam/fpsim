import * as eg from "https://js.sabae.cc/egvr.js";
//import { waitClick } from "https://js.sabae.cc/waitClick.js"
import { sleep } from "https://js.sabae.cc/sleep.js";

const skyurl = "https://code4fukui.github.io/vr-aozora-republic/vr360_aozora-republic_50m.jpg";
eg.sky(skyurl);

const url = "https://code4fukui.github.io/vr-aozora-republic/aozora-republic_all.glb";
eg.model(url, 0, 0, 0, 120, 100);
const n = eg.sphere(0, 1.2, -5); // ドローン
for (;;) {
  //await waitClick(document.body);
  n.setAttribute("position", { x: 0, y: 1.2, z: -5 });
  await sleep(1000);
  const ss = fp.textContent.trim().split("\n");
  for (const s of ss) {
    const c = s.split(" ");
    const cmd = c[0];
    const val = parseInt(c[1]) * 0.01;
    if (isNaN(val)) {
      alert("ERROR 数が正しくありません。" + c[1]);
      continue;
    }
    let p = n.getAttribute("position").clone();
    console.log(cmd, val)
    if (cmd == "QU") {
      p.y += val;
    } else if (cmd == "QD") {
      p.y -= val;
    } else if (cmd == "QF") {
      p.z -= val;
    } else if (cmd == "QB") {
      p.z += val;
    } else if (cmd == "QR") {
      p.x += val;
    } else if (cmd == "QL") {
      p.x -= val;
    } else {
      alert("ERROR サポートしていないコマンドです。" + cmd);
      break;
    }
    //n.setAttribute("position", p);
    n.setAttribute("animation", `property: position; to: ${p.x} ${p.y} ${p.z}; dur: 500; easing: linear;`);
    await sleep(1000);
  }
  await sleep(3000);
}
