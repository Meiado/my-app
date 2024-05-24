import api from "../api";

export interface CidadeOut {
    cid_id: number;
    cid_nome: string;
    est_id: number;
}

export class CidadeService {
    static async getCidadesByEstado(id: string): Promise<CidadeOut[]> {
        const response = await api.get('/cidades/estado/'+id);
        return response.data;
      }
    static async getCidadeById(id: string): Promise<CidadeOut> {
        const response = await api.get('/cidades/'+id);
        return response.data;
    }
};