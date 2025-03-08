import { useState, useEffect } from 'react'

interface CurrencyResponse {
  USDBRL: {
    code: string
    codein: string
    name: string
    high: string
    low: string
    varBid: string
    pctChange: string
    bid: string
    ask: string
    timestamp: string
    create_date: string
  }
}

export const useCurrencyRate = () => {
  const [rate, setRate] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCurrencyRate = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          'https://economia.awesomeapi.com.br/json/last/USD-BRL'
        )

        if (!response.ok) {
          throw new Error('Falha ao buscar cotação do dólar')
        }

        const data: CurrencyResponse = await response.json()
        setRate(parseFloat(data.USDBRL.bid))
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido'))
        console.error('Erro ao buscar cotação:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCurrencyRate()

    // Atualiza a cotação a cada 5 minutos
    const intervalId = setInterval(fetchCurrencyRate, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  return { rate, isLoading, error }
}
