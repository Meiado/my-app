import FisicaService, { FisicaOut } from "@/services/fisica";
import { formataCPF, formataTelefone } from "@/services/fisica/utils";
import { useEffect, useState } from "react";

const ListaPessoasFisicas = () => {
    const [fisicas, setFisicas] = useState<FisicaOut[]>([]);

    useEffect(() => {
        fetchFisicas();
    }, []);

    const fetchFisicas = async () => {
        const data = await FisicaService.getFisicas();
        console.log(data);
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPessoasFisicas;