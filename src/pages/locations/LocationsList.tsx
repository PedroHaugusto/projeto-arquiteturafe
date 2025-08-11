import { Link } from 'react-router-dom'

export const LocationsList = () => {
  return (
    <div>
      <h1 className="mb-4">Localizações</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div className="col">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Earth (C-137)</h5>
              <p className="card-text text-muted">Tipo, Dimensão</p>
              <Link to="/locations/1" className="btn btn-primary btn-sm">Ver detalhes</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}