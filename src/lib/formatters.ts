/**
 * Formata um valor numérico para o formato de moeda brasileira (R$)
 * @param value - Valor a ser formatado
 * @returns String formatada no padrão de moeda brasileira
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Formata um valor numérico para exibição como pontos
 * @param value Valor a ser formatado
 * @param options Opções de formatação
 * @returns String formatada
 */
export const formatPoints = (
  value: number,
  options: {
    removeTrailingZeros?: boolean
    decimalPlaces?: number
  } = {}
): string => {
  const { removeTrailingZeros = true, decimalPlaces = 2 } = options

  // Formata o número com a quantidade de casas decimais especificada
  let formattedValue = value.toFixed(decimalPlaces)

  // Remove zeros à direita se solicitado
  if (removeTrailingZeros) {
    formattedValue = formattedValue.replace(/\.00$/, '')
  }

  return `${formattedValue} pts`
}

/**
 * Calcula o valor em pontos com base no valor em reais e na cotação do dólar
 * @param valueInBRL Valor em reais (BRL)
 * @param dollarRate Cotação do dólar (USD/BRL)
 * @returns Valor em pontos
 */
export const calculatePoints = (
  valueInBRL: number,
  dollarRate: number
): number => {
  if (!dollarRate) return valueInBRL

  // Converte o valor em reais para pontos (multiplicando pela cotação do dólar)
  return Math.floor(valueInBRL * dollarRate)
}
