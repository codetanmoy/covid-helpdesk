<template>
	<div class="w-full py-5 bg-transparent bg-scroll fixed">
		<div class="container mx-auto px-5">
			<div class="flex flex-row justify-between">
				<router-link to="/">
					<div class="flex flex-row">
						<img
							class="h-12"
							src="@/assets/images/Coronavirus.svg"
						/>
						<div
							class="place-self-center text-bangers-regular text-2xl tracking-widest px-2 c-b"
						>
							COVID
						</div>
					</div>
				</router-link>
				<router-link to="/ambulance">
					<button
						class="focus:outline-none w-48 px-2 py-3 dashboard-button rounded-2xl text-poppins-medium text-lg"
					>
						Go to Dashboard
					</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<style scoped>
.c-b {
	color: #edeef7;
}
</style>
