import axios from 'axios'
import store from '../store'
import router from '../router'
import swal from 'sweetalert2'

// Request interceptor
axios.interceptors.request.use(request => {
  const token = store.getters['auth/token']
  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
  }

  return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  const { status } = error.response

  if (status >= 500) {
    swal({
      type: 'error',
      title: 'Ha ocurrido un problema',
      text: '¡Algo salió mal! Inténtalo de nuevo.',
      reverseButtons: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })
  }

  if (status === 401 && store.getters['auth/check']) {
    swal({
      type: 'warning',
      title: '!Sesión Expirada!',
      text: 'Por favor inicie sesión de nuevo para continuar.',
      reverseButtons: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(async () => {
      await store.dispatch('auth/logout')

      router.push({ name: 'home' })
    })
  }

  return Promise.reject(error)
})
