import { useState } from 'react'
import type { Sala, Prenotazione, NuovaPrenotazione } from '../types'

interface FormPrenotazioneProps {
  sale: Sala[]
  prenotazioni: Prenotazione[]
  onCreata: (nuova: NuovaPrenotazione) => Promise<void>
}

function FormPrenotazione({ sale, prenotazioni, onCreata }: FormPrenotazioneProps) {
  const [salaId, setSalaId] = useState('')
  const [prenotante, setPrenotante] = useState('')
  const [data, setData] = useState('')
  const [inizio, setInizio] = useState('')
  const [fine, setFine] = useState('')

  const [errore, setErrore] = useState('')
  const [successo, setSuccesso] = useState('')

  // Controlla se la sala scelta è già occupata nella fascia oraria selezionata.
  // Due fasce si sovrappongono se: inizioNuova < fineEsistente E fineNuova > inizioEsistente.
  // Gli orari sono stringhe "HH:MM": confrontarle alfabeticamente equivale a confrontarle nel tempo.
  function salaOccupata(): boolean {
    return prenotazioni.some(
      (p) =>
        p.sala_id === Number(salaId) &&
        p.data === data &&
        inizio < p.fine &&
        fine > p.inizio,
    )
  }

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault()
    setErrore('')
    setSuccesso('')

    // Validazione 1: tutti i campi devono essere compilati
    if (!salaId || !prenotante || !data || !inizio || !fine) {
      setErrore('Compila tutti i campi.')
      return
    }

    // Validazione 2: l'ora di fine deve essere successiva all'ora di inizio
    if (fine <= inizio) {
      setErrore("L'ora di fine deve essere successiva all'ora di inizio.")
      return
    }

    // Validazione 3: la sala non deve essere già occupata in quella fascia
    if (salaOccupata()) {
      setErrore('Attenzione: la sala è già occupata in questa fascia oraria.')
      return
    }

    // Tutto ok: invio al backend tramite la funzione passata dal genitore
    try {
      await onCreata({
        sala_id: Number(salaId),
        prenotante,
        data,
        inizio,
        fine,
      })
      setSuccesso('Prenotazione salvata!')
      // Svuoto il form
      setSalaId('')
      setPrenotante('')
      setData('')
      setInizio('')
      setFine('')
    } catch (err: unknown) {
      const messaggio = err instanceof Error ? err.message : 'Errore imprevisto'
      setErrore(messaggio)
    }
  }

  // Il tasto è disabilitato se almeno un campo è vuoto
  const formCompleto = salaId && prenotante && data && inizio && fine

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Nuova prenotazione</h2>

      <label>
        Sala
        <select value={salaId} onChange={(e) => setSalaId(e.target.value)}>
          <option value="">— Seleziona una sala —</option>
          {sale.map((sala) => (
            <option key={sala.id} value={sala.id}>
              {sala.nome} (capienza {sala.capienza}, piano {sala.piano})
            </option>
          ))}
        </select>
      </label>

      <label>
        Prenotante
        <input
          type="text"
          value={prenotante}
          onChange={(e) => setPrenotante(e.target.value)}
          placeholder="Es. Mario Rossi"
        />
      </label>

      <label>
        Data
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      </label>

      <div className="orari">
        <label>
          Ora inizio
          <input type="time" value={inizio} onChange={(e) => setInizio(e.target.value)} />
        </label>
        <label>
          Ora fine
          <input type="time" value={fine} onChange={(e) => setFine(e.target.value)} />
        </label>
      </div>

      {errore && <p className="messaggio errore">{errore}</p>}
      {successo && <p className="messaggio successo">{successo}</p>}

      <button type="submit" disabled={!formCompleto}>
        Prenota
      </button>
    </form>
  )
}

export default FormPrenotazione
