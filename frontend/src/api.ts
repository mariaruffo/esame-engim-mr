// Qui stanno tutte le chiamate HTTP al backend PHP, in un posto solo.
// Tenere le fetch separate dai componenti rende il codice più ordinato:
// i componenti pensano alla grafica, questo file pensa a "parlare" col server.

import type { Sala, Prenotazione, NuovaPrenotazione } from './types'

const API_URL = 'http://localhost:8000'

// GET: scarica l'elenco delle sale
export async function getSale(): Promise<Sala[]> {
  const risposta = await fetch(`${API_URL}/sale.php`)
  if (!risposta.ok) {
    throw new Error('Errore nel caricamento delle sale')
  }
  return risposta.json()
}

// GET: scarica l'elenco delle prenotazioni (già con il nome della sala)
export async function getPrenotazioni(): Promise<Prenotazione[]> {
  const risposta = await fetch(`${API_URL}/prenotazioni.php`)
  if (!risposta.ok) {
    throw new Error('Errore nel caricamento delle prenotazioni')
  }
  return risposta.json()
}

// POST: crea una nuova prenotazione
export async function creaPrenotazione(dati: NuovaPrenotazione): Promise<void> {
  const risposta = await fetch(`${API_URL}/crea.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dati),
  })

  if (!risposta.ok) {
    // Il backend, in caso di errore, risponde con { "errore": "..." }
    const corpo = (await risposta.json().catch(() => ({}))) as { errore?: string }
    throw new Error(corpo.errore ?? 'Errore nel salvataggio della prenotazione')
  }
}
