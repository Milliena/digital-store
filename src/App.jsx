
import './App.css'

import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Produtos from './pages/Produtos'
import DetalhesProduto from './pages/DetalhesProduto'
import Categorias from './pages/Categorias'
import MeusPedidos from './pages/MeusPedidos'
import { listaProdutos } from './data/produtos'

import hero from './assets/hero.png'
import supreme from './assets/supreme.png'
import adidas from './assets/adidas.png'
import beats from './assets/beats.png'
import camiseta from './assets/camiseta.png'
import calca from './assets/calca.png'
import headphone from './assets/headphone.png'
import tenis from './assets/tenis.png'
import airJordan from './assets/airJordan.png'

function Home() {
  return (
    <>
      {/* BANNER PRINCIPAL */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-highlight">
            Melhores ofertas personalizadas
          </p>

          <h1>Queima de estoque Nike 🔥</h1>

          <p>
            Confira nossas ofertas especiais e encontre
            o tênis perfeito para você.
          </p>

          <Link to="/produtos" className="hero-button">
            Ver Ofertas
          </Link>
        </div>

        <img src={hero} alt="Tênis Nike em destaque" />
      </section>

      {/* COLEÇÕES EM DESTAQUE */}
      <section className="collections">
        <h2>Coleções em destaque</h2>

        <div className="collections-grid">
          <article className="collection-card collection-supreme">
            <span className="collection-discount">30% OFF</span>

            <div className="collection-text">
              <h3>Novo drop Supreme</h3>
              <Link to="/produtos?colecao=supreme">
                Comprar
              </Link>
            </div>

            <img src={supreme} alt="Blusa Supreme" />
          </article>

          <article className="collection-card collection-adidas">
            <span className="collection-discount">30% OFF</span>

            <div className="collection-text">
              <h3>Coleção Adidas</h3>
              <Link to="/produtos?colecao=adidas">
                Comprar
              </Link>
            </div>

            <img src={adidas} alt="Tênis Adidas" />
          </article>

          <article className="collection-card collection-beats">
            <span className="collection-discount">30% OFF</span>

            <div className="collection-text">
              <h3>Novo Beats Bass</h3>
              <Link to="/produtos?colecao=beats">
                Comprar
              </Link>
            </div>

            <img src={beats} alt="Headphone Beats" />
          </article>
        </div>
      </section>

      {/* CATEGORIAS EM DESTAQUE */}
      <section className="categories">
        <h2>Categorias em destaque</h2>

        <div className="categories-grid">
          <Link
            to="/produtos?categoria=Camisetas"
            className="category"
          >
            <img src={camiseta} alt="Camisetas" />
            <p>Camisetas</p>
          </Link>

          <Link
            to="/produtos?categoria=Calças"
            className="category"
          >
            <img src={calca} alt="Calças" />
            <p>Calças</p>
          </Link>

          <Link
            to="/produtos?categoria=Headphones"
            className="category"
          >
            <img src={headphone} alt="Headphones" />
            <p>Headphones</p>
          </Link>

          <Link
            to="/produtos?categoria=Tênis"
            className="category"
          >
            <img src={tenis} alt="Tênis" />
            <p>Tênis</p>
          </Link>
        </div>
      </section>

      {/* PRODUTOS EM ALTA */}
      <section className="featured-products">
        <div className="featured-header">
          <h2>Produtos em alta</h2>
          <Link to="/produtos">Ver todos →</Link>
        </div>

        <div className="products-grid">
          {listaProdutos.map((produto) => (
            <Link
              to={`/produto/${produto.id}`}
              className="link-produto"
              key={produto.id}
            >
              <article className="product-card">
                <div className="product-image">
                  <span className="discount">
                    {produto.desconto}% OFF
                  </span>

                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                  />
                </div>

                <div className="product-info">
                  <p className="product-category">
                    {produto.categoria}
                  </p>

                  <h3>{produto.nome}</h3>

                  <div className="product-prices">
                    <span className="old-price">
                      R$ {produto.preco.toFixed(2)}
                    </span>

                    <span className="new-price">
                      R$ {(produto.preco * (1 - produto.desconto / 100)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* OFERTA ESPECIAL */}
      <section className="special-offer">
        <div className="special-offer-image">
          <img
            src={airJordan}
            alt="Tênis Air Jordan edição de colecionador"
          />
        </div>

        <div className="special-offer-content">
          <p className="special-offer-label">
            Oferta especial
          </p>

          <h2>Air Jordan edição de colecionador</h2>

          <p>
            Conheça nossa coleção especial Air Jordan.
            Um modelo exclusivo para quem busca estilo,
            conforto e personalidade.
          </p>

          <Link
            to="/produto/5"
            className="special-offer-button"
          >
            Ver Oferta
          </Link>
        </div>
      </section>
    </>
  )
}

function App() {
  return (
    <>
      {/* CABEÇALHO */}
      <header className="header">
        <div className="header-top">
          <Link to="/" className="logo">
            <span className="logo-icon">D</span>
            Digital Store
          </Link>

          <div className="search">
            <input
              type="text"
              placeholder="Pesquisar produto..."
              aria-label="Pesquisar produto"
            />

            <button type="button" aria-label="Pesquisar">
              ⌕
            </button>
          </div>

          <div className="header-actions">
            <a href="#" className="register">
              Cadastre-se
            </a>

            <button type="button" className="login">
              Entrar
            </button>

            <a
              href="#"
              className="cart"
              aria-label="Carrinho"
            >
              🛒
              <span>2</span>
            </a>
          </div>
        </div>

        {/* MENU DE NAVEGAÇÃO */}
        <nav className="navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/produtos"
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            Produtos
          </NavLink>

          <NavLink
            to="/categorias"
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            Categorias
          </NavLink>

          <NavLink
            to="/meus-pedidos"
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            Meus Pedidos
          </NavLink>
        </nav>
      </header>

      {/* ROTAS DAS PÁGINAS */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/produtos"
            element={<Produtos />}
          />

          <Route
            path="/categorias"
            element={<Categorias />}
          />

          <Route
            path="/meus-pedidos"
            element={<MeusPedidos />}
          />

          <Route
            path="/produto/:id"
            element={<DetalhesProduto />}
          />
        </Routes>
      </main>

      {/* RODAPÉ */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-about">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">D</span>
              Digital Store
            </Link>

            <p>
              A Digital Store é sua loja de produtos
              favoritos. Encontre as melhores ofertas
              em calçados, roupas e acessórios.
            </p>

            <div className="footer-social">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                f
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                ◎
              </a>

              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                𝕏
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Informação</h3>
            <a href="#">Sobre Digital Store</a>
            <a href="#">Segurança</a>
            <a href="#">Wishlist</a>
            <a href="#">Blog</a>
            <a href="#">Trabalhe conosco</a>
            <Link to="/meus-pedidos">Meus Pedidos</Link>
          </div>

          <div className="footer-column">
            <h3>Categorias</h3>

            <Link to="/produtos?categoria=Camisetas">
              Camisetas
            </Link>

            <Link to="/produtos?categoria=Calças">
              Calças
            </Link>

            <Link to="/produtos?categoria=Headphones">
              Headphones
            </Link>

            <Link to="/produtos?categoria=Tênis">
              Tênis
            </Link>
          </div>

          <div className="footer-column footer-contact">
            <h3>Contato</h3>

            <p>
              Entre em contato com nossa equipe
              para tirar dúvidas sobre produtos e pedidos.
            </p>

            <p>Atendimento online</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Digital Store</p>
        </div>
      </footer>
    </>
  )
}

export default App
