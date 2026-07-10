<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useCatalogStore } from './stores/catalog'

const store = useCatalogStore()
const cartCount = computed(() => store.totalItems)
</script>

<template>
  <div class="min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm" style="background: rgba(4, 14, 24, 0.95)">
      <div class="container">
        <RouterLink class="navbar-brand fw-bold fs-4" to="/">ByteOruro</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li class="nav-item"><RouterLink class="nav-link" to="/">Inicio</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/nosotros">Nosotros</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/catalogo">Catálogo</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/carrito">Carrito ({{ cartCount }})</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/admin">Admin</RouterLink></li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container py-4">
      <RouterView />
    </main>
  </div>
</template>
