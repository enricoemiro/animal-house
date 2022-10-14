import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Image } from 'react-bootstrap';

import styles from './MemoryCard.module.css';

function MemoryCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <Fragment>
      <div
        className={`${styles['card-container']} ${
          flipped ? styles['card-container--flipped'] : ''
        }`}
      >
        <Image
          thumbnail="true"
          className={`${styles.card} ${styles['card-front']}`}
          src={card.src}
          alt="card front"
        />

        <Image
          thumbnail="true"
          className={`${styles.card} ${styles['card-back']}`}
          src="images/memory/cover.jpg"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </Fragment>
  );
}

MemoryCard.propTypes = {
  card: PropTypes.object,
  handleChoice: PropTypes.func,
  flipped: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MemoryCard;
