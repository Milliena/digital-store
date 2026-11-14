
import { Link } from 'react-router-dom'
import { useCarrinho } from '../context/CarrinhoContext'

import './Carrinho.css'

function Carrinho() {
  const {
    itens,
    removerProduto,
    alterarQuantidade,
    limparCarrinho,
    valorTotal
  } = useCarrinho()

  const formatarPreco = (valor) =>
    valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

  function finalizarCompra() {
    if (itens.length === 0) return

    alert('Pedido realizado com sucesso! Esta é uma compra demonstrativa.')
    limparCarrinho()
  }

  return (
    <div className="carrinho-pagina">
      <div className="carrinho-container">
        <h1>Meu carrinho</h1>

        {itens.length === 0 ? (
          <div className="carrinho-vazio">
            <p>Seu carrinho está vazio.</p>
            <Link to="/produtos">Continuar comprando</Link>
          </div>
        ) : (
          <>
            <div className="carrinho-lista">
              {itens.map((item) => (
                <article className="carrinho-item" key={item.chave}>
                  <img src={item.imagem} alt={item.nome} />

                  <div className="carrinho-info">
                    <h2>{item.nome}</h2>

                    {item.tamanho && (
                      <p>Tamanho: {item.tamanho}</p>
                    )}

                    <strong>{formatarPreco(item.preco)}</strong>
                  </div>

                  <div className="carrinho-quantidade">
                    <button
                      type="button"
                      onClick={() =>
                        alterarQuantidade(
                          item.chave,
                          item.quantidade - 1
                        )
                      }
                      aria-label={`Diminuir quantidade de ${item.nome}`}
                    >
                      −
                    </button>

                    <span>{item.quantidade}</span>

                    <button
                      type="button"
                      onClick={() =>
                        alterarQuantidade(
                          item.chave,
                          item.quantidade + 1
                        )
                      }
                      aria-label={`Aumentar quantidade de ${item.nome}`}
                    >
                      +
                    </button>
                  </div>

                  <div className="carrinho-subtotal">
                    <strong>
                      {formatarPreco(item.preco * item.quantidade)}
                    </strong>

                    <button
                      type="button"
                      onClick={() => removerProduto(item.chave)}
                    >
                      Remover
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="carrinho-resumo">
              <h2>Resumo do pedido</h2>

              <div className="carrinho-total">
                <span>Total</span>
                <strong>{formatarPreco(valorTotal)}</strong>
              </div>

              <button
                type="button"
                className="carrinho-finalizar"
                onClick={finalizarCompra}
              >
                Finalizar compra
              </button>

              <Link to="/produtos">Continuar comprando</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Carrinho
