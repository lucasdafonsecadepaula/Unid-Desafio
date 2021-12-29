import React, { useContext } from 'react';
import Modal from 'react-modal';
import { ContextModal } from '../../context/ModalProvider';
import { Container } from './styles';

Modal.setAppElement('#root');

export default function CustomModal() {
  const { movieModal, setMovieModal, trailerData } = useContext(ContextModal);
  const { isOpen, data } = movieModal;

  const releaseDayBrFormat = data.release_date
    ? `${data.release_date.slice(8, 10)}/${data.release_date.slice(
        5,
        7,
      )}/${data.release_date.slice(0, 4)}`
    : null;

  return (
    <Modal
      className="modal-content"
      overlayClassName="modal-overlay"
      isOpen={isOpen}
      onRequestClose={() => setMovieModal({ isOpen: false, data: {} })}
    >
      {isOpen && (
        <Container
          bgPhoto={`url(https://image.tmdb.org/t/p/original${data.poster_path})`}
          voteAverage={data.vote_average}
        >
          {trailerData && (
            <iframe
              key={trailerData[0].id}
              src={`https://www.youtube.com/embed/${trailerData[0].key}?autoplay=1&cc_lang_pref=br`}
              title={`${trailerData[0].name}`}
              frameBorder="0"
              allowFullScreen
            />
          )}
          <div className="fix-margin">
            <div className="text-place">
              <div className="header-text">
                <h1>{data.title}</h1>
                <div className="circule-average">
                  <h2>{data.vote_average}</h2>
                </div>
              </div>
              <h3>{data.overview}</h3>
              <p>Data de Lançamento: {releaseDayBrFormat}</p>
            </div>
          </div>
        </Container>
      )}
    </Modal>
  );
}