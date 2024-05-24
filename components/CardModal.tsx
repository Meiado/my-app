interface CardModalProps {
    cardOpen: boolean;
    setCardOpen: (open: boolean) => boolean | void;
    children: React.ReactNode;
}

const CardModal: React.FC<CardModalProps> = ({ cardOpen, setCardOpen, children }) => {
    return (
        <dialog id="my_modal_4" className={`modal ${cardOpen ? "modal-open" : ""}`}>
        <div className="modal-box flex justify-center">
            {children}
        </div>
        </dialog>
    );
};

export default CardModal;