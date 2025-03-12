'use client'

import { useTranslations } from 'next-intl'
import { Navbar } from '@/components/navbar'
import { useState } from 'react'
export default function PointsPage() {
  const t = useTranslations('Points')
  const [pointsAmount, setPointsAmount] = useState(1000)
  const [recipient, setRecipient] = useState('self')
  const [friendEmail, setFriendEmail] = useState('')

  const incrementPoints = () => {
    if (pointsAmount < 2000000) {
      setPointsAmount((prev) => prev + 250)
    }
  }

  const decrementPoints = () => {
    if (pointsAmount > 1000) {
      setPointsAmount((prev) => prev - 250)
    }
  }

  // Formata o número com pontos como separadores de milhar
  const formatPoints = (points: number) => {
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  // Calcula o valor em reais com base na quantidade de pontos (R$ 70 por 1000 pontos)
  const calculateValue = (points: number) => {
    const value = (points / 1000) * 70
    return value.toFixed(2).replace('.', ',')
  }

  return (
    <>
      <Navbar hasOffset={true} />
      <div className="pt-24">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <section className="mb-10">
            <h1 className="mb-6 text-3xl font-bold md:text-4xl">
              {t('title')}
            </h1>
            <p className="text-lg text-muted-foreground">{t('description')}</p>
          </section>

          {/* Nova seção de compra de pontos */}
          <section className="mb-16 overflow-hidden rounded-lg bg-gradient-to-r from-blue-700 via-blue-800 to-purple-900">
            <div className="grid md:grid-cols-2">
              {/* Lado esquerdo - Imagem e informações */}
              <div className="relative min-h-[600px] md:min-h-[700px]">
                <div className="absolute inset-0 z-10 p-8 text-white">
                  <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                    {t('buyPoints.title')}
                  </h2>
                  <div className="mb-4 flex items-center space-x-2">
                    <a
                      href="#"
                      className="text-sm underline hover:text-blue-200"
                    >
                      {t('buyPoints.readRegulations')}
                    </a>
                    <span className="text-sm">•</span>
                    <a
                      href="#"
                      className="text-sm underline hover:text-blue-200"
                    >
                      {t('buyPoints.termsAndConditions')}
                    </a>
                  </div>
                  <div className="mb-8 rounded-md bg-gray-800/50 p-4">
                    <h3 className="mb-4 text-lg font-semibold">
                      {t('buyPoints.startingFrom')} 1.000{' '}
                      {t('buyPoints.points')}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <p>{t('buyPoints.receivePoints')}</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <p>{t('buyPoints.validity')}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="absolute inset-0">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://placehold.co/2000x1200/CCCCCC/999999?text=2000x1200")',
                      opacity: 0.7
                    }}
                  />
                </div>
              </div>

              {/* Lado direito - Formulário de compra */}
              <div className="flex min-h-[600px] flex-col justify-center bg-white p-8 md:min-h-[700px]">
                <h3 className="mb-6 text-xl font-bold text-[#9b297d]">
                  {t('buyPoints.purchaseDetails')}
                </h3>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium">
                    {t('buyPoints.howManyPoints')}
                  </label>
                  <div className="flex items-center">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 p-3 text-xl font-semibold text-indigo-900 focus:border-[#9b297d] focus:outline-none focus:ring-1 focus:ring-[#9b297d]"
                        value={formatPoints(pointsAmount)}
                        readOnly
                      />
                    </div>
                    <div className="ml-2 flex">
                      <button
                        className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 ${pointsAmount <= 1000 ? 'cursor-not-allowed text-gray-400 opacity-50' : 'text-gray-500'}`}
                        onClick={decrementPoints}
                        disabled={pointsAmount <= 1000}
                        aria-label="Diminuir pontos"
                      >
                        <span className="text-xl">−</span>
                      </button>
                      <button
                        className={`ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 ${pointsAmount >= 2000000 ? 'cursor-not-allowed text-gray-400 opacity-50' : 'text-[#9b297d]'}`}
                        onClick={incrementPoints}
                        disabled={pointsAmount >= 2000000}
                        aria-label="Aumentar pontos"
                      >
                        <span className="text-xl">+</span>
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {t('buyPoints.minMax')}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">{t('buyPoints.forWhom')}</p>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <div className="relative flex items-center">
                        <input
                          type="radio"
                          name="recipient"
                          className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white checked:border-[5px] checked:border-[#9b297d] checked:bg-white focus:outline-none focus:ring-2 focus:ring-[#9b297d]/50"
                          checked={recipient === 'self'}
                          onChange={() => setRecipient('self')}
                        />
                      </div>
                      <span className="ml-2">{t('buyPoints.forYou')}</span>
                    </label>
                    <label className="flex items-center">
                      <div className="relative flex items-center">
                        <input
                          type="radio"
                          name="recipient"
                          className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white checked:border-[5px] checked:border-[#9b297d] checked:bg-white focus:outline-none focus:ring-2 focus:ring-[#9b297d]/50"
                          checked={recipient === 'friend'}
                          onChange={() => setRecipient('friend')}
                        />
                      </div>
                      <span className="ml-2">{t('buyPoints.forFriend')}</span>
                    </label>
                  </div>

                  {recipient === 'friend' && (
                    <div className="mt-4 transition-all duration-300">
                      <label className="mb-2 block text-sm font-medium">
                        {t('buyPoints.friendEmail')}
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-md border border-gray-300 p-3 focus:border-[#9b297d] focus:outline-none focus:ring-1 focus:ring-[#9b297d]"
                        placeholder={t('buyPoints.friendEmailPlaceholder')}
                        value={friendEmail}
                        onChange={(e) => setFriendEmail(e.target.value)}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {t('buyPoints.friendEmailHelp')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium">
                    {t('buyPoints.coupon')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-3 pr-20 focus:border-[#9b297d] focus:outline-none focus:ring-1 focus:ring-[#9b297d]"
                      placeholder={t('buyPoints.couponPlaceholder')}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium text-[#9b297d] hover:text-pink-700">
                      {t('buyPoints.applyCoupon')}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {t('buyPoints.couponInstructions')}
                  </p>
                </div>

                <div className="mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span>{t('buyPoints.subtotal')}</span>
                    <span>R$ {calculateValue(pointsAmount)}</span>
                  </div>
                </div>

                <div className="mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>{t('buyPoints.total')}</span>
                    <span>R$ {calculateValue(pointsAmount)}</span>
                  </div>
                </div>

                <button className="w-full rounded-md bg-[#9b297d] py-3 font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-[#9b297d] focus:ring-offset-2">
                  {t('buyPoints.buyButton')}
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
