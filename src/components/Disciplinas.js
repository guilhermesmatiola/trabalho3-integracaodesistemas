import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../styles/logoufsc.png'

export default function Disciplinas() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [preRequisito, setPreRequisito] = useState("");
  const [equivalente, setEquivalente] = useState("");
  const [ementa, setEmenta] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [codigoPesquisa, setCodigoPesquisa] = useState('');
  const [disciplionaSolo, setDisciplionaSolo] = useState([]);
  const api = "https://worker-production-dff8.up.railway.app/disciplina";

  function submitData() {
    const body = {
      codigo,
      nome,
      carga_horaria:cargaHoraria,
      pre_requisito:preRequisito,
      equivalente,
      ementa
    };

    const request = axios.post("https://worker-production-dff8.up.railway.app/disciplina", body);



    request.then(response => {
      setCodigo("");
      setNome("");
      setCargaHoraria("");
      setPreRequisito("");
      setEquivalente("");
      setEmenta("")
      navigate('/');

    });

    request.catch(error => {
      if(error){
        alert("Dados incorretos!");
      }
  });
  }

  function renderDisciplinas(){

    const request = axios.get("https://worker-production-dff8.up.railway.app/disciplina");


    request.then(response => {
      setDisciplinas(response.data);
    });

    request.catch(error => {
    });
  }

  useEffect(() => {
    renderDisciplinas();
  }, []);

  function submitCodigo(event) {

    event.preventDefault();

    const body = {
      codigo: codigoPesquisa
    };
    const request = axios.post("https://worker-production-dff8.up.railway.app/codigo", body);


    request.then(response => {
      setCodigoPesquisa("");
      setDisciplionaSolo(response.data);

    });

    request.catch(error => {
      if(error){
        alert("Dados incorretos!");
      }
  });

  }

  return (
    <Container>
      <TopBar>
        <img src={logo} alt='logoufsc' />
        <h1>Alunos: Guilherme Schlindwein Matiola, <br></br> Joao Lucas Ferreira Silva,<br></br> Joao Victor Silva Barbosa e<br></br> Leticia Marques Bauler <br></br> <br></br> BLU3024 - Integra????o de sistemas para automa??ao </h1>
      </TopBar>
      <Form onSubmit={submitData}>
        <input type="text" placeholder="Codigo" id="codigo" value={codigo} onChange={e => setCodigo(e.target.value)}/>
        <input type="text" placeholder="Nome da disciplina" id="nome" value={nome} onChange={e => setNome(e.target.value)}/>
        <input type="text" placeholder="Carga hor??ria" id="cargaHoraria" value={cargaHoraria} onChange={e => setCargaHoraria(e.target.value)} />
        <input type="text" placeholder="Pre Requisito" id="Pre Requisito" value={preRequisito} onChange={e => setPreRequisito(e.target.value)} />
        <input type="text" placeholder="Disciplinas equivalentes" id="equivalentes" value={equivalente} onChange={e => setEquivalente(e.target.value)} />
        <input type="text" placeholder="Ementa" id="equivalentes" value={ementa} onChange={e => setEmenta(e.target.value)} />
        <button type='submit' > Cadastrar disciplina </button>
      </Form>

      <Moises>


          <DisciplinasRender>
            <>
            {disciplinas.map((item, index)=>(
                  <Recommendation>
                    <Titles>
                        <h1>{item.codigo} - {item.nome}</h1>
                        <h3>Carga Hor??ria: {item.carga_horaria}</h3>
                        <h3>Pr?? Requisito: {item.pre_requisito} </h3>
                        <h3>Disciplinas equivalentes: {item.equivalente} </h3>
                        <h3>Ementa: {item.ementa} </h3>
                    </Titles>
                    
                    <h2> {item.cargaHoraria}</h2>
                    
                    

                  </Recommendation>
              ))}
            </>
          </DisciplinasRender>

          <CodigoDisciplina>
                    <Form2 onSubmit={submitCodigo}>
                      <input type="text" placeholder="Digite o c??digo" id="codigo" value={codigoPesquisa} onChange={e => setCodigoPesquisa(e.target.value)}/>
                      <button type='submit' > Procurar disciplina </button>
                   </Form2>

                    
                   {disciplionaSolo.map((item, index)=>(
                      <Recommendation>
                        <Titles>
                            <h1>{item.codigo} - {item.nome}</h1>
                            <h3>Carga Hor??ria: {item.carga_horaria}</h3>
                            <h3>Pr?? Requisito: {item.pre_requisito} </h3>
                            <h3>Disciplinas equivalentes: {item.equivalente} </h3>
                            <h3>Ementa: {item.ementa} </h3>
                        </Titles>
                        
                        <h2> {item.cargaHoraria}</h2>
                        
                        

                      </Recommendation>
                   ))}
                  

          </CodigoDisciplina>
          

      </Moises>

    </Container>
  );
}

const Moises=styled.div`
  display: flex;
  margin-top: 20px;
`

const CodigoDisciplina=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;

`

const Recommendation = styled.div`
  margin-top: 8px;
  border: 2px solid black;
  min-width: 300px;
  min-height: 120px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-sizing: border-box;
  
  img{
    height: 100px;
    width: 100px;
  }
  h2{
    display: flex;
    flex-direction: row;
    font-size: 20px;

    h1{
      color:red;
      font-size: 20px;
      margin-right: 2px;
    }
  }
`
const Titles = styled.div`
  display: flex;
  flex-direction: column;
  h1{
    color:black;
    font-size: 28px;
  }
  h3{
    margin: 3px 3px 3px 0;
  }
`

const DisciplinasRender = styled.div`
  display: flex;
  flex-direction: column;
  #divContent{
    overflow:auto; 
  }
  height: 400px;
  overflow-y: scroll;
`

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-left: 31px;
  padding-right: 31px;
  display: flex;
  //justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f7f8f9;
`;

const TopBar = styled.div`
    min-width: 23%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0px;
    img{
        height: 100px;
        margin-right: 6px;
    }

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 36px;
    margin-left: 36px;
    margin-top:20px;
    input {
        height: 30px;
        margin-right: 36px;
        margin-left: 36px;
        min-width: 150px;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px solid #D4D4D4; 
        padding-left:11px ;
        box-sizing: border-box;
    }
    input::placeholder {
        color: grey;
        font-size: 20px;
        font-style: italic;
        box-sizing: border-box;
    }
    button {
        min-width: 303px;
        height: 35px;
        margin-right: 36px;
        margin-left: 36px;
        text-align: center;
        background: #0384fc;
        color: #FFFFFF;
        font-size: 21px;
        border: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        a{
            text-decoration: none;
        }
        
    }
`

const Form2 = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 36px;
    margin-left: 36px;
    margin-top:20px;
    input {
        height: 30px;
        margin-right: 36px;
        margin-left: 36px;
        min-width: 80px;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px solid #D4D4D4; 
        padding-left:11px ;
        box-sizing: border-box;
    }
    input::placeholder {
        color: grey;
        font-size: 20px;
        font-style: italic;
        box-sizing: border-box;
    }
    button {
        min-width: 60px;
        height: 35px;
        margin-right: 36px;
        margin-left: 36px;
        text-align: center;
        background: #0384fc;
        color: #FFFFFF;
        font-size: 21px;
        border: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        a{
            text-decoration: none;
        }
        
    }
`