
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { listaProdutos } from '../data/produtos'

import './DetalhesProduto.css'

function DetalhesProduto() {
  const { id } = useParams()

  const produto = listaProdutos.find(
    (item) => item.id === Number(id)
  )

  const [tamanho, setTamanho] = useState('')
  const [mensagem, setMensagem] = useState('')

  if (!produto) {
    return (
      <div className="detalhes-pagina">
        <h1>Produto não encontrado</h1>
        <Link to="/produtos">Voltar aos produtos</Link>
      </div>
    )
  }

  const precoFinal =
    produto.preco * (1 - produto.desconto / 100)

  const tamanhos =
    produto.categoria === 'Tênis'
      ? ['38', '39', '40', '41', '42']
      : produto.categoria === 'Camisetas'
        ? ['P', 'M', 'G', 'GG']
        : produto.categoria === 'Calças'
          ? ['36', '38', '40', '42', '44']
          : []

  function comprar() {
    if (tamanhos.length > 0 && !tamanho) {
      setMensagem('Selecione um tamanho antes de continuar.')
      return
    }

    setMensagem(
      'Produto selecionado! Carrinho em desenvolvimento.'
    )
  }

  return (
    <div className="detalhes-pagina">
      <div className="detalhes-container">
        <p className="detalhes-caminho">
          <Link to="/">Home</Link>
          {' / '}
          <Link to="/produtos">Produtos</Link>
          {' / '}
          {produto.nome}
        </p>

        <div className="detalhes-conteudo">
          <div className="detalhes-galeria">
            <div className="detalhes-imagem">
              <span className="detalhes-desconto">
                {produto.desconto}% OFF
              </span>

              <img
                src={produto.imagem}
                alt={produto.nome}
              />
            </div>
          </div>

          <div className="detalhes-informacoes">
            <span className="detalhes-categoria">
              {produto.categoria}
            </span>

            <h1>{produto.nome}</h1>

            <div className="detalhes-avaliacao">
              <span className="detalhes-estrelas">
                ★★★★★
              </span>
              <span className="detalhes-nota">
                4.5
              </span>
              <span className="detalhes-avaliacoes">
                Avaliação ilustrativa
              </span>
            </div>

            <div className="detalhes-precos">
              <span className="detalhes-preco-antigo">
                R$ {produto.preco.toFixed(2)}
              </span>

              <strong className="detalhes-preco-atual">
                R$ {precoFinal.toFixed(2)}
              </strong>
            </div>

            <h3>Descrição do produto</h3>

            <p className="detalhes-descricao">
              Conheça {produto.nome}, uma ótima escolha
              para quem busca estilo, conforto e qualidade.
              Aproveite nossas ofertas especiais e encontre
              o produto ideal para você.
            </p>

            {tamanhos.length > 0 && (
              <div className="detalhes-tamanhos">
                <h3>Escolha o tamanho</h3>

                <div className="tamanhos-opcoes">
                  {tamanhos.map((opcao) => (
                    <button
                      key={opcao}
                      type="button"
                      className={
                        tamanho === opcao ? 'selecionado' : ''
                      }
                      onClick={() => {
                        setTamanho(opcao)
                        setMensagem('')
                      }}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              className="detalhes-comprar"
              onClick={comprar}
            >
              COMPRAR
            </button>

            {mensagem && (
              <p className="detalhes-mensagem">
                {mensagem}
              </p>
            )}
          </div>
        </div>

        <div className="detalhes-voltar">
          <Link to="/produtos">
            ← Voltar para todos os produtos
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DetalhesProduto
