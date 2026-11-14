
import { Link } from 'react-router-dom'

function MeusPedidos() {
  return (
    <section
      style={{
        minHeight: '450px',
        padding: '80px 20px',
        backgroundColor: '#f9f8fe',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '32px',
          color: '#1f1f1f',
          marginBottom: '20px',
        }}
      >
        Meus Pedidos
      </h1>

      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '50px 25px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
        }}
      >
        <h2
          style={{
            fontSize: '22px',
            marginBottom: '15px',
          }}
        >
          Você ainda não realizou nenhum pedido
        </h2>

        <p
          style={{
            color: '#666666',
            lineHeight: '1.6',
            marginBottom: '30px',
          }}
        >
          Explore nossos produtos e encontre suas
          ofertas favoritas na Digital Store.
        </p>

        <Link
          to="/produtos"
          style={{
            display: 'inline-block',
            padding: '14px 30px',
            backgroundColor: '#C92071',
            color: '#ffffff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Continuar comprando
        </Link>
      </div>
    </section>
  )
}

export default MeusPedidos
