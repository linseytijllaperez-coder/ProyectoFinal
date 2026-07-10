<script setup lang="ts">
import { useCatalogStore } from '../stores/catalog'

const store = useCatalogStore()
</script>

<template>
  <section class="py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 fw-bold mb-1">Catálogo</h1>
        <p class="text-muted mb-0">Descubre equipos tecnológicos pensados para cada necesidad.</p>
      </div>
      <span class="badge text-bg-primary px-3 py-2 rounded-pill">{{ store.products.length }} productos</span>
    </div>

    <div class="row g-4">
      <div v-for="product in store.products" :key="product.id" class="col-lg-4 col-md-6">
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
          <img :src="product.image" :alt="product.name" class="card-img-top" style="height: 220px; object-fit: cover" />
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <span class="badge text-bg-light text-primary">{{ product.badge }}</span>
                <h5 class="card-title mt-2 mb-1">{{ product.name }}</h5>
              </div>
              <span class="text-muted small">{{ product.category }}</span>
            </div>
            <p class="text-muted flex-grow-1">{{ product.description }}</p>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="fw-bold">Bs. {{ product.price.toLocaleString('es-BO') }}</span>
              <span class="small text-muted">Stock: {{ product.stock }}</span>
            </div>
            <button class="btn btn-primary w-100" :disabled="product.stock <= 0" @click="store.addToCart(product.id)">
              {{ product.stock > 0 ? 'Agregar al carrito' : 'Sin stock' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
