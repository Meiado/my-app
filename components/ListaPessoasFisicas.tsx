import FisicaService, { FisicaOut } from "@/services/fisica";
import { formataCPF, formataTelefone } from "@/services/fisica/utils";
import { useEffect, useState } from "react";
import { FaEdit, FaAddressCard } from "react-icons/fa";
import FisicaModal from "./FisicaModal";
import FisicaForm from "./FisicaForm";
import FisicaCard from "./FisicaCard";
import CardModal from "./CardModal";


const ListaPessoasFisicas = () => {
    const [fisicas, setFisicas] = useState<FisicaOut[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [pessoaId, setPessoaId] = useState(0);
    const [cardOpen, setCardOpen] = useState(false);

    useEffect(() => {
        fetchFisicas();
    }, []);

    const fetchFisicas = async () => {
        const data = await FisicaService.getFisicas();
        setFisicas(data);
    };

    return (
        <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fisicas.map((fisica, index) => (
            <tr key={index}>
              <td>{fisica.pes_nome}</td>
              <td>{formataCPF(fisica.fis_cpf)}</td>
              <td>{fisica.pes_email}</td>
              <td>{formataTelefone(fisica.pes_telefone)}</td>
              <td>{fisica.pes_status ? 'Ativo' : 'Inativo'}</td>
              <td>
                <FaEdit cursor="pointer" onClick={() => { setPessoaId(fisica.pes_id); setModalOpen(true) } } className="text-blue-300" size={20} />
                <FisicaModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                  <FisicaForm pessoaId = {pessoaId}/>
                  <button onClick={() => {setModalOpen(false); setPessoaId(0)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </FisicaModal>
              </td>
              <td>
              <FaAddressCard cursor="pointer" onClick={() => {  setCardOpen(true), setPessoaId(fisica.pes_id) } } className="text-blue-300" size={20} />
                <CardModal cardOpen={cardOpen} setCardOpen={setCardOpen}>
                  <FisicaCard pessoaId={pessoaId} setCardOpen={setCardOpen}/>
                </CardModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPessoasFisicas;