import { EstadoService } from "@/services/estado";
import { ChangeEvent, useEffect, useState } from "react";

interface SelectEstadoProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

type tipoEstado = {
    est_id: number,
    est_nome: string,
    est_uf: string
}


const SelectEstado = ({ onChange, value }: SelectEstadoProps) => {
    const [estados, setEstados] = useState<tipoEstado[]>([]);
    useEffect(() => {
        fetchEstados();
    }, []);

    const fetchEstados = async () => {
        const dados = await EstadoService.getEstados();
        setEstados(dados);
    };

    return (
        <div>        
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Estado: *</span>
                </label>
                <select 
                    className="select select-bordered" 
                    id="estado"
                    onChange={onChange}
                    value={value}
                    >
                    <option value="" disabled>Selecione um estado</option>
                    {estados.map(estado => {
                        return <option key={estado.est_id} value={estado.est_id}>{estado.est_uf}</option>
                    })}
                </select>
            </div>
        </div>

    );
};

export default SelectEstado;

// https://servicodados.ibge.gov.br/api/v1/localidades/estados