import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
}

type Character = {
  id: number
  name: string
  image: string
  status?: string
  species?: string
  location?: { name: string; url: string }
}

function statusClass(status?: string) {
  if (status === 'Alive') return 'text-success'
  if (status === 'Dead') return 'text-danger'
  return 'text-warning'
}

export function EpisodeDetails() {
  const { id } = useParams<{ id: string }>()
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
        if (!res.ok) throw new Error('Falha ao carregar episódio')
        const ep: Episode = await res.json()
        setEpisode(ep)

        if (ep.characters?.length) {
          const ids = Array.from(
            new Set(
              ep.characters
                .map(url => url.split('/').pop())
                .filter(Boolean) as string[]
            )
          )
          const chrRes = await fetch(`https://rickandmortyapi.com/api/character/${ids.join(',')}`)
          if (!chrRes.ok) throw new Error('Falha ao carregar personagens')
          const data = await chrRes.json()
          const list: Character[] = Array.isArray(data) ? data : [data]
          setCharacters(list)
        } else {
          setCharacters([])
        }
      } catch (e: any) {
        setError(e.message ?? 'Erro inesperado')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="container py-3">Carregando...</div>
  if (error) return <div className="container py-3 alert alert-danger">{error}</div>
  if (!episode) return null

  return (
    <div className="container py-3">
      <Link to="/episodes" className="btn btn-link p-0 mb-3">← Voltar</Link>

        <h2 className="mb-4 text-center" style={{ color: '#ff9800' }}>Detalhes do Episódio</h2>
      <div className="card mb-3">
        <div className="card-body text-center">
          <h3 className="card-title mb-1">{episode.name}</h3>
          <div className="text-muted">Data de exibição: {episode.air_date}</div>
          <div className="text-muted">Temporada: {episode.episode}</div>
        </div>
      </div>

      <h5 className="text-center mb-3">Personagens</h5>
      {characters.length === 0 ? (
        <div className="text-center text-muted">Nenhum personagem listado para este episódio.</div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {characters.map(c => (
            <div key={c.id} className="col">
              <div className="card h-100 position-relative">
                <img src={c.image} className="card-img-top" alt={c.name} />
                <div className="card-body text-center py-3">
                  <h6 className="card-title mb-1">
                    <Link to={`/characters/${c.id}`} className="stretched-link text-decoration-none text-reset">
                      {c.name}
                    </Link>
                  </h6>
                  <small className="text-muted d-block">{c.species}</small>
                  <div className="mt-2">
                    <small className="text-muted">Status: </small>
                    <strong className={statusClass(c.status)}>{c.status || 'Unknown'}</strong>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="border rounded p-2 bg-light">
                    <small className="text-muted d-block">Última localização:</small>
                    <small className="fw-semibold">{c.location?.name || 'Desconhecida'}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}