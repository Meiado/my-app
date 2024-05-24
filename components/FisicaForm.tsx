import { formataCPF, formataRG, formataTelefone, validarCPF, validaEmail, validaTamanhoRg, validaTamanhoTelefone, validarDataNascimento } from "@/services/fisica/utils";
import React, { ChangeEvent, useEffect, useState } from "react";
import SelectEstado from "./SelectEstado";
import SelectCidade from "./SelectCidade";
import FisicaService, { FisicaIn, FisicaOut } from "@/services/fisica";
import { CidadeOut, CidadeService } from "@/services/cidade";
import { EstadoService } from "@/services/estado";
import { format } from "date-fns";
import AvisoModal from "./AvisoModal";

interface FisicaFormProps {
  pessoaId: number;
}

const FisicaForm = ({ pessoaId }: FisicaFormProps) => {

  const [popAviso, setpopAviso] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [pessoa, setPessoa] = useState<FisicaOut>();
  const [showStatus, setshowStatus] = useState(false);
  const [showAdicionais, setshowAdicionais] = useState(false);
  const [showContato, setshowContato] = useState(false);
  const [showEndereco, setshowEndereco] = useState(false);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadesDoEstado, setCidadesDoEstado] = useState<CidadeOut[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [formData, setFormData] = useState({
    cpf: '',
    nomeCompleto: '',
    rg: '',
    genero: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    logradouro: '',
    complemento: '',
    numero: '',
    bairro: '',
    cidade: '',
    status: true,
  });

  const statusLabel = formData.status ? 'Ativo' : 'Inativo';

  useEffect(() => {
    fetchPessoa();
  }, []);

  const fetchPessoa = async () => {
      const pessoa = await FisicaService.getFisicaById(pessoaId);
      setPessoa(pessoa!);
  };

  useEffect(() => {
    const { cpf, rg, nomeCompleto, genero, dataNascimento } = formData;
    if (cpf && rg && nomeCompleto && genero && dataNascimento) {
      setshowContato(true);
    } else {
      setshowContato(false);
    }
  }, [formData]);

  useEffect(() => {
    if(pessoaId > 0)  {
      fetchPessoa();
      setshowStatus(true);
      setshowContato(true);
      setshowEndereco(true);
      setshowAdicionais(true);
    }
    else
     setshowStatus(false);
  }, [pessoaId]);

  useEffect(() => {
    if (pessoaId > 0 && pessoa) {
      setFormData({
        cpf: pessoa.fis_cpf,
        nomeCompleto: pessoa.pes_nome,
        rg: formataRG(pessoa.fis_rg),
        genero: pessoa.sex_id.toString(),
        dataNascimento: format(pessoa.fis_data_nascimento,"yyyy-MM-dd"),
        telefone: formataTelefone(pessoa.pes_telefone),
        email: pessoa.pes_email,
        logradouro: pessoa.pes_logradouro,
        complemento: pessoa.pes_complemento,
        numero: pessoa.pes_numero,
        bairro: pessoa.pes_bairro,
        cidade: pessoa.cid_id.toString(),
        status: pessoa.pes_status
      });
    }
  }, [pessoaId, pessoa]);

  useEffect(() => {
    const { email, telefone } = formData;
    if (validaEmail(email) && telefone) {
      setshowEndereco(true);
    } else {
      setshowEndereco(false);
    }
  }, [formData]);

  useEffect(() => {
    if(estadoSelecionado !== '')
      fetchCidades(estadoSelecionado);
    else
      setCidadesDoEstado([]);
  }, [estadoSelecionado]);

  const fetchCidades = async (estado: string) => {
      const data = await CidadeService.getCidadesByEstado(estado);
      setCidadesDoEstado(data);
  };
 
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, cpf: value });
    if (value.replace(/\D/g, '').length === 11) {
      if(validarCPF(value))
          setshowAdicionais(true);
      else {
        setMensagem('Insira um CPF válido');
        setpopAviso(true);
      }
    } else {
      setshowAdicionais(false);
    }
    setFormData({ ...formData, cpf: formataCPF(value) });
  };

  const handleRgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, rg: value });
    setFormData({ ...formData, rg: formataRG(value) });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, email: value });
  }

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, telefone: value });
    setFormData({ ...formData, telefone: formataTelefone(value) });

  }

  const handleChangeCidade = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCidadeSelecionada(value);

    try {
      const cidade = await CidadeService.getCidadeById(value);
      const estadoDaCidade = await EstadoService.getEstadoById(cidade.est_id);
      
      // Agora você tem o estado da cidade selecionada
      // Atualize o estado do formulário com o estado da cidade
      setEstadoSelecionado(estadoDaCidade.est_id.toString());
    } catch (error) {
      console.error('Erro ao buscar cidade:', error);
    }
  }

  const handleChangeEstado = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const estadoId = e.target.value;
    setEstadoSelecionado(estadoId);
  }

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: (name === 'numero' && value !== '') ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para enviar os dados do formulário para o servidor

    if(popAviso) {
      return;
    }

    if(!validarCPF(formData.cpf)) {
      setMensagem('Insira um CPF válido');
      setpopAviso(true);
      return;
    }
    
    if(!validaTamanhoRg(formData.rg)) {
      setpopAviso(true);
      setMensagem('Formato do RG inválido');
      return;
    }
    if(!validarDataNascimento(formData.dataNascimento)) {
      setpopAviso(true);
      setMensagem('Data inválida');
      return;
    } 

    if(!validaTamanhoTelefone(formData.telefone)) {
      setpopAviso(true);
      setMensagem('Formato do Telefone inválido');
      return;
    }

    console.log(formData);

    const pessoaFisica: FisicaIn = {
      pes_nome: formData.nomeCompleto,
      pes_email: formData.email,
      pes_telefone: formData.telefone,
      pes_logradouro: formData.logradouro,
      pes_complemento: formData.complemento,
      pes_numero: formData.numero,
      pes_bairro: formData.bairro,
      cid_id: parseInt(formData.cidade),
      pes_status: formData.status,
      fis_cpf: formData.cpf,
      fis_rg: formData.rg,
      sex_id: parseInt(formData.genero),
      fis_data_nascimento: new Date(formData.dataNascimento),
    }
    if(pessoaId > 0 && pessoa) 
      FisicaService.updateFisica(pessoa.pes_id, pessoaFisica);
    else 
      FisicaService.createFisica(pessoaFisica);
    
  }

    return (
      <>
        <AvisoModal popAviso={popAviso} setpopAviso={setpopAviso} mensagem={mensagem} setMensagem={setMensagem} />
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">CPF: *</span>
            </label>
            <input
              type='text'
              value={formataCPF(formData.cpf)}
              onChange={handleCpfChange}
              className="input input-bordered"
              maxLength={14}
              required
            />
          </div>
          {showAdicionais && (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nome Completo: *</span>
                </label>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className='columns-3'>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">RG: </span>
                </label>
                <input
                  type="text"
                  name="rg"
                  value={formData.rg}
                  onChange={handleRgChange}
                  maxLength={13}
                  className="input input-bordered"
                  required
                />
                
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Data de Nascimento: *</span>
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  pattern="\d{1,2}/\d{1,2}/\d{4}"
                  onChange={handleChange}
                  className="input input-bordered"
                  maxLength={10}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gênero: *</span>
                </label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="select select-bordered"
                  required
                >
                  <option value="" disabled>Selecione</option>
                  <option value="1">Masculino</option>
                  <option value="2">Feminino</option>
                  <option value="3">Outro</option>
                </select>
              
              </div>
              </div>
            </>
          )}

          {showContato && (
            <>
              <div className='columns-2'>
                <div className='form-control'>
                  <label className="label">
                    <span className="label-text">Telefone: </span>
                  </label>
                  <input 
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleTelefoneChange}
                    className='input input-bordered'
                    maxLength={15}
                  />
                </div>
                <div className='form-control'>
                  <label className="label">
                    <span className="label-text">Email: *</span>
                  </label>
                  <input 
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={handleEmailChange}
                    className='input input-bordered'
                  />
                </div>
              </div>
            </>
          )}
          {showEndereco && (
            <>
            <div className='columns-3'>
              <div className='form-control'>
                <label className="label">
                  <span className="label-text">Logradouro: *</span>
                </label>
                <input 
                  type="text"
                  name='logradouro'
                  value={formData.logradouro}
                  onChange={handleChange}
                  className='input input-bordered'
                  required
                />
              </div>
              <div className='form-control'>
              <label className="label">
                  <span className="label-text">Número: *</span>
                </label>
                <input 
                  type="number"
                  name='numero'
                  value={formData.numero}
                  onChange={handleChange}
                  className='input input-bordered no-spinner'
                  maxLength={4}
                  required
                />
              </div>
              <div className='form-control'>
              <label className="label">
                  <span className="label-text">Bairro: *</span>
                </label>
                <input 
                  type="text"
                  name='bairro'
                  value={formData.bairro}
                  onChange={handleChange}
                  className='input input-bordered'
                  required
                />
              </div>
              </div>
              <div className='columns-3'>
                <div className='form-control'>
                  <label className="label">
                    <span className="label-text">Complemento: </span>
                  </label>
                  <input 
                    type="text"
                    name='complemento'
                    value={formData.complemento}
                    onChange={handleChange}
                    className='input input-bordered'
                    required
                  />
                </div>
                <SelectEstado 
                  onChange = {handleChangeEstado}
                  value = {estadoSelecionado}
                  />
                <div className="form-control">
                  <label className="label">
                      <span className="label-text">Cidade: *</span>
                  </label>
                  <select onChange={handleChangeCidade} name="cidade" value={formData.cidade} className="select select-bordered" id="cidade">
                      {!(cidadesDoEstado.length > 0) && (
                          <option value="" selected>Selecione um estado antes</option>
                      )}
                      {cidadesDoEstado.map(cidade => {
                          return (
                              <option key={cidade.cid_nome} value={cidade.cid_id}>
                                  {cidade.cid_nome}
                              </option>
                          );
                      })}
                  </select>
                </div>
                {/* <SelectCidade 
                  onChangeCidade = {handleChangeCidade} 
                  cidades = {cidadesDoEstado} 
                  cidadeId={cidadeSelecionada} 
                  /> */}
              </div>
            </>
          )}
          { showStatus && (
            <div className="form-control">
            <div className="mt-6 columns-2 flex justify-begin">
              <label className="label cursor-pointer gap-4">
                <span className="label-text">Status: </span>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={formData.status} // Definindo o estado do toggle
                  onChange={() => {
                    console.log(!formData.status);
                    setFormData({ ...formData, status: !formData.status }

                    )}} // Invertendo o estado do toggle
                />
                <span>{statusLabel}</span>
              </label>
            </div>
          </div>
          )}
          <div className="flex justify-end">
              <div className="mt-10 mr-5 badge badge-neutral">*: Campos obrigatórios</div>
              <div className="modal-action">
                <button type="submit" className="btn">Salvar</button>
              </div>
            </div>
        </form>
      </>
    );
}

export default FisicaForm;

// https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios
