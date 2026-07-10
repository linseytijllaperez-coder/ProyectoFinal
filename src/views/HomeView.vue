<script setup lang="ts">
import { computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { RouterLink } from 'vue-router'

const store = useCatalogStore()
const featured = computed(() => store.products.slice(0, 3))
</script>

<template>
  <section class="hero-section rounded-4 p-4 p-lg-5 shadow">
    <div class="row align-items-center g-4">
      <div class="col-lg-7">
        <span class="badge text-bg-warning px-3 py-2 rounded-pill mb-3">Tecnología premium en Oruro</span>
        <h1 class="display-5 fw-bold mb-3">Compra equipos modernos para trabajar, crear y jugar.</h1>
        <p class="lead text-muted mb-4">
          En ByteOruro encontrarás laptops, PCs, monitores y accesorios con atención personalizada y entrega rápida en la ciudad y alrededores.
        </p>
        <div class="d-flex flex-wrap gap-3">
          <RouterLink class="btn btn-primary btn-lg" to="/catalogo">Explorar catálogo</RouterLink>
          <RouterLink class="btn btn-outline-light btn-lg" to="/admin">Ver panel</RouterLink>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="glass-card p-4 rounded-4">
          <h3 class="fw-semibold mb-3">¿Qué incluye tu experiencia?</h3>
          <ul class="list-unstyled mb-0">
            <li class="mb-2">✓ Asesoría técnica especializada</li>
            <li class="mb-2">✓ Envíos a domicilio en Oruro</li>
            <li class="mb-2">✓ Garantía y soporte postventa</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="mt-5">
    <div class="row g-4">
      <div v-for="product in featured" :key="product.id" class="col-md-4">
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
          <img :src="product.image" :alt="product.name" class="card-img-top" style="height: 220px; object-fit: cover" />
          <div class="card-body">
            <p class="text-primary fw-semibold mb-2">{{ product.category }}</p>
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-muted">{{ product.description }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="fw-bold">Bs. {{ product.price.toLocaleString('es-BO') }}</span>
              <button class="btn btn-outline-primary btn-sm" @click="store.addToCart(product.id)">Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
