
import { Link } from 'react-router-dom'

import camiseta from '../assets/camiseta.png'
import calca from '../assets/calca.png'
import headphone from '../assets/headphone.png'
import tenis from '../assets/tenis.png'

function Categorias() {
  const categorias = [
    {
      nome: 'Camisetas',
      imagem: camiseta,
    },
    {
      nome: 'Calças',
      imagem: calca,
    },
    {
      nome: 'Headphones',
      imagem: headphone,
    },
    {
      nome: 'Tênis',
      imagem: tenis,
    },
  ]

  return (
    <section className="categories">
      <h2>Escolha uma categoria</h2>

      <div className="categories-grid">
        {categorias.map((categoria) => (
          <Link
            key={categoria.nome}
            to={`/produtos?categoria=${encodeURIComponent(categoria.nome)}`}
            className="category"
          >
            <img
              src={categoria.imagem}
              alt={categoria.nome}
            />

            <p>{categoria.nome}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categorias
