
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import produto1 from '../assets/produto1.png'
import adidas from '../assets/adidas.png'
import supreme from '../assets/supreme.png'
import beats from '../assets/beats.png'
import airJordan from '../assets/airJordan.png'

import './Produtos.css'

const listaProdutos = [
  {
    id: 1,
    nome: 'K-Swiss V8 - Masculino',
    categoria: 'Tênis',
    marca: 'K-Swiss',
    preco: 200,
    desconto: 30,
    imagem: produto1
  },
  {
    id: 2,
    nome: 'Tênis Adidas',
    categoria: 'Tênis',
    marca: 'Adidas',
    preco: 350,
    desconto: 30,
    imagem: adidas
  },
  {
    id: 3,
    nome: 'Camiseta Supreme',
    categoria: 'Camisetas',
    marca: 'Supreme',
    preco: 180,
    desconto: 30,
    imagem: supreme
  },
  {
    id: 4,
    nome: 'Headphone Beats Bass',
    categoria: 'Headphones',
    marca: 'Beats',
    preco: 450,
    desconto: 30,
    imagem: beats
  },
  {
    id: 5,
    nome: 'Air Jordan Colecionador',
    categoria: 'Tênis',
    marca: 'Nike',
    preco: 600,
    desconto: 20,
    imagem: airJordan
  },
  {
    id: 6,
    nome: 'K-Swiss V8 Casual',
    categoria: 'Tênis',
    marca: 'K-Swiss',
    preco: 250,
    desconto: 20,
    imagem: produto1
  },
  {
    id: 7,
    nome: 'Tênis Adidas Esportivo',
    categoria: 'Tênis',
    marca: 'Adidas',
    preco: 400,
    desconto: 25,
    imagem: adidas
  },
  {
    id: 8,
    nome: 'Camiseta Supreme Classic',
    categoria: 'Camisetas',
    marca: 'Supreme',
    preco: 220,
    desconto: 15,
    imagem: supreme
  }
]

function Produtos() {
  const [searchParams, setSearchParams] = useSearchParams()
  const colecao = searchParams.get('colecao')

  const marcas = ['Nike', 'Adidas', 'K-Swiss', 'Supreme', 'Beats']
  const categorias = ['Tênis', 'Camisetas', 'Headphones']

  const [marcasSelecionadas, setMarcasSelecionadas] = useState([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('')
  const [ordenacao, setOrdenacao] = useState('relevancia')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  function alternarMarca(marca) {
    setMarcasSelecionadas((anteriores) =>
      anteriores.includes(marca)
        ? anteriores.filter((item) => item !== marca)
        : [...anteriores, marca]
    )
  }

  function limparFiltros() {
    setMarcasSelecionadas([])
    setCategoriaSelecionada('')
    setOrdenacao('relevancia')
    setSearchParams({})
  }

  const produtosFiltrados = listaProdutos
    .filter((produto) => {
      const correspondeMarca =
        marcasSelecionadas.length === 0 ||
        marcasSelecionadas.includes(produto.marca)

      const correspondeCategoria =
        !categoriaSelecionada ||
        produto.categoria === categoriaSelecionada

      const correspondeColecao =
        !colecao ||
        produto.marca.toLowerCase() === colecao.toLowerCase()

      return (
        correspondeMarca &&
        correspondeCategoria &&
        correspondeColecao
      )
    })
    .sort((a, b) => {
      const precoA = a.preco * (1 - a.desconto / 100)
      const precoB = b.preco * (1 - b.desconto / 100)

      if (ordenacao === 'menor') return precoA - precoB
      if (ordenacao === 'maior') return precoB - precoA

      return a.id - b.id
    })

  return (
    <div className="pagina-produtos">
      <div className="produtos-topo">
        <div>
          <h1>
            {colecao
              ? `Coleção ${colecao.charAt(0).toUpperCase() + colecao.slice(1)}`
              : 'Todos os produtos'}
          </h1>

          <p>{produtosFiltrados.length} produtos encontrados</p>
        </div>

        <div className="ordenacao">
          <label htmlFor="ordenar">Ordenar por:</label>

          <select
            id="ordenar"
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
          >
            <option value="relevancia">Mais relevantes</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        className="botao-filtros-mobile"
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
        aria-expanded={mostrarFiltros}
        aria-controls="painel-filtros"
      >
        {mostrarFiltros ? '✕ Fechar filtros' : '☰ Filtrar produtos'}
      </button>

      <div className="produtos-conteudo">
        {/* FILTROS */}
        <aside
          id="painel-filtros"
          className={`filtros ${mostrarFiltros ? 'filtros-abertos' : ''}`}
        >
          <h2>Filtrar por</h2>

          <div className="filtro-grupo">
            <h3>Marca</h3>

            {marcas.map((marca) => (
              <label key={marca} className="filtro-opcao">
                <input
                  type="checkbox"
                  checked={marcasSelecionadas.includes(marca)}
                  onChange={() => alternarMarca(marca)}
                />
                {marca}
              </label>
            ))}
          </div>

          <div className="filtro-grupo">
            <h3>Categoria</h3>

            <label className="filtro-opcao">
              <input
                type="radio"
                name="categoria"
                checked={categoriaSelecionada === ''}
                onChange={() => setCategoriaSelecionada('')}
              />
              Todas
            </label>

            {categorias.map((categoria) => (
              <label key={categoria} className="filtro-opcao">
                <input
                  type="radio"
                  name="categoria"
                  checked={categoriaSelecionada === categoria}
                  onChange={() => setCategoriaSelecionada(categoria)}
                />
                {categoria}
              </label>
            ))}
          </div>

          <button
            type="button"
            className="limpar-filtros"
            onClick={limparFiltros}
          >
            Limpar filtros
          </button>
        </aside>

        {/* LISTA DE PRODUTOS */}
        <section className="listagem-produtos">
          <div className="listagem-grid">
            {produtosFiltrados.map((produto) => {
              const precoFinal =
                produto.preco * (1 - produto.desconto / 100)

              return (
                <Link
                  to={`/produto/${produto.id}`}
                  className="link-produto"
                  key={produto.id}
                >
                  <article className="item-produto">
                    <div className="item-produto-imagem">
                      <span className="item-desconto">
                        {produto.desconto}% OFF
                      </span>

                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                      />
                    </div>

                    <div className="item-produto-info">
                      <p>{produto.categoria}</p>
                      <h3>{produto.nome}</h3>

                      <div className="item-precos">
                        <span className="preco-antigo">
                          R$ {produto.preco.toFixed(2)}
                        </span>

                        <strong>
                          R$ {precoFinal.toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>

          {produtosFiltrados.length === 0 && (
            <div className="sem-produtos">
              <h3>Nenhum produto encontrado.</h3>
              <p>Tente selecionar outros filtros.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Produtos
