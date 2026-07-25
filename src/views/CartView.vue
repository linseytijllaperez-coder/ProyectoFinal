<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCatalogStore } from '../stores/catalog'

const store = useCatalogStore()
const subtotal = computed(() => store.totalPrice)
const paymentAccount = ref('')
const paymentError = ref('')
const purchaseCompleted = ref(false)

const finishPurchase = () => {
  if (!paymentAccount.value.trim()) {
    paymentError.value = 'Ingresa una cuenta para poder completar la compra.'
    purchaseCompleted.value = false
    return
  }

  paymentError.value = ''
  purchaseCompleted.value = true
  store.clearCart()
  paymentAccount.value = ''
}
</script>

<template>
  <section class="py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 fw-bold mb-1">Carrito de compras</h1>
        <p class="text-muted mb-0">Revisa tus productos y calcula el total antes de finalizar.</p>
      </div>
      <span class="badge text-bg-primary px-3 py-2 rounded-pill">{{ store.totalItems }} artículos</span>
    </div>

    <div v-if="store.cart.length" class="row g-4">
      <div class="col-lg-8">
        <div v-for="item in store.cart" :key="item.product.id" class="card border-0 shadow-sm rounded-4 mb-3">
          <div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h5 class="mb-1">{{ item.product.name }}</h5>
              <p class="text-muted mb-0">Bs. {{ item.product.price.toLocaleString('es-BO') }} c/u</p>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-outline-secondary btn-sm" @click="store.removeFromCart(item.product.id)">-</button>
              <span class="fw-semibold">{{ item.quantity }}</span>
              <button class="btn btn-outline-primary btn-sm" @click="store.addToCart(item.product.id)">+</button>
            </div>
            <div class="fw-bold">Bs. {{ (item.product.price * item.quantity).toLocaleString('es-BO') }}</div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-3">
          <h4 class="h5 fw-semibold mb-3">Resumen</h4>
          <div class="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>Bs. {{ subtotal.toLocaleString('es-BO') }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <hr />
          <div class="d-flex justify-content-between fw-bold fs-5">
            <span>Total</span>
            <span>Bs. {{ subtotal.toLocaleString('es-BO') }}</span>
          </div>

          <div class="mt-4">
            <label for="payment-account" class="form-label fw-semibold">Cuenta para pagar</label>
            <input
              id="payment-account"
              v-model="paymentAccount"
              type="text"
              class="form-control"
              placeholder="Ej. 123456789"
              @input="paymentError = ''"
            />
            <p v-if="paymentError" class="text-danger small mt-2 mb-0">{{ paymentError }}</p>
            <p v-else-if="purchaseCompleted" class="text-success small mt-2 mb-0">
              Compra realizada correctamente. Gracias por tu pago.
            </p>
          </div>

          <button class="btn btn-success w-100 mt-4" @click="finishPurchase()">Finalizar compra</button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <h3 class="fw-semibold mb-2">Tu carrito está vacío</h3>
      <p class="text-muted">Agrega productos desde el catálogo para ver el total aquí.</p>
      <router-link class="btn btn-primary" to="/catalogo">Ir al catálogo</router-link>
    </div>
  </section>
</template>
