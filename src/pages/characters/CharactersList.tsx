import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../../service/Api'
import './characters.css'

type CharacterLocation = {
  name: string
  url: string
}

type Character = {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  image: string
  location: CharacterLocation
}

type ApiInfo = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

type CharactersResponse = {
  info: ApiInfo
  results: Character[]
}

export const CharactersList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = Number(searchParams.get('page')) || 1

  const [characters, setCharacters] = useState<Character[]>([])
  const [info, setInfo] = useState<ApiInfo | null>(null)
  const [page, setPage] = useState<number>(initialPage)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setSearchParams({ page: String(page) }, { replace: true })
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await api.get<CharactersResponse>('/character', { params: { page } })
        setCharacters(data.results)
        setInfo(data.info)
      } catch (err: any) {
        if (err?.response?.status === 404) {
          setCharacters([])
          setInfo({ count: 0, pages: 0, next: null, prev: null })
          setError('Nenhum resultado para esta página.')
        } else {
          setError('Falha ao carregar personagens. Tente novamente.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchCharacters()
  }, [page, setSearchParams])

  const statusClass = (status: Character['status']) => {
    switch (status) {
      case 'Alive':
        return 'status-dot status-alive'
      case 'Dead':
        return 'status-dot status-dead'
      default:
        return 'status-dot status-unknown'
    }
  }

  const goPrev = () => {
    if (info?.prev && page > 1) setPage((p) => p - 1)
  }
  const goNext = () => {
    if (info?.next) setPage((p) => p + 1)
  }

  return (
    <div>
      <h1 className="mb-4 text-center">Personagens</h1>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-warning" role="status" aria-label="Carregando..." />
        </div>
      )}

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {characters.length === 0 ? (
            <p className="text-center text-muted">Nenhum personagem encontrado.</p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {characters.map((c) => (
                <div className="col" key={c.id}>
                  <div className="card h-100 shadow-sm character-card">
                    <img src={c.image} alt={c.name} className="card-img-top" loading="lazy" />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-center mb-1">
                        <Link to={`/characters/${c.id}`} className="stretched-link text-decoration-none character-link">
                          {c.name}
                        </Link>
                      </h5>

                      <div className="text-muted text-center small mb-2">
                        {c.species}
                      </div>

                      <div className="status-line text-center mb-3">
                        <span className="fw-semibold me-1">Status:</span>
                        <span className={statusClass(c.status)} />
                        <span className={`status-text ${c.status.toLowerCase()}`}>{c.status}</span>
                      </div>

                      <div className="mt-auto">
                        <div className="last-location border rounded-3 p-2 bg-body-tertiary">
                          <div className="small fw-semibold mb-1">Última localização:</div>
                          <div className="small">{c.location?.name || 'Desconhecida'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
            <button className="btn btn-outline-secondary btn-sm" onClick={goPrev} disabled={!info?.prev || page <= 1}>
              Anterior
            </button>
            <span className="text-muted small">
              Página {page} {info?.pages ? `de ${info.pages}` : ''}
            </span>
            <button className="btn btn-outline-secondary btn-sm" onClick={goNext} disabled={!info?.next}>
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  )
}