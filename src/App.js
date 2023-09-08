import api from './services/api'
import {useState} from 'react'
import {FcSearch} from 'react-icons/fc'
import './Style.css'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')

  async function buscar() {

    if (input === '') {
      alert("Preencha o CEP corretamente!")
      return
    }

    try {
      const responsiva = await api.get(`${input}/json`)
      setCep(responsiva.data)
      setInput("")

    } catch {
      alert("Erro ao buscar. Verifique se seu CEP está correto!")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="titulo">Buscador Cep</h1>

      <div className="box">
        <input type="text" placeholder="Digite seu Cep"
        value={input} onChange={(e) => setInput(e.target.value) }></input>

        <button className="pesquisar" onClick={buscar}><FcSearch size={20}/></button>
      </div>
      
      {Object.keys(cep).length > 0 && (
        <main className='conteudo'>
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro} </span>
          <span>Cidade: {cep.localidade} {cep.uf} </span>
        </main>
      )}
      
    </div>
  );
}

export default App;
