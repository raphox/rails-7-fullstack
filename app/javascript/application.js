// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";

import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.start();

if (localStorage.getItem("sidebar-expanded") == "true") {
  document.querySelector("body").classList.add("sidebar-expanded");
} else {
  document.querySelector("body").classList.remove("sidebar-expanded");
}
