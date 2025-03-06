'use client'

import { useAuth } from '@/providers/authProvider'
import { useUser } from '@/hooks/useUser'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const UserMenu = ({
  isOpen,
  onClose
}: UserMenuProps): React.JSX.Element | null => {
  const { user, logout } = useAuth()
  const { user: userData } = useUser()
  console.log(userData)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [userPoints, setUserPoints] = useState<number>(0)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      try {
        // Fetch user profile data
        const userResponse = await fetch('/api/user', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data')
        }

        const userData = await userResponse.json()
        if (userData.profile) {
          setAvatarUrl(`data:image/jpeg;base64,${userData.profile}`)
        }

        // Fetch points data from the dedicated points endpoint
        const pointsResponse = await fetch('/api/user/points')
        if (!pointsResponse.ok) {
          throw new Error('Failed to fetch points data')
        }

        const pointsData = await pointsResponse.json()
        setUserPoints(pointsData.pontos_acumulados || 0)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [user])

  if (!isOpen || !user) return null

  const renderNavigationLinks = () => {
    switch (user.tipo) {
      case 'PA':
        return (
          <>
            <Link
              href="/partners"
              className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
              </svg>
              <span>Minha Conta</span>
            </Link>

            <Link
              href="/partners/products"
              className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                <path d="M9 17h6"></path>
                <path d="M9 13h6"></path>
              </svg>
              <span>Meus Produtos</span>
            </Link>

            <Link
              href="/partners/sales"
              className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
              </svg>
              <span>Minhas Vendas</span>
            </Link>
          </>
        )
      case 'AD':
        return (
          <>
            <Link
              href="/admin"
              className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
              </svg>
              <span>Painel Admin</span>
            </Link>

            <Link
              href="/admin/users"
              className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                <path d="M9 17h6"></path>
                <path d="M9 13h6"></path>
              </svg>
              <span>Gerenciar Usuários</span>
            </Link>

            <Link
              href="/admin/products"
              className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
              </svg>
              <span>Gerenciar Produtos</span>
            </Link>
          </>
        )
      case 'US':
      default:
        return (
          <>
            <Link
              href="/user"
              className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
              </svg>
              <span>Minha Conta</span>
            </Link>

            <Link
              href="/user/purchase-history"
              className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                <path d="M9 17h6"></path>
                <path d="M9 13h6"></path>
              </svg>
              <span>Meus Pedidos</span>
            </Link>

            <Link
              href="/user/points"
              className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
              </svg>
              <span>Meus Pontos</span>
            </Link>

            <Link
              href="/user/favorites"
              className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
              </svg>
              <span>Meus Favoritos</span>
            </Link>
          </>
        )
    }
  }

  return (
    <div className="absolute right-0 top-16 z-[100000000000000000] w-[300px] max-w-sm divide-y divide-gray-200 rounded-lg bg-white p-3 drop-shadow-xl">
      <div aria-label="header" className="flex flex-col p-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-200">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={`Avatar ${user.nome || 'User'}`}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-300 text-2xl font-semibold text-gray-600">
                {(user.nome || user.email || 'U')[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col space-y-2 truncate">
            <div className="relative text-xl font-medium leading-tight text-gray-900">
              <span className="flex">
                <span className="relative truncate pr-8">
                  {user.nome || user.email?.split('@')[0]}
                  {/* {user.emailVerified && (
                    <span
                      aria-label="verified"
                      className="absolute right-0 top-1/2 inline-block -translate-y-1/2 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="ml-1 h-6 w-6 text-cyan-400"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path
                          d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                          strokeWidth="0"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  )} */}
                </span>
              </span>
            </div>
            <p className="truncate text-base font-normal leading-tight text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start justify-between p-3">
          <div className="flex items-center gap-2">
            <Image
              src="/logo/6wings_logo 2.png"
              alt="6Wings Logo"
              width={24}
              height={24}
            />
            <span className="mt-2 text-sm font-medium text-gray-600">
              <span className="text-lg text-primary">{userPoints}</span> pontos
              6wings
            </span>
          </div>
          <Link
            href="/user/buy-points"
            className="group relative mt-4 inline-block cursor-pointer rounded-xl bg-neutral-900 p-px font-semibold leading-6 text-primary shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-primary/50 active:scale-95"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-cyan-500 to-sky-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10 block rounded-xl bg-neutral-950 px-4 py-2">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1 group-hover:text-primary">
                  Comprar mais pontos
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 transition-all duration-500 group-hover:translate-x-1 group-hover:text-primary"
                >
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                </svg>
              </div>
            </span>
          </Link>
        </div>
      </div>

      <div aria-label="navigation" className="py-2">
        <nav className="grid gap-1">{renderNavigationLinks()}</nav>
      </div>

      <div aria-label="footer" className="pt-2">
        <button
          type="button"
          onClick={() => {
            logout()
            onClose()
          }}
          className="flex w-full items-center space-x-3 rounded-md px-4 py-3 text-lg leading-6 text-gray-600 hover:bg-gray-100 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-7 w-7"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
            <path d="M9 12h12l-3 -3"></path>
            <path d="M18 15l3 -3"></path>
          </svg>
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
}
