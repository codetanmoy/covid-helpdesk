const DB_NAME = "covidSheetDB";
const DB_VERSION = 1;
const store_name = "sheets";
let DB;

export default {
	async getDb() {
		return new Promise((resolve, reject) => {
			if (DB) {
				return resolve(DB);
			}
			// console.log("OPENING DB", DB);
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);

			request.onerror = (e) => {
				console.log("Error opening db", e);
				reject("Error");
			};

			request.onsuccess = (e) => {
				DB = e.target.result;
				resolve(DB);
			};

			request.onupgradeneeded = (e) => {
				console.log("onupgradeneeded");
				let db = e.target.result;
				db.createObjectStore(store_name, {
					autoIncrement: true,
					keyPath: "id"
				});
			};
		});
	},
	async deleteSheet(sheet) {
		let db = await this.getDb();

		return new Promise((resolve) => {
			let trans = db.transaction([store_name], "readwrite");
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(store_name);
			store.delete(sheet.id);
		});
	},
	async getSheets() {
		let db = await this.getDb();

		return new Promise((resolve) => {
			let trans = db.transaction([store_name], "readonly");
			trans.oncomplete = () => {
				resolve(sheets);
			};

			let store = trans.objectStore(store_name);
			let sheets = [];

			store.openCursor().onsuccess = (e) => {
				let cursor = e.target.result;
				if (cursor) {
					sheets.push(cursor.value);
					cursor.continue();
				}
			};
		});
	},

	async saveSheet(sheet) {
		let db = await this.getDb();

		return new Promise((resolve) => {
			let trans = db.transaction([store_name], "readwrite");
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(store_name);
			store.put(sheet);
		});
	}
};
