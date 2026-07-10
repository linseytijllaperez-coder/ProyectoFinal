import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  sold: number
  category: string
  description: string
  badge: string
  image: string
}

interface CartItem {
  product: Product
  quantity: number
}

export const useCatalogStore = defineStore('catalog', () => {
  const products = ref<Product[]>([
    {
      id: 1,
      name: 'Laptop Pro Max 14',
      price: 13250,
      stock: 8,
      sold: 24,
      category: 'Laptops',
      description: 'Diseño ultraligero para estudio y trabajo remoto.',
      badge: 'Nueva',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 2,
      name: 'PC Gamer Aurora',
      price: 18900,
      stock: 5,
      sold: 18,
      category: 'PC de escritorio',
      description: 'Equipo potente para edición, streaming y gaming.',
      badge: 'Top',
      image: 'https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 3,
      name: 'Monitor 27" 4K',
      price: 5900,
      stock: 12,
      sold: 11,
      category: 'Monitores',
      description: 'Pantalla nítida con excelente color para diseño.',
      badge: 'Oferta',
      image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 4,
      name: 'Teclado Mecánico RGB',
      price: 1450,
      stock: 20,
      sold: 35,
      category: 'Accesorios',
      description: 'Respuesta rápida y sensación premium para tus jornadas.',
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 5,
      name: 'Tablet Pro 12',
      price: 7800,
      stock: 7,
      sold: 16,
      category: 'Tablets',
      description: 'Ideal para productividad, dibujo y entretenimiento.',
      badge: 'Recomendado',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 6,
      name: 'Router Wi-Fi 6',
      price: 1100,
      stock: 15,
      sold: 9,
      category: 'Red',
      description: 'Conexión estable para oficinas y hogares modernos.',
      badge: 'Nuevo',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
    }
  ])

  const cart = ref<CartItem[]>([])

  const addToCart = (productId: number) => {
    const product = products.value.find((item) => item.id === productId)
    if (!product || product.stock <= 0) return false

    const existing = cart.value.find((item) => item.product.id === productId)
    if (existing) {
      if (existing.quantity >= product.stock) return false
      existing.quantity += 1
    } else {
      cart.value.push({ product, quantity: 1 })
    }

    product.stock -= 1
    product.sold += 1
    return true
  }

  const removeFromCart = (productId: number) => {
    const existing = cart.value.find((item) => item.product.id === productId)
    if (!existing) return

    const product = products.value.find((item) => item.id === productId)
    if (product) {
      product.stock += 1
      product.sold -= 1
    }

    if (existing.quantity > 1) {
      existing.quantity -= 1
    } else {
      cart.value = cart.value.filter((item) => item.product.id !== productId)
    }
  }

  const clearCart = () => {
    cart.value.forEach((item) => {
      const product = products.value.find((entry) => entry.id === item.product.id)
      if (product) {
        product.stock += item.quantity
        product.sold -= item.quantity
      }
    })
    cart.value = []
  }

  const totalItems = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0))
  const inventoryCount = computed(() => products.value.reduce((sum, item) => sum + item.stock, 0))
  const popularProduct = computed(() => [...products.value].sort((a, b) => b.sold - a.sold)[0] ?? null)
  const revenue = computed(() => products.value.reduce((sum, item) => sum + item.sold * item.price, 0))
  const salesByProduct = computed(() =>
    [...products.value]
      .map((item) => ({ ...item, revenue: item.sold * item.price }))
      .sort((a, b) => b.sold - a.sold)
  )

  return {
    products,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    inventoryCount,
    popularProduct,
    revenue,
    salesByProduct
  }
})
