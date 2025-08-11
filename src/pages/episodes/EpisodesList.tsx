import { Link } from 'react-router-dom'

export const EpisodesList = () => {
  return (
    <div>
      <h1 className="mb-4">Episódios</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {/* Placeholder de card */}
        <div className="col">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Pilot</h5>
              <p className="card-text text-muted">Data de estreia</p>
              <Link to="/episodes/1" className="btn btn-primary btn-sm">Ver detalhes</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}