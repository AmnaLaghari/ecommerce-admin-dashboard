<template>
    <div class="container mt-5">
    <div class="card ms-5"
    >
      <div class="card-header text-center">
        <strong>Add new Product</strong>
      </div>
      <div class="card-body">
        <div class="form-group">
          <form @submit.prevent="submitProduct">
            <div class="mb-3">
              <label class="form-label">Name:</label>
              <input type="text" class="form-control" v-model="product.name" required />
            </div>
      
            <div class="mb-3">
              <label class="form-label">Description:</label>
              <textarea type="text" class="form-control" v-model="product.description" required></textarea>
            </div>
      
            <div class="mb-3">
              <label class="form-label">Price:</label>
              <input type="number" class="form-control" v-model="product.price" required />
            </div>
      
            <div class="mb-3">
              <label class="form-label">Stock:</label>
              <input type="number" class="form-control" v-model="product.stock" required />
            </div>

            <div class="mb-3">
              <label for="category" class="form-label">Category:</label>
              <select v-model="product.category" required class="form-control" id="category">
                <option disabled value="">Select category</option>
                <option>Men's Fashion</option>
                <option>Women's Fashion</option>
                <option>Home and kitchen</option>
                <option>Electronics</option>
                <option>Health</option>
              </select>
            </div>
      
            <div class="mb-3">
              <label class="form-label">Image:</label>
              <input type="file" class="form-control" @change="handleImageUpload" name="images"/>
            </div>
      
            <div class="mb-3" v-if="imagePreview">
              <h4>Image Preview:</h4>
              <img :src="imagePreview" alt="preview" style="max-width: 150px;" />
            </div>
      
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const product = ref({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    images: null
  })
  
  const imagePreview = ref(null)
  
  function handleImageUpload(event) {
    const file = event.target.files[0]
    console.log(file)
    if (file) {
      product.value.images = file
      imagePreview.value = URL.createObjectURL(file)
    }
  }
  
  async function submitProduct() {
    console.log(product)
    const formData = new FormData()
    formData.append('name', product.value.name)
    formData.append('description', product.value.description)
    formData.append('price', product.value.price)
    formData.append('stock', product.value.stock)
    formData.append('category', product.value.category)
    formData.append('images', product.value.images)

    try {
      console.log(formData)
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: formData
      })
  
      if (res.ok) {
        alert('Product added successfully!')

        product.value = {
          name: '',
          description: '',
          price: 0,
          stock: 0,
          category: '',
        }
        imagePreview.value = null
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) fileInput.value = ''
      } else {
        alert('Failed to add product.')
      }
    } catch (err) {
      console.error(err)
      alert('Error occurred.')
    }
  }
  </script>
  