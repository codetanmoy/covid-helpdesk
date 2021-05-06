<template>
	<div class="min-h-screen bg-gray-900">
		<div
			class="w-full px-2 py-4 flex flex-row items-center justify-between"
		>
			<div
				class="text-xl text-green-400 md:text-2xl font-bold font-pop-bold flex flex-row items-center"
			>
				<img
					class="w-6 h-6 ml-4 filter invert mr-2"
					height="12"
					width="12"
					src="@/assets/images/feather/life-buoy.svg"
				/>
				Covid Information Helpdesk
			</div>
			<div class="bg-white p-2 text-xs  rounded-md">
				<div class=" pr-6 flex flex-row items-center" v-if="loading">
					<div class="pr-2 md:pr-4">
						Syncing Information from Database
					</div>
					<img
						height="24"
						width="24"
						class="w-8 h-8 rounded-md"
						src="@/assets/images/spin-arrow.gif"
					/>
				</div>
				<div class="pr-6  flex flex-row items-center" v-else>
					<img
						class="w-8 h-8 mr-2 bg-green-400 p-2 rounded-md"
						height="12"
						width="12"
						@click="refresh()"
						src="@/assets/images/feather/refresh-ccw.svg"
					/>
					Last updated at {{ sheetWasUpdatedAt }}
				</div>
			</div>
		</div>
		<div class="flex flex-wrap py-1 bg-black">
			<template v-for="(ash, a) in allSheetData" :key="a">
				<div
					class="px-4 py-2 text-sm  hover:bg-yellow-400 hover:text-black border-4 border-black"
					@click="selectSheet(ash)"
					:class="{
						'bg-yellow-400 text-black':
							ash.feed.title.$t == sheetData.feed.title.$t,
						'text-gray-400 bg-gray-900':
							ash.feed.title.$t != sheetData.feed.title.$t
					}"
				>
					{{
						ash.feed.title.$t
							.replace(/[^a-zA-Z ]/g, " ")
							.toUpperCase()
					}}
				</div>
			</template>
		</div>
		<div class="bg-gray-800 p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2">
			<div
				class="w-full flex flex-col md:flex-row flex-wrap"
				v-if="sheetData.feed != undefined"
			>
				<div
					class="px-4 py-2 mb-2 mr-2 bg-green-400 rounded-md"
					v-for="(c, i) in column_names"
					:key="i"
				>
					<div class=" break-words" @click="show_hide_dropdown(c)">
						<div
							class="md:text-lg text-white font-bold flex flex-row items-center justify-between"
						>
							{{ c.value }}
							<img
								class="w-6 h-6 ml-4 filter invert"
								height="12"
								width="12"
								v-if="uniques_selected[c.column_num].show"
								src="@/assets/images/feather/chevron-up.svg"
							/>
							<img
								class="w-6 h-6 ml-4 filter invert"
								height="12"
								width="12"
								v-else
								src="@/assets/images/feather/chevron-down.svg"
							/>
						</div>
						<div class="text-sm text-green-800">
							{{ c.search.result.length }} unique items
						</div>
					</div>
					<div class="relative ">
						<div
							class="w-10 h-10 rounded-md bg-black absolute -top-2 left-2 z-40 transform rotate-45"
							v-if="uniques_selected[c.column_num].show"
						></div>
						<div
							class="flex flex-col bg-black p-2 rounded-xl absolute top-0 left-0 z-50"
							v-if="uniques_selected[c.column_num].show"
						>
							<input
								class="min-w-128 px-4 py-2 bg-gray-700 text-white  rounded-md"
								v-model="c.search.query"
								@keyup="searchUniques(c)"
								placeholder="Write here to search"
							/>
							<div
								class="min-w-128 px-4 py-2 mt-2 bg-white bg-opacity-10 text-white break-words rounded-md"
								:class="{
									'bg-green-500 bg-opacity-100':
										uniques_selected[c.column_num].value ==
										u
								}"
								@click="filterData(c, u)"
								v-for="(u, k) in c.search.result"
								:key="k"
							>
								{{ u }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="flex flex-col col-span-1 mt-6"
				v-if="sheetData.feed != undefined"
			>
				<!-- md:flex-row items-center justify-between -->
				<!-- {{ uniques_selected }} -->
				<div class="text-2xl font-bold font-pop-bold text-white ">
					Showing data in
					{{
						sheetData.feed.title.$t
							.replace(/[^a-zA-Z ]/g, " ")
							.toUpperCase()
					}}
				</div>
				<input
					class="w-full md:w-1/2 px-4 py-4 mt-6 text-white bg-gray-700 rounded-md"
					placeholder="Write here to search"
					v-model="uniques_selected.search.value"
				/>

				<br />
				<div class="w-full flex flex-wrap">
					<div
						v-for="unq in Object.keys(uniques_selected)"
						:key="unq"
					>
						<div
							class="w-max flex flex-col md:flex-row mr-2 mb-2 bg-yellow-500 md:rounded-md"
							v-if="
								uniques_selected[unq].value.length > 0 &&
									unq != 'search'
							"
						>
							<div class="px-4 py-1 text-yellow-800">
								{{ columns[unq] }}
							</div>
							<div
								class="text-black flex flex-row items-center justify-between md:justify-start px-4 py-1 bg-yellow-400 md:rounded-md"
							>
								{{ uniques_selected[unq].value }}
								<img
									@click="uniques_selected[unq].value = ''"
									class="pl-2"
									src="@/assets/images/feather/x.svg"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full p-2" v-if="sheetData.feed != undefined">
			<div
				class="w-full  font-medium text-gray-500 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6"
			>
				<template v-for="(r, i) in rows" :key="'time_' + i">
					<div
						class="px-6 py-2 2xl:p-6 bg-gray-800 mt-6 rounded-md grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 items-start"
						v-if="searchInRow(r)"
					>
						<template v-for="(c, i) in r" :key="i">
							<div
								class="p-2 "
								v-if="columns[c.cell.col] != undefined"
							>
								<div class="text-xs break-words">
									{{ columns[c.cell.col] }}
								</div>
								<div
									class="mt-2 flex flex-row items-center break-words text-lg font-bold bg-red-500 px-2 py-1 text-white rounded-lg"
									v-if="
										columns[c.cell.col]
											.toLowerCase()
											.indexOf('contact') != -1 &&
											columns[c.cell.col]
												.toLowerCase()
												.indexOf('number') != -1
									"
								>
									<img
										class="w-6 h-6 mr-4 filter invert"
										height="12"
										width="12"
										src="@/assets/images/feather/phone-call.svg"
									/>
									<a :href="'tel:' + c.value">
										<div class=" break-words">
											{{ c.value }}
										</div>
									</a>
								</div>
								<div
									class="flex flex-row text-gray-300 items-center break-words mt-2"
									v-else
								>
									{{ c.value }}
								</div>
								<div
									class="text-red-400"
									style="font-size:11px;"
									v-if="
										columns[c.cell.col]
											.toLowerCase()
											.indexOf('status') != -1
									"
								>
									Last Updated At:
									{{
										new Date(
											c.parent.updated.$t
										).toLocaleString()
									}}
								</div>
							</div>
						</template>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import LandingDashboard from "../Layout/LandingDashboard";
import db from "../../db/idb";
export default {
	// props: ["sheet"],
	components: {
		LandingDashboard
	},
	data() {
		return {
			sheetWasUpdatedAt: "",
			sheetData: {},
			columns: {},
			column_names: [],
			rows: [],
			uniques_selected: {
				search: {
					value: "",
					show: false
				}
			},
			sheet: 1,
			count: 1,
			sheets: [],
			allSheetData: [],
			titles: [],
			window: null,
			loading: true
		};
	},
	watch: {
		allSheetData(newObj, oldObj) {
			// console.log(newObj);
		}
	},
	methods: {
		getSheetURL(count) {
			return (
				"https://spreadsheets.google.com/feeds/cells/11zkegb8A1FBMx9_O9nG6gadnKBhZe-r7-Grzj3oB09w/" +
				count +
				"/public/full?alt=json"
			);
		},
		selectSheet(data) {
			this.columns = {};
			this.column_names = [];
			this.rows = [];
			this.uniques_selected = {
				search: {
					value: "",
					show: false
				}
			};
			this.sheetData = data;
			this.processData();
		},
		httpGetAsync(url) {
			console.log("XHR GET", url);
			return new Promise((resolve, reject) => {
				var xmlHttp = new XMLHttpRequest();
				xmlHttp.onreadystatechange = function() {
					if (this.status == 400) {
						this.loading = false;
					}
					if (this.readyState == 4 && this.status == 200)
						resolve(this.responseText);
				};
				xmlHttp.open("GET", url, true); // true for asynchronous
				xmlHttp.onloadend = function() {
					if (xmlHttp.status != 200) reject(xmlHttp.status);
				};
				// try {
				xmlHttp.send(null);
				// } catch (err) {
				// 	console.error(err);
				// 	this.loading = false;
				// }
			});
		},
		show_hide_dropdown(c) {
			if (this.uniques_selected[c.column_num].show == false) {
				this.column_names.map((column) => {
					this.uniques_selected[column.column_num].show = false;
				});
			}
			this.uniques_selected[c.column_num].show = !this.uniques_selected[
				c.column_num
			].show;
		},
		searchInRow(r) {
			var searchString = "";
			var searchers = 0;
			var keys = Object.keys(this.uniques_selected);
			keys.map((unq) => {
				searchString += this.uniques_selected[unq].value;
				if (this.uniques_selected[unq].value.length > 0) {
					searchers += 1;
				}
			});
			if (
				searchString.length > 0 ||
				this.uniques_selected.search.value.length > 0
			) {
				var matched = 0;
				var stg = "";
				r.map((row) => {
					stg += row.value.toLowerCase();
					// console.log(
					// 	"search.value",
					// 	row.value.toLowerCase(),
					// 	this.uniques_selected.search.value.toLowerCase(),
					// 	this.uniques_selected[row.cell.col].value.toLowerCase()
					// );
					if (
						row.value.toLowerCase() ==
						this.uniques_selected[row.cell.col].value.toLowerCase()
					) {
						matched += 1;
					}
				});
				if (this.uniques_selected.search.value.length > 0) {
					// console.log(stg);
					if (
						stg.indexOf(
							this.uniques_selected.search.value.toLowerCase()
						) != -1
					) {
						matched += 1;
					}
				}
				return matched >= searchers;
			}
			// return r.length > this.column_names.length / 2;
			return r.length > 0;
		},
		searchUniques(c) {
			c.search.result = [];
			c.uniques.map((item) => {
				if (
					item.toLowerCase().indexOf(c.search.query.toLowerCase()) !=
					-1
				) {
					c.search.result.push(item);
				}
			});
			if (c.search.query.length == 0) {
				c.search.result = c.uniques;
			}
		},
		filterData(c, u) {
			this.uniques_selected[c.column_num].value = u;
			this.uniques_selected[c.column_num].show = false;
		},
		processData() {
			var entries = this.sheetData.feed.entry;
			var row_list = [];
			var old_r = 1;
			entries.map((cell) => {
				var value = cell["gs$cell"].inputValue;
				var col = cell["gs$cell"].col;
				var row = cell["gs$cell"].row;
				if (old_r != row) {
					old_r = row;
					this.rows.push(row_list);
					row_list = [];
				}
				// if (row == "2" && col == "1") {
				// 	console.log(
				// 		JSON.stringify(this.column_names, undefined, 4)
				// 	);
				// 	console.log(
				// 		JSON.stringify(this.uniques_selected, undefined, 4)
				// 	);
				// 	console.log(JSON.stringify(this.columns, undefined, 4));
				// }
				if (row == "1") {
					this.column_names.push({
						value: value,
						column_num: col,
						uniques: [],
						search: {
							query: "",
							result: []
						}
					});
					this.uniques_selected[col] = {
						value: "",
						show: false
					};
					this.columns[col] = value;
				} else {
					row_list.push({
						value: value,
						cell: cell["gs$cell"],
						parent: cell
					});
					// console.log(
					// 	parseInt(col) - 1,
					// 	col,
					// 	this.column_names[parseInt(col) - 1]
					// );
					if (parseInt(col) - 1 < this.column_names.length)
						if (
							this.column_names[
								parseInt(col) - 1
							].uniques.indexOf(value) == -1
						) {
							this.column_names[parseInt(col) - 1].uniques.push(
								value
							);
							this.column_names[
								parseInt(col) - 1
							].search.result.push(value);
							// if (
							// 	this.column_names[parseInt(col) - 1].uniques
							// 		.length > 0
							// ) {
							// 	// this.column_names[parseInt(col) - 1].uniques[0]
							// 	this.uniques_selected[col] = {
							// 		value: "",
							// 		show: false
							// 	};
							// }
						}
				}
			});
		},
		async saveSheetToIDB(data) {
			await this.$store.dispatch("saveSheet", data);
		},
		getSheetData(count) {
			this.httpGetAsync(this.getSheetURL(count))
				.then((response) => {
					var data = JSON.parse(response);
					var id = data.feed.id.$t;
					this.sheets.push(count);
					console.log(count, id);
					this.allSheetData.push(data);
					this.saveSheetToIDB(data);
					this.window.localStorage.setItem(
						"sheetUpdatedAt",
						new Date()
					);
					if (count == 3) {
						this.sheetData = data;
						this.processData();
					}
					if (data.feed != undefined) {
						var title = data.feed.title["$t"].replace(
							/[^a-zA-Z ]/g,
							" "
						);
						console.log(title);
						this.titles.push(title);
						this.count += 1;
						this.getSheetData(this.count);
					}
				})
				.catch((error) => {
					console.error(error);
					this.loading = false;
				});
		},
		updateData() {
			db.getSheets()
				.then((result) => {
					this.allSheetData = result;
					console.log(result);
					if (this.allSheetData.length < 1) {
						this.getSheetData(this.count);
					} else {
						this.loading = false;
					}
					this.sheetData = result[0];
					this.processData();
				})
				.catch((err) => {
					console.error(err);
				});
		},
		refresh() {
			this.loading = true;
			this.sheetData = {};
			this.columns = {};
			this.column_names = [];
			this.rows = [];
			this.uniques_selected = {
				search: {
					value: "",
					show: false
				}
			};
			this.count = 1;
			this.sheets = [];
			this.allSheetData = [];
			this.titles = [];
			db.getSheets().then((result) => {
				result.map((sheetData) => {
					db.deleteSheet(sheetData);
				});
			});
			this.getSheetData(this.count);
		}
	},
	mounted() {
		this.window = window;
		// window.localStorage.setItem("sheetUpdatedAt", new Date());
		if (
			window.localStorage.getItem("sheetUpdatedAt") == null ||
			window.localStorage.getItem("sheetUpdatedAt").length < 10
		) {
			this.updateData();
		} else {
			var sheetUpdatedAt = new Date(
				window.localStorage.getItem("sheetUpdatedAt")
			);
			this.sheetWasUpdatedAt = sheetUpdatedAt.toLocaleString();
			var dateNow = new Date();
			// console.log(dateNow.getTime() - sheetUpdatedAt.getTime());
			// console.log(
			// 	(dateNow.getTime() - sheetUpdatedAt.getTime()) / 60000,
			// 	"minutes"
			// );
			db.getSheets().then((result) => {
				if (
					dateNow.getTime() - sheetUpdatedAt.getTime() > 900000 ||
					result.length < 30
				) {
					result.map((sheetData) => {
						db.deleteSheet(sheetData);
					});
				}
				this.updateData();
			});
		}
	}
};
</script>
