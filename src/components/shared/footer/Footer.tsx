import './footer.css'

export const Footer = () => (
  <footer className="custom-footer d-flex align-items-center justify-content-center">
    <span>
      © {new Date().getFullYear()} Programação Web com Linguagem de Scripts.
    </span>
  </footer>
)