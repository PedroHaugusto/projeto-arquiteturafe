import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
}

type ApiInfo = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export function EpisodesList() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [info, setInfo] = useState<ApiInfo | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
        if (!res.ok) throw new Error('Falha ao carregar episódios')
        const data = await res.json()
        setEpisodes(data.results)
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
      <h2 className="text-center mb-3">Episódios</h2>

      {loading && <div className="text-center">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {episodes.map(ep => (
          <div key={ep.id} className="col">
            <Link to={`/episodes/${ep.id}`} className="text-decoration-none">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title mb-1">{ep.name}</h6>
                  <small className="text-muted">Data de estreia: {ep.air_date}</small>
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
        <span className="align-self-center">Página {page}</span>
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