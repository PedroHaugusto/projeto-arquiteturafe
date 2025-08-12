import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Location = {
  id: number
  name: string
  type: string
  dimension: string
}

type ApiInfo = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export function LocationsList() {
  const [locations, setLocations] = useState<Location[]>([])
  const [info, setInfo] = useState<ApiInfo | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
        if (!res.ok) throw new Error('Falha ao carregar localizações')
        const data = await res.json()
        setLocations(data.results)
        setInfo(data.info)
      } catch (e: any) {
        setError(e.message ?? 'Erro inesperado')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [page])

  return (
    <div className="container py-3">
      <h2 className="mb-4 text-center" style={{ color: '#ff9800' }}>Localizações</h2>

      {loading && <div className="text-center">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {locations.map(loc => (
          <div key={loc.id} className="col">
            <Link to={`/locations/${loc.id}`} className="text-decoration-none">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title mb-1">{loc.name}</h6>
                  <small className="d-block text-muted">Tipo: {loc.type || 'Desconhecido'}</small>
                  <small className="d-block text-muted">Dimensão: {loc.dimension || 'Desconhecida'}</small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-2 mt-3">
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={!info?.prev}
          onClick={() => setPage(p => Math.max(1, p - 1))}
        >
          Página anterior
        </button>
        <span className="align-self-center">Página {page} / {info?.pages ?? 1}</span>
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={!info?.next}
          onClick={() => setPage(p => p + 1)}
        >
          Próxima página
        </button>
      </div>
    </div>
  )
}