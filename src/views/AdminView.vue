<script setup lang="ts">
import { computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'

const store = useCatalogStore()
const bestSeller = computed(() => store.popularProduct)
const totalRevenue = computed(() => store.revenue)
const salesChart = computed(() => store.salesByProduct.slice(0, 5))
</script>

<template>
  <section class="py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 fw-bold mb-1">Panel de administración</h1>
        <p class="text-muted mb-0">Monitorea tus ventas y el estado del inventario en tiempo real.</p>
      </div>
      <span class="badge text-bg-success px-3 py-2 rounded-pill">Dashboard activo</span>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-3 h-100">
          <p class="text-muted mb-2">Productos en catálogo</p>
          <h2 class="fw-bold">{{ store.products.length }}</h2>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-3 h-100">
          <p class="text-muted mb-2">Producto más vendido</p>
          <h4 class="fw-bold">{{ bestSeller?.name ?? 'Sin ventas' }}</h4>
          <p class="mb-0 text-muted">{{ bestSeller?.sold ?? 0 }} unidades vendidas</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-3 h-100">
          <p class="text-muted mb-2">Ingresos totales</p>
          <h2 class="fw-bold">Bs. {{ totalRevenue.toLocaleString('es-BO') }}</h2>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 p-3">
      <h3 class="h5 fw-semibold mb-3">Gráfica de ventas</h3>
      <div class="row g-3">
        <div v-for="item in salesChart" :key="item.id" class="col-md-6 col-lg-4">
          <div class="border rounded-4 p-3">
            <div class="d-flex justify-content-between mb-2">
              <strong>{{ item.name }}</strong>
              <span class="text-primary">{{ item.sold }} ventas</span>
            </div>
            <div class="progress" style="height: 10px">
              <div class="progress-bar bg-primary" :style="{ width: `${Math.min((item.sold / 35) * 100, 100)}%` }"></div>
            </div>
            <p class="small text-muted mt-2 mb-0">Ingresos: Bs. {{ (item.sold * item.price).toLocaleString('es-BO') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
