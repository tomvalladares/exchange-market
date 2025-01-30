<script setup>
import { computed } from 'vue'
import CreateExchange from '@/components/CreateExchange.vue'
import ResumeExchange from '@/components/ResumeExchange.vue'
import MatchedExchange from '@/components/MatchedExchange.vue'

import { useExchangeStore } from '@/stores/exchange'
import { storeToRefs } from 'pinia'

const exchangeStore = useExchangeStore()
const { exchange } = storeToRefs(exchangeStore)


</script>

<template lang="pug">
	main.home-view
		//- creation view
		//- this should be handle by routes
		MatchedExchange(v-if="exchangeStore.hasExchangeMatched && !exchangeStore.hasExchangePending")
		ResumeExchange(v-else-if="exchangeStore.hasExchangePending && !exchangeStore.hasExchangeMatched")
		CreateExchange(v-else)

</template>


<style scoped lang="stylus">
	.home-view
		height inherit
		max-width 800px
		margin 0 auto
</style> 