<template>
	<div>
		<Navbar></Navbar>
		<div class="h-screen page-background">
			<div class="">
				<div
					class="container mx-auto py-28 lg:py-36 xl:py-48 px-10 lg:px-14"
				>
					<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
						<div class="col-span-2">
							<div
								class="text-poppins-medium text-lg px-2 py-3 w-56 earth-cheap rounded-2xl text-center text-white"
							>
								Get Well Soon, Earth!
							</div>
							<div
								class="py-5 text-poppins-bold text-5xl lg:text-6xl xl:text-7xl color-1"
							>
								Let's Help<br />
								Recover The Earth,<br />
								<span>Starts From Us!</span>
							</div>
							<div
								class="pt-5 pb-10 text-lato-regular color-2 text-2xl"
							>
								The outbreak of the Coronavirus issue or<br />
								called Covid-19 makes the Earth grieve.
							</div>
							<router-link to="/ambulance">
								<button
									class="focus:outline-none w-48 px-2 py-3 dashboard-button rounded-2xl text-poppins-medium text-lg"
								>
									Go to Dashboard
								</button>
							</router-link>
						</div>
						<div>
							<img
								class="lg:h-96"
								src="@/assets/images/health-solution.svg"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "../Common/Navbar";
export default {
	components: {
		Navbar
	}
};
</script>

<style scoped>
.color-1 {
	color: #edeef7;
}
.color-2 {
	color: #e4fbff;
}
.earth-cheap {
	background: #5d2abc;
	/* background: rgb(246, 81, 102); */
}
</style>
