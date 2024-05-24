import api from "../api";

export interface EstadoOut {
    est_id: number;
    est_nome: string;
    est_uf: string;
}

export class EstadoService {
    static async getEstados(): Promise<EstadoOut[]> {
        const response = await api.get('/estados');
        return response.data;
      }
    static async getEstadoById(id: number): Promise<EstadoOut> {
        const response = await api.get('/estados/'+id);
        return response.data;
    }
};