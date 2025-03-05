export interface Airport {
  id: number
  nome: string
  code: string
  cidade: string
  estado: string
  pais: string
}

export interface AirportResponse {
  cidade: string
  estado: string
  pais: string
  id: number
  code: string
  name: string
  is_private: boolean
  reg_date: string
  last_update: string
  update_date: string | null
  location_id: number
}
