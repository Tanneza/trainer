import { App } from "./app.js";
import { viewManager } from "./viewManager.js";

const app = new App();
await app.mount();

viewManager.push({ name: "lesson-type-selection" });
