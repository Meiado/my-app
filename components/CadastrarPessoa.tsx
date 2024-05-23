import { AiOutlinePlus } from 'react-icons/ai'
import FisicaModal from './FisicaModal';
import { useState } from 'react';

const AddTask = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className='btn btn-primary w-full'><AiOutlinePlus size={15} className='ml-2'/>Cadastrar nova pessoa</button>
            <FisicaModal modalOpen={modalOpen} setModalOpen={setModalOpen}> modal para cadastrar </FisicaModal>
        </div>
    )
};

export default AddTask;