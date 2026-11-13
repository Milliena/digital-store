
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { listaProdutos } from '../data/produtos'

import './Produtos.css'

function Produtos() {
  const [searchParams, setSearchParams] = useSearchParams()

  const colecao = searchParams.get('colecao') || ''
  const categoriaUrl = searchParams.get('categoria') || ''

  const marcas = ['Nike', 'Adidas', 'K-Swiss', 'Supreme', 'Beats']
  const categorias = ['Tênis', 'Camisetas', 'Calças', 'Headphones']

  const [marcasSelecionadas, setMarcasSelecionadas] = useState([])
  const [categoriaManual, setCategoriaManual] = useState('')
  const [ordenacao, setOrdenacao] = useState('relevancia')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const categoriaSelecionada = categoriaUrl || categoriaManual

  function alternarMarca(marca) {
    setMarcasSelecionadas((anteriores) =>
      anteriores.includes(marca)
        ? anteriores.filter((item) => item !== marca)
        : [...anteriores, marca]
    )
  }

  function alterarCategoria(categoria) {
    setCategoriaManual(categoria)

    const novosParametros = new URLSearchParams(searchParams)
    novosParametros.delete('categoria')
    setSearchParams(novosParametros)
  }

  function limparFiltros() {
    setMarcasSelecionadas([])
    setCategoriaManual('')
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
              : categoriaSelecionada || 'Todos os produtos'}
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
                onChange={() => alterarCategoria('')}
              />
              Todas
            </label>

            {categorias.map((categoria) => (
              <label key={categoria} className="filtro-opcao">
                <input
                  type="radio"
                  name="categoria"
                  checked={categoriaSelecionada === categoria}
                  onChange={() => alterarCategoria(categoria)}
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
