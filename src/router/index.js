import { createRouter, createWebHistory } from "vue-router";
import Page from "@/components/PublicPages/Page.vue";

const routes = [
	{
		path: "/",
		name: "Page",
		component: Page,
		props: true
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
