import React from "react";

interface AvisoModalProps {
    popAviso:  boolean;
    setpopAviso: (open: boolean) => boolean | void;
    mensagem: string;
    setMensagem: (mes: string) => string | void;
}



const AvisoModal: React.FC<AvisoModalProps> = ({ popAviso, setpopAviso, mensagem, setMensagem }) => {
    const handleVoltarClick = () => {
        setpopAviso(false);
        setMensagem("");
        return false; // Isso evita que o formulário seja submetido
      }

    return (
        <dialog id="my_modal_1" className={`modal ${popAviso ? "modal-open" : ""}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Confira os dados!</h3>
                <p className="py-4">{mensagem}</p>
                <div className="modal-action">
                    <button className="btn" onClick={handleVoltarClick}>Voltar</button>
                </div>
            </div>
        </dialog>
    );
};

export default AvisoModal;
