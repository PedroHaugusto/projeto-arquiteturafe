import { useParams, Link } from 'react-router-dom'

export const LocationDetails = () => {
  const { id } = useParams()
  return (
    <div>
      <h1 className="mb-4">Detalhes da Localização #{id}</h1>
      <p>Nome, Tipo, Dimensão, Residentes...</p>
      <Link to="/locations" className="btn btn-outline-secondary btn-sm">Voltar</Link>
    </div>
  )
}