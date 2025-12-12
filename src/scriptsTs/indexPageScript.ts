import { initNavbar } from "./navbar";

function run() {
  initNavbar();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run, { once: true });
} else {
  run();
}
document.addEventListener("astro:page-load", run);
