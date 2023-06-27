import { useState } from "react";
import axios from "axios";
import "./DeleteModal.scss";

const DeleteModal = ({ bin, id, itemToDelete, modalState, setModalState }) => {
    const [isDeleted, setIsDeleted] = useState(null);
    const closeHandler = () => {
        setModalState(false);
    };

    const delHandler = () => {
        const deleteRequest = async () => {
            try {
                await axios.delete(`http://localhost:8080/${bin}/${id}`);
                setIsDeleted(`**Successfully deleted ${itemToDelete}**`);

                setTimeout(() => {
                setModalState(false);
                setIsDeleted(null);
                window.location.reload(); 
                }, 1000);
            } catch (error) {
                console.log("ERROR", error);
                setIsDeleted(`** Error in deleting selected ${bin} **`);
            }
    };
    deleteRequest();
  };

  return (
    <>
        {modalState === true ? (
            <div className="overlay">
                <div className="delete-modal">
                    <div className="delete-modal__container">
                        <div className="delete-modal__text">
                            <h2 className="delete-modal__heading">Delete {itemToDelete}?</h2>
                            <p className="delete-modal__paragraph">
                                Please confirm that you'd like to delete <strong>{itemToDelete}</strong> from the
                                list of {bin}. You won't be able to undo this action.
                            </p>
                            <p className="delete-modal__confirmation">{isDeleted}</p>
                        </div>
                    </div>
                    <div className="delete-modal__buttons">
                        <button className="delete-modal__button delete-modal__button--cancel" onClick={closeHandler}>Cancel</button>
                        <button className="delete-modal__button delete-modal__button--delete" onClick={delHandler}>Delete</button>
                    </div>
                </div>
            </div>
        ) : null}
    </>
  );
};

export default DeleteModal;
