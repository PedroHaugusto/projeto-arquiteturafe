import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../../service/Api'

type Character = {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: string
  origin: { name: string; url: string }
  location: { name: string; url: string }
  image: string
  episode: string[]
}

type Episode = {
  id: number
  name: string
  episode: string
  air_date: string
}

export const CharacterDetails = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState<Character | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await api.get<Character>(`/character/${id}`)
        setCharacter(data)
        if (data.episode.length > 0) {
          const episodeIds = data.episode.map((url) => url.split('/').pop()).join(',')
          const { data: episodesData } = await api.get<Episode[] | Episode>(`/episode/${episodeIds}`)
          setEpisodes(Array.isArray(episodesData) ? episodesData : [episodesData])
        } else {
          setEpisodes([])
        }
      } catch (err: any) {
        setError('Falha ao carregar personagem.')
      } finally {
        setLoading(false)
      }
    }
    fetchCharacter()
  }, [id])

  const statusColor = (status: string) => {
    if (status === 'Alive') return { color: '#22c55e' }
    if (status === 'Dead') return { color: '#ef4444' }
    return { color: '#6b7280' }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-warning" role="status" aria-label="Carregando..." />
      </div>
    )
  }

  if (error || !character) {
    return (
      <div className="alert alert-warning my-5" role="alert">
        {error || 'Personagem não encontrado.'}
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4 text-center" style={{ color: '#ff9800' }}>Detalhes do Personagem</h2>
      <div className="card mx-auto mb-4" style={{ maxWidth: 600 }}>
        <div className="row g-0 align-items-center">
          <div className="col-8">
            <div className="card-body">
              <h4 className="card-title mb-2 fw-bold">{character.name}</h4>
              <div className="mb-2 fw-semibold" style={statusColor(character.status)}>
                Status: {character.status}
              </div>
              <div className="mb-1 small">Espécie: {character.species}</div>
              <div className="mb-1 small">Origem: {character.origin?.name}</div>
              <div className="mb-1 small">Última localização: {character.location?.name}</div>
            </div>
          </div>
          <div className="col-4 text-center">
            <img src={character.image} alt={character.name} className="img-fluid rounded-end" style={{ maxHeight: 140 }} />
          </div>
        </div>
      </div>

      <div className="card mx-auto mb-4" style={{ maxWidth: 600 }}>
        <div className="card-body text-center fw-semibold">
          {character.name} aparece nos seguintes episódios:
        </div>
      </div>

      <div className="row justify-content-center g-3">
        {episodes.map((ep) => (
          <div className="col-12 col-md-4 col-lg-3" key={ep.id}>
            <Link to={`/episodes/${ep.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="fw-semibold">{ep.name}</div>
                  <div className="small text-muted">Episódio: {ep.episode}</div>
                  <div className="small text-muted">Data Exibição: {ep.air_date}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}