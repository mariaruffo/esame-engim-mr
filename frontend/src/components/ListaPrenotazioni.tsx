import type { Prenotazione } from '../types'

interface ListaPrenotazioniProps {
  prenotazioni: Prenotazione[]
}

function ListaPrenotazioni({ prenotazioni }: ListaPrenotazioniProps) {
  // Se non c'è nulla da mostrare, esco subito con un messaggio.
  if (prenotazioni.length === 0) {
    return <p className="vuoto">Nessuna prenotazione presente.</p>
  }

  return (
    <table className="tabella">
      <thead>
        <tr>
          <th>Sala</th>
          <th>Prenotante</th>
          <th>Data</th>
          <th>Orario</th>
        </tr>
      </thead>
      <tbody>
        {prenotazioni.map((p) => (
          <tr key={p.id}>
            <td>{p.sala_nome}</td>
            <td>{p.prenotante}</td>
            <td>{p.data}</td>
            <td>
              {p.inizio} – {p.fine}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListaPrenotazioni
