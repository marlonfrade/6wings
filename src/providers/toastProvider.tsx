'use client'

import { Toaster, ToasterProps } from 'react-hot-toast'

export const ToastProvider = () => {
  const toasterProps: ToasterProps = {
    position: 'top-center',
    reverseOrder: false,
    gutter: 8,
    containerClassName: '',
    containerStyle: {},
    toastOptions: {
      // Default options for specific types of toasts
      success: {
        duration: 3000,
        iconTheme: {
          primary: '#4ade80', // green-400
          secondary: '#ffffff'
        }
      },
      error: {
        duration: 4000,
        iconTheme: {
          primary: '#ef4444', // red-500
          secondary: '#ffffff'
        }
      },
      loading: {
        duration: Infinity
      },
      // Default options for all toasts
      style: {
        background: '#333',
        color: '#fff'
      }
    }
  }

  return <Toaster {...toasterProps} />
}
