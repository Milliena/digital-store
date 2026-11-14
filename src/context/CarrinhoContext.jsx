
import { createContext, useContext, useState } from 'react'

const CarrinhoContext = createContext(null)

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    try {
      const salvo = localStorage.getItem('digital-store-carrinho')
      return salvo ? JSON.parse(salvo) : []
    } catch {
      return []
    }
  })

  function atualizarCarrinho(novosItens) {
    setItens(novosItens)
    localStorage.setItem(
      'digital-store-carrinho',
      JSON.stringify(novosItens)
    )
  }

  function adicionarProduto(produto, tamanho = '') {
    const chave = `${produto.id}-${tamanho}`

    const existente = itens.find(
      (item) => item.chave === chave
    )

    let novosItens

    if (existente) {
      novosItens = itens.map((item) =>
        item.chave === chave
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    } else {
      novosItens = [
        ...itens,
        {
          chave,
          id: produto.id,
          nome: produto.nome,
          imagem: produto.imagem,
          tamanho,
          preco: produto.preco * (1 - produto.desconto / 100),
          quantidade: 1
        }
      ]
    }

    atualizarCarrinho(novosItens)
  }

  function removerProduto(chave) {
    atualizarCarrinho(
      itens.filter((item) => item.chave !== chave)
    )
  }

  function alterarQuantidade(chave, quantidade) {
    if (quantidade < 1) {
      removerProduto(chave)
      return
    }

    atualizarCarrinho(
      itens.map((item) =>
        item.chave === chave
          ? { ...item, quantidade }
          : item
      )
    )
  }

  function limparCarrinho() {
    atualizarCarrinho([])
  }

  const quantidadeTotal = itens.reduce(
    (total, item) => total + item.quantidade,
    0
  )

  const valorTotal = itens.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  )

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarProduto,
        removerProduto,
        alterarQuantidade,
        limparCarrinho,
        quantidadeTotal,
        valorTotal
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext)

  if (!contexto) {
    throw new Error(
      'useCarrinho deve ser usado dentro de CarrinhoProvider'
    )
  }

  return contexto
}
