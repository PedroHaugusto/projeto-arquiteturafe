import { useParams, Link } from 'react-router-dom'

export const EpisodeDetails = () => {
  const { id } = useParams()
  return (
    <div>
      <h1 className="mb-4">Detalhes do Episódio #{id}</h1>
      <p>Nome, Data de estreia, Lista de personagens...</p>
      <Link to="/episodes" className="btn btn-outline-secondary btn-sm">Voltar</Link>
    </div>
  )
}