<template>
	<div class="w-full">
		<!-- <div
			class="bg-blue-800 py-3 px-5 flex flex-row justify-between fixed z-50 w-full"
		>
			<router-link to="/">
				<div class="flex flex-row ">
					<div
						class="place-self-center font-pop-med text-2xl text-white px-2 c-b"
					>
						COVID Information Desk
					</div>
				</div>
			</router-link>
			<button class="focus:outline-none" @click="isShowing = !isShowing">
				<img
					class="filter invert "
					src="@/assets/images/iconmonstr-menu-thin.svg"
				/>
			</button>
		</div> -->
		<div class="relative min-h-screen flex flex-row">
			<!--  -->

			<div
				v-show="isShowing"
				class="bg-blue-800 w-64 px-5 pt-10 min-h-screen fixed z-30"
			>
				<div class="pt-10">
					<router-link to="/ambulance">
						<div
							class="py-3 px-2 text-poppins-medium text-sm lg:text-xl cursor-pointer hover:bg-blue-400 text-white"
						>
							Ambulance
						</div>
					</router-link>
					<router-link to="/bed">
						<div
							class="py-3 px-2 text-poppins-medium text-sm lg:text-xl cursor-pointer hover:bg-blue-400 text-white"
						>
							Beds
						</div>
					</router-link>
					<router-link to="/covid-test">
						<div
							class="py-3 px-2 text-poppins-medium text-sm lg:text-xl cursor-pointer hover:bg-blue-400 text-white"
						>
							Covid Testing
						</div>
					</router-link>
					<router-link to="/doctors">
						<div
							class="py-3 px-2 text-poppins-medium text-sm lg:text-xl cursor-pointer hover:bg-blue-400 text-white"
						>
							Doctor's Helpline
						</div>
					</router-link>
					<router-link to="/medicines">
						<div
							class="py-3 px-2 text-poppins-medium text-sm lg:text-xl cursor-pointer hover:bg-blue-400 text-white"
						>
							Medicines
						</div>
					</router-link>
					<router-link to="plasma">
						<div
							class="py-3 px-2 text-poppins-medium text-sm lg:text-xl cursor-pointer hover:bg-blue-400 text-white"
						>
							Plasma Blood
						</div>
					</router-link>
					<router-link to="oxygen">
						<div
							class="py-3 px-2 text-poppins-medium text-sm lg:text-xl cursor-pointer hover:bg-blue-400 text-white"
						>
							Oxygen
						</div>
					</router-link>
					<router-link to="/food">
						<div
							class="py-3 px-2 text-poppins-medium text-sm lg:text-xl cursor-pointer hover:bg-blue-400 text-white"
						>
							Food
						</div>
					</router-link>
					<router-link to="volunteers">
						<div
							class="py-3 px-2 text-poppins-medium text-sm lg:text-xl cursor-pointer hover:bg-blue-400 text-white"
						>
							Volunteers
						</div>
					</router-link>
					<router-link to="/home-care">
						<div
							class="py-3 px-2 text-poppins-medium text-sm lg:text-xl cursor-pointer hover:bg-blue-400 text-white"
						>
							Quarantize & Home Care
						</div>
					</router-link>
				</div>
			</div>
			<div class="w-full py-24 lg:px-6 bg-white">
				<div class="mx-auto">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isShowing: false
		};
	}
};
</script>

<style scoped>
.wrapper {
	position: fixed;
	overflow: hidden;
	height: 100vh;
}
</style>
