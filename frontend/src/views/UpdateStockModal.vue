<template>
  <div v-if="showModal" class="stock-update-modal-backdrop">
		<div class="stock-update-modal-content">
			<h5>Update Stock for {{ selectedProduct.name }}</h5>

			<input
				type="number"
				v-model.number="selectedProduct.stock"
				class="form-control my-3"
				min="0"
			/>

			<div class="d-flex justify-content-end">
				<button class="btn btn-secondary me-2" @click="closeModal">Cancel</button>
				<button class="btn btn-primary" @click="saveStock">Update</button>
			</div>
		</div>
	</div>
</template>	

<script setup>
	const props = defineProps({
		showModal: Boolean,
		selectedProduct: Object
	})

	const emit = defineEmits(['close', 'save'])

	function closeModal() {
		emit('close')
	}

	function saveStock() {
		emit('save', props.selectedProduct)
	}
</script>
