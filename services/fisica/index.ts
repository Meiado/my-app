import api from "../api";

export interface FisicaIn {
  pes_nome: string,
  pes_email: string,
  pes_telefone: string,
  pes_logradouro: string,
  pes_complemento: string,
  pes_numero: string,
  pes_bairro: string,
  cid_id: number,
  pes_status: boolean,
  fis_cpf: string,
  fis_rg: string,
  sex_id: number,
  fis_data_nascimento: Date
}

export interface FisicaOut {
  pes_id: number,
  pes_nome: string,
  pes_email: string,
  pes_telefone: string,
  pes_logradouro: string,
  pes_complemento: string,
  pes_numero: string,
  pes_bairro: string,
  cid_id: number,
  pes_status: boolean,
  fis_cpf: string,
  fis_rg: string,
  sex_id: number,
  fis_data_nascimento: Date
}

export class FisicaService {

  // Função para obter a lista de pessoas físicas
  static async getFisicas(): Promise<FisicaOut[]> {
    const response = await api.get('/fisicas');
    return response.data;
  }

  // Função para obter os detalhes de uma pessoa física específica pelo ID
  static async getFisicaById(id: number): Promise<FisicaOut|null> {
    if(id <= 0) {
      return null;
    }
    const response = await api.get(`/fisicas/${id}`);
    return response.data;
  }

  // Função para criar uma nova pessoa física
  static async createFisica(fisica: FisicaIn): Promise<FisicaOut> {
    const response = await api.post('/fisicas', fisica);
    return response.data;
  }

  // Função para atualizar uma pessoa física existente
  static async updateFisica(id: number, fisica: FisicaIn): Promise<FisicaOut|null> {
    if(id <= 0) {
      return null;
    }
    const response = await api.put(`/fisicas/${id}`, fisica);
    return response.data;
  }

  static async deactivateFisica(id: number): Promise<void> {
    await api.put(`/fisicas/deactivate/${id}`);
  }

  // Função para excluir uma pessoa física pelo ID
  static async deleteFisica(id: number): Promise<void> {
    await api.delete(`/fisicas/${id}`);
  }
}

export default FisicaService;
