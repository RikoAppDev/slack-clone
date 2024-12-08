import { defineStore } from 'pinia'

interface NetworkState {
  isOnline: boolean
}

export const useNetworkStore = defineStore('network', {
  state: (): NetworkState => ({
    isOnline: navigator.onLine
  }),

  actions: {
    setOnlineStatus(status: boolean) {
      this.isOnline = status
    },

    init() {
      window.addEventListener('online', () => {
        this.setOnlineStatus(true)
      })

      window.addEventListener('offline', () => {
        this.setOnlineStatus(false)
      })
    }
  }
})
