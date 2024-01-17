import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import armor from "../data/armor.json";
const app = createApp(App);

app.provide("armoritems", armor);

app.mount("#app");
