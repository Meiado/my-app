interface SelectCidadeProps {
    cidades: { cid_id: number; cid_nome: string; est_id: number; }[];
    onChangeCidade: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    cidadeId: string;
}

const SelectCidade = ({ cidades, onChangeCidade, cidadeId }: SelectCidadeProps) => {

    return (
        <div>        
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Cidade: *</span>
                </label>
                <select onChange={onChangeCidade} value={cidadeId} className="select select-bordered" id="estado">
                    {!(cidades.length > 0) && (
                        <option value="" selected>Selecione um estado antes</option>
                    )}
                    {cidades.map(cidade => {
                        return (
                            <option key={cidade.cid_nome} value={cidade.cid_id}>
                                {cidade.cid_nome}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>

    );
};

export default SelectCidade;