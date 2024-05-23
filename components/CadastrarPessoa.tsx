import { AiOutlinePlus } from 'react-icons/ai'
import { InputMask } from '@react-input/mask';
import FisicaModal from './FisicaModal';
import { useEffect, useState } from 'react';
import { formataRG, formataCPF, formataTelefone, validaEmail } from '@/services/fisica/utils';
import FisicaForm from './FisicaForm';

const CadastrarPessoaFisica = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div>
      <button className="btn btn-primary" onClick={() => setModalOpen(true)}> <AiOutlinePlus/> Cadastrar Pessoa Física</button>
      <FisicaModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <FisicaForm />
        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </FisicaModal>
    </div>
  );
};

export default CadastrarPessoaFisica;
