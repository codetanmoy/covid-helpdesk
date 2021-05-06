import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/tailwind.css";
import("@/assets/css/main.css");

import idb from "./db/idb";

var store = createStore({
	state: {
		sheets: []
	},
	mutations: {},
	actions: {
		async deleteSheet(context, sheet) {
			await idb.deleteSheet(sheet);
		},
		async getSheets(context) {
			context.state.sheets = [];
			let sheets = await idb.getSheets();
			sheets.forEach((c) => {
				context.state.sheets.push(c);
			});
		},
		async saveSheet(context, sheet) {
			await idb.saveSheet(sheet);
		}
	}
});

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
