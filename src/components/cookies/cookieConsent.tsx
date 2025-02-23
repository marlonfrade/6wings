'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

interface CookiePreferences {
  necessary: boolean
  preferences: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieType {
  key: keyof CookiePreferences
  label: string
  description: string
}

export default function CookieConsent() {
  const t = useTranslations('cookies')
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(false)
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(
    {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false
    }
  )

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences')
    const hasConsent = localStorage.getItem('cookieConsent')

    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences))
    }

    setShowCookieBanner(!hasConsent)
  }, [])

  const openModal = () => {
    const modal = document.getElementById('cookiesModal') as HTMLDialogElement
    if (modal) modal.showModal()
  }

  const closeModal = () => {
    const modal = document.getElementById('cookiesModal') as HTMLDialogElement
    if (modal) modal.close()
  }

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true
    }

    savePreferences(allAccepted)
  }

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return

    setCookiePreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const savePreferences = (preferences: CookiePreferences) => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    localStorage.setItem('cookieConsent', 'true')
    setCookiePreferences(preferences)
    setShowCookieBanner(false)
    closeModal()
  }

  const handleSavePreferences = () => {
    savePreferences(cookiePreferences)
  }

  const cookieTypes: CookieType[] = [
    {
      key: 'necessary',
      label: t('types.necessary.title'),
      description: t('types.necessary.description')
    },
    {
      key: 'preferences',
      label: t('types.preferences.title'),
      description: t('types.preferences.description')
    },
    {
      key: 'analytics',
      label: t('types.analytics.title'),
      description: t('types.analytics.description')
    },
    {
      key: 'marketing',
      label: t('types.marketing.title'),
      description: t('types.marketing.description')
    }
  ]

  return (
    <>
      {showCookieBanner && (
        <section className="fixed bottom-0 z-50 w-full bg-primary p-5 lg:px-24">
          <div className="-mx-3 items-center md:flex">
            <div className="mb-5 px-3 md:mb-0 md:flex-1">
              <p className="text-center text-xs leading-tight text-white md:pr-12 md:text-left">
                {t('message')}
              </p>
            </div>
            <div className="px-3 text-center">
              <button
                className="mr-3 rounded bg-white px-8 py-2 text-sm font-bold text-primary shadow-xl hover:bg-gray-100"
                onClick={openModal}
              >
                {t('settings')}
              </button>
              <button
                className="rounded bg-secondary px-8 py-2 text-sm font-bold text-white shadow-xl hover:bg-secondary-600"
                onClick={handleAcceptAll}
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </section>
      )}

      <dialog
        id="cookiesModal"
        className="h-auto w-11/12 overflow-hidden rounded-md bg-white p-0 md:w-1/2"
      >
        <div className="flex h-auto w-full flex-col">
          <div className="flex h-auto w-full items-center border-b px-5 py-3">
            <div className="h-auto w-10/12 text-lg font-bold text-primary">
              {t('title')}
            </div>
            <div className="flex h-auto w-2/12 justify-end">
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-primary"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          </div>

          {cookieTypes.map(({ key, label, description }) => (
            <div
              key={key}
              className="flex w-full items-center border-b border-gray-200 bg-gray-50 px-5 py-3 text-sm"
            >
              <div className="flex-1">
                <p className="font-semibold">{label}</p>
                <p className="mt-1 text-xs text-gray-600">{description}</p>
              </div>
              <div className="w-10 text-right">
                <button
                  onClick={() => handleTogglePreference(key)}
                  disabled={key === 'necessary'}
                  className={`h-6 w-6 ${
                    cookiePreferences[key] ? 'text-secondary' : 'text-gray-300'
                  }`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="flex w-full justify-end px-5 py-3">
            <button
              onClick={handleSavePreferences}
              className="rounded bg-primary px-8 py-2 text-sm font-bold text-white shadow-xl hover:bg-primary-800"
            >
              {t('save')}
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
