// Le "forme" dei dati che scambiamo con il backend.
// Avere i tipi qui in un posto solo ci fa avere autocompletamento e controlli ovunque.

export interface Sala {
  id: number
  nome: string
  capienza: number
  piano: number
}

export interface Prenotazione {
  id: number
  sala_id: number
  sala_nome: string // arriva dalla JOIN lato backend
  prenotante: string
  data: string   // formato "2025-04-10"
  inizio: string // formato "09:00"
  fine: string   // formato "10:30"
}

// I dati che il form invia per creare una prenotazione:
// niente "id" (lo genera il database) e niente "sala_nome" (lo ricava la JOIN).
export interface NuovaPrenotazione {
  sala_id: number
  prenotante: string
  data: string
  inizio: string
  fine: string
}
