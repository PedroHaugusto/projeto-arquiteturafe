import './App.css'
import { Header } from './components/shared/header/Header'
import { Footer } from './components/shared/footer/Footer'
import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/shared/layout/MainLayout'
import { CharactersList } from './pages/characters/CharactersList'
import { CharacterDetails } from './pages/characters/CharacterDetails'
import { EpisodesList } from './pages/episodes/EpisodesList'
import { EpisodeDetails } from './pages/episodes/EpisodeDetails'
import { LocationsList } from './pages/locations/LocationsList'
import { LocationDetails } from './pages/locations/LocationDetails'

function App() {
  return (
    <>
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />

          <Route path="/episodes" element={<EpisodesList />} />
          <Route path="/episodes/:id" element={<EpisodeDetails />} />

          <Route path="/locations" element={<LocationsList />} />
          <Route path="/locations/:id" element={<LocationDetails />} />
        </Routes>
      </MainLayout>
      <Footer />
    </>
  )
}

export default App