'use client'

import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { CartItem } from '@/components/cart/cartItem'
import { CartSummary } from '@/components/cart/cartSummary'
import { useCart } from '@/hooks/useCart'
import { useDrawer } from '@/providers/drawerProvider'
import { useAuth } from '@/providers/authProvider'
import { Button } from '@/components/ui/button'
import { CartItem as CartItemType } from '@/types/cart'

interface UserPoints {
  pontos_acumulados: number
}

export default function CartDrawer() {
  const t = useTranslations('cart')
  const { cart } = useCart()
  const { isDrawerOpen, closeDrawer } = useDrawer()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [userPoints, setUserPoints] = useState<number>(0)
  const router = useRouter()

  const subtotal = cart.reduce(
    (acc: number, item: CartItemType) => acc + item.price * item.quantity,
    0
  )

  const totalPoints = cart.reduce(
    (acc: number, item: CartItemType) =>
      acc + (item.pontos || 0) * item.quantity,
    0
  )

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!user) {
        setUserPoints(0)
        return
      }

      try {
        setLoading(true)
        const response = await fetch('/api/user/points')
        const data: UserPoints = await response.json()
        setUserPoints(data.pontos_acumulados || 0)
      } catch (error) {
        console.error('Error fetching user points:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserPoints()
  }, [user])

  const renderPointsSection = () => {
    if (!user) {
      return (
        <div className="mb-4 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">{t('loginToUsePoints')}</p>
          <Button
            variant="default"
            className="mt-2 text-white"
            onClick={() => {
              closeDrawer()
              router.push('/user/sign-in')
            }}
          >
            {t('signInOrRegister')}
          </Button>
        </div>
      )
    }

    if (loading) {
      return (
        <div className="mb-4">
          <p className="text-sm text-gray-600">{t('loading')}</p>
        </div>
      )
    }

    const canPurchase = userPoints >= totalPoints

    return (
      <div className="mb-4">
        <p className="mb-2 text-sm text-gray-600">{t('pointsNeeded')}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {totalPoints} {t('points')}
          </span>
          <span
            className={`text-sm ${
              canPurchase ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {t('yourPoints')}: {userPoints} {t('points')}
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-200">
          <div
            className={`h-2 rounded-full ${
              canPurchase ? 'bg-green-600' : 'bg-red-600'
            }`}
            style={{
              width: `${Math.min((totalPoints / userPoints) * 100, 100)}%`
            }}
          />
        </div>
        {!canPurchase && (
          <p className="mt-2 text-sm text-red-600">
            {t('needMorePoints', { points: totalPoints - userPoints })}
          </p>
        )}
      </div>
    )
  }

  return (
    <Transition.Root show={isDrawerOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeDrawer}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 text-gray-800 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/images/logos/6wings-logo.png"
                            alt="Logo"
                            width={36}
                            height={36}
                          />
                          <Dialog.Title className="mt-2 text-lg font-semibold leading-6 text-primary">
                            {t('title')}
                          </Dialog.Title>
                        </div>
                        <button
                          type="button"
                          className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={closeDrawer}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Fechar painel</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {renderPointsSection()}

                      {/* Itens do carrinho */}
                      {loading ? (
                        <p>{t('loading')}</p>
                      ) : cart.length === 0 ? (
                        <p>{t('empty')}</p>
                      ) : (
                        cart.map((item) => (
                          <CartItem key={item.id} item={item} />
                        ))
                      )}

                      {/* Adicionar código de cupom */}
                      <button className="mt-4 text-sm text-primary decoration-primary hover:underline">
                        {t('addCoupon')}
                      </button>

                      {/* Resumo do carrinho */}
                      <CartSummary
                        subtotal={subtotal}
                        cashbackPoints={totalPoints}
                      />

                      {/* Botões de finalização */}
                      <div className="mt-6 flex flex-col gap-4 md:flex-row">
                        <Button
                          variant="default"
                          type="button"
                          onClick={() => {
                            closeDrawer()
                            router.push('/checkout')
                          }}
                          disabled={cart.length === 0}
                          className="text-white disabled:opacity-50"
                        >
                          {t('checkout')}
                        </Button>

                        <Button variant="outline" onClick={closeDrawer}>
                          {t('continueShopping')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
