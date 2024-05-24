import { CidadeOut, CidadeService } from "@/services/cidade";
import FisicaService, { FisicaOut } from "@/services/fisica";
import { formataCPF, formataRG, formataTelefone } from "@/services/fisica/utils";
import React, { useEffect, useState } from "react";

interface FisicaCardProps {
  setCardOpen: (open: boolean) => boolean | void;
  pessoaId: number;
}

enum Genero {
  Masculino = 1,
  Feminino = 2,
  Outro = 3,
}

const FisicaCard: React.FC<FisicaCardProps> = ({ pessoaId, setCardOpen }) => {
  const [pessoa, setPessoa] = useState<FisicaOut>();
  const [cidade, setCidade] = useState<CidadeOut>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pessoaId > 0) {
      fetchFisica();
    }
  }, [pessoaId]);

  const fetchCidade = async (cid_id: string) => {
    const data = await CidadeService.getCidadeById(cid_id);
    setCidade(data);
  };

  const fetchFisica = async () => {
    setLoading(true);
    const data = await FisicaService.getFisicaById(pessoaId);
    setPessoa(data!);
    await fetchCidade(data!.cid_id.toString());
    setLoading(false);
  };

  const getGenero = (id: number): string => {
    return Genero[id] || "Não especificado";
  };

  return (
    <div className="card card-compact w-full max-w-lg bg-base-100 shadow-xl">
      <figure className="p-4">
        <img
          src="https://krit.com.br/wp-content/uploads/2023/08/icone-pessoa-fisica.png"
          alt="Pessoa Física"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-center text-2xl font-bold mb-4">Ficha de cadastro</h2>
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : (
          pessoa && cidade && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Nome:</span>
                <span>{pessoa.pes_nome}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">CPF:</span>
                <span>{formataCPF(pessoa.fis_cpf)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">RG:</span>
                <span>{formataRG(pessoa.fis_rg)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{pessoa.pes_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Telefone:</span>
                <span>{formataTelefone(pessoa.pes_telefone)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Gênero:</span>
                <span>{getGenero(pessoa.sex_id)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Data de Nascimento:</span>
                <span>{new Date(pessoa.fis_data_nascimento).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Endereço:</span>
                <span>{`${pessoa.pes_logradouro}, ${pessoa.pes_numero} - ${pessoa.pes_bairro}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Complemento:</span>
                <span>{pessoa.pes_complemento}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Cidade:</span>
                <span>{cidade.cid_nome}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span>{pessoa.pes_status ? 'Ativo' : 'Inativo'}</span>
              </div>
            </div>
          )
        )}
        <div className="card-actions mt-4 justify-end">
          <button className="btn btn-primary" onClick={() => setCardOpen(false)}>Voltar</button>
        </div>
      </div>
    </div>
  );
};

export default FisicaCard;
