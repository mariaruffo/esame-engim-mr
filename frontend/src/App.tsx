import { useEffect, useState } from 'react'
import type { Sala, Prenotazione, NuovaPrenotazione } from './types'
import { getSale, getPrenotazioni, creaPrenotazione } from './api'
import ListaPrenotazioni from './components/ListaPrenotazioni'
import FormPrenotazione from './components/FormPrenotazione'

function App() {
  // App è la "fonte di verità": qui vivono i dati condivisi da form e lista.
  const [sale, setSale] = useState<Sala[]>([])
  const [prenotazioni, setPrenotazioni] = useState<Prenotazione[]>([])
  const [caricamento, setCaricamento] = useState(true)
  const [erroreCaricamento, setErroreCaricamento] = useState('')

  // Scarica sale e prenotazioni dal backend (le due GET in parallelo).
  async function caricaDati() {
    try {
      const [saleResp, prenotazioniResp] = await Promise.all([getSale(), getPrenotazioni()])
      setSale(saleResp)
      setPrenotazioni(prenotazioniResp)
    } catch {
      setErroreCaricamento('Impossibile contattare il server. Controlla che il backend PHP sia avviato.')
    } finally {
      setCaricamento(false)
    }
  }

  useEffect(() => {
    caricaDati()
  }, [])

  // Passata al form: salva la prenotazione e poi ricarica la lista aggiornata.
  async function handleCreata(nuova: NuovaPrenotazione) {
    await creaPrenotazione(nuova)
    await caricaDati()
  }

  return (
    <div className="container">
      <h1>Prenotazioni Sale Riunioni</h1>

      {caricamento && <p>Caricamento in corso…</p>}
      {erroreCaricamento && <p className="messaggio errore">{erroreCaricamento}</p>}

      {!caricamento && !erroreCaricamento && (
        <>
          <FormPrenotazione sale={sale} prenotazioni={prenotazioni} onCreata={handleCreata} />
          <ListaPrenotazioni prenotazioni={prenotazioni} />
        </>
      )}
    </div>
  )
}

export default App
