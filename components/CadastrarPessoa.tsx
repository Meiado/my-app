import { AiOutlinePlus } from 'react-icons/ai'
import FisicaModal from './FisicaModal';
import { useState } from 'react';
import FisicaForm from './FisicaForm';

const CadastrarPessoaFisica = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pessoaId, setPessoaId] = useState(0);
  
  return (
    <div>
      <button className="w-full btn btn-primary" onClick={() => setModalOpen(true)}> <AiOutlinePlus/> Cadastrar Pessoa Física</button>
      <FisicaModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <FisicaForm pessoaId = {pessoaId}/>
        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </FisicaModal>
    </div>
  );
};

export default CadastrarPessoaFisica;
