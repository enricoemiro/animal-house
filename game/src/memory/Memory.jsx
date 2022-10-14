import clone from 'just-clone';
import { Fragment, useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';

import Header from '@app/partials/header/Header';
import { durstenfeldShuffle } from '@app/utils/utils';

import { fetchAnimals } from './MemoryAPI';
import MemoryCard from './MemoryCard';

function Memory() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [win, setWin] = useState(false);

  const startGame = () => {
    (async () => {
      const images = await fetchAnimals(6);
      setCards(durstenfeldShuffle([...clone(images), ...clone(images)]));
    })();

    setTurns(0);
    setWin(false);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const handleChoice = (card) => {
    if (choiceOne === null) {
      setChoiceOne(card);
    } else if (choiceTwo === null) {
      setChoiceTwo(card);
    }
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched === true)) {
      setTimeout(() => setWin(true), 1000);
    }
  }, [cards]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }

            return card;
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <Fragment>
      <Header />

      <Container className="my-5 font-monospace">
        <div className="d-flex flex-column align-items-center mb-4">
          <h1 className="text-center mb-0">memory</h1>

          <Button
            variant="primary rounded-1 fw-bold my-2"
            className="w-auto"
            onClick={startGame}
          >
            New Game
          </Button>

          <div className="d-flex justify-content-center">Turns: {turns}</div>
        </div>

        {!win ? (
          <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-evenly gy-2">
            {cards.map((card, index) => {
              return (
                <MemoryCard
                  key={index}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                  disabled={disabled}
                />
              );
            })}
          </Row>
        ) : (
          <h1 className="text-center">You won!</h1>
        )}
      </Container>
    </Fragment>
  );
}

export default Memory;
