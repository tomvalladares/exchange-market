<script setup>
import { onMounted } from 'vue'
import { useExchangeStore } from '@/stores/exchange'
import { useUserStore } from '@/stores/user'
import Topbar from './components/topbar.vue'

const exchangeStore = useExchangeStore()
const userStore = useUserStore()

onMounted(async () => {

	// fetch if user has an exchange in pending
	await fetchExchange()
})

async function fetchExchange() {

	try {
		// TODO send user id from db, for test purposes only 0
		const response = await fetch(`http://localhost:3000/api/exchange?userId=${userStore.user.userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await response.json()
		if (data.status === 'success' && data.exchanges.length > 0) {
			// Store the exchanges in your store
			// FOR DEMO PURPOSES ONLY, we are setting the first exchange in the array
			exchangeStore.setExchange(data.exchanges[0])
		}

	} catch (error) {
		console.error('Error fetching exchanges:', error)
	}
}
</script>

<template lang="pug">

.layout-canvas
	.container-canvas
		Topbar
		RouterView(v-slot="{ Component }").view-canvas
			Transition(name="fade" mode="out-in")
				component(:is="Component")
</template>

<style scoped lang="stylus">
.layout-canvas
	width 100%
	min-height inherit

	.container-canvas
		display flex
		flex-direction column
		width 100%
		min-height inherit

		.view-canvas
			flex 1 1 auto
			width 100%
			max-width 700px
			margin 0 auto

.fade-enter-active,
.fade-leave-active
	transition: opacity 0.3s ease

.fade-enter-from,
.fade-leave-to
	opacity: 0
</style>