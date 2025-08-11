import { useParams, Link } from 'react-router-dom'

export const CharacterDetails = () => {
  const { id } = useParams()
  return (
    <div>
      <h1 className="mb-4">Detalhes do Personagem #{id}</h1>
      <p>Nome, Foto, Status, Espécie, Origem, Localização, Episódios...</p>
      <Link to="/characters" className="btn btn-outline-secondary btn-sm">Voltar</Link>
    </div>
  )
}