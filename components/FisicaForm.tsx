import { formataCPF, formataRG, formataTelefone, validaEmail } from "@/services/fisica/utils";
import { useEffect, useState } from "react";

const FisicaForm = () => {

    const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [showAdicionais, setshowAdicionais] = useState(false);
  const [showContato, setshowContato] = useState(false);
  const [showEndereco, setshowEndereco] = useState(false);
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
    estado: '',
    cidade: '',
  });

  useEffect(() => {
    const { cpf, rg, nomeCompleto, genero, dataNascimento } = formData;
    if (cpf && rg && nomeCompleto && genero && dataNascimento) {
      setshowContato(true);
    } else {
      setshowContato(false);
    }
  }, [formData]);

  useEffect(() => {
    const { email, telefone } = formData;
    if (validaEmail(email) && telefone) {
      setshowEndereco(true);
    } else {
      setshowEndereco(false);
    }
  }, [formData]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCpf(value);
    setFormData({ ...formData, cpf: value });
    if (value.replace(/\D/g, '').length === 11) {
      setshowAdicionais(true);
    } else {
      setshowAdicionais(false);
    }
    setFormData({ ...formData, cpf: formataCPF(value) });
  };

  const handleRgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRg(value);
    setFormData({ ...formData, rg: value });
    setFormData({ ...formData, rg: formataRG(value) });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setFormData({ ...formData, email: value });
  }

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTelefone(value);
    setFormData({ ...formData, telefone: value });
    setFormData({ ...formData, telefone: formataTelefone(value) });

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para enviar os dados do formulário para o servidor
    console.log(formData);
  };


    return (
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">CPF</span>*
            </label>
            <input
              type='text'
              value={formataCPF(cpf)}
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
                  <span className="label-text">Nome Completo</span>*
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
                  <span className="label-text">RG</span>*
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
                  <span className="label-text">Data de Nascimento</span>*
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gênero</span>
                </label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="select select-bordered"
                  required
                >
                  <option value="" disabled>Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
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
                    <span className="label-text">Telefone:</span>
                  </label>
                  <input 
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleTelefoneChange}
                    className='input input-bordered'
                  />
                </div>
                <div className='form-control'>
                  <label className="label">
                    <span className="label-text">Email:</span>*
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
                  <span className="label-text">Logradouro</span>*
                </label>
                <input 
                  type="text"
                  name='logradouro'
                  value={formData.logradouro}
                  className='input input-bordered'
                  required
                />
              </div>
              <div className='form-control'>
              <label className="label">
                  <span className="label-text">Número</span>*
                </label>
                <input 
                  type="number"
                  name='number'
                  value={formData.numero}
                  className='input input-bordered'
                  required
                />
              </div>
              <div className='form-control'>
              <label className="label">
                  <span className="label-text">Bairro</span>*
                </label>
                <input 
                  type="text"
                  name='bairro'
                  value={formData.bairro}
                  className='input input-bordered'
                  required
                />
              </div>
              </div>
              <div className='columns-3'>
                <div className='form-control'>
                <label className="label">
                    <span className="label-text">Complemento</span>
                  </label>
                  <input 
                    type="text"
                    name='complemento'
                    value={formData.complemento}
                    className='input input-bordered'
                    required
                  />
                </div>
                <div className='form-control'>
                  <label className="label">
                    <span className="label-text">Estado</span>*
                  </label>
                  select de estado
                </div>
                <div className='form-control'>
                  <label className="label">
                    <span className="label-text">Cidade</span>*
                  </label>
                  select de cidade
                </div>
              </div>
            </>
          )}
          <div className="modal-action">
            <button type="submit" className="btn">Salvar</button>
          </div>
        </form>
    );
}

export default FisicaForm;