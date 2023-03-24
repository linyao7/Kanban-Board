import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCards } from '../store/selectors';

const useCard = (cardId: number) => {
  const cards = useSelector(selectCards);
  const card = useMemo(() => {
    if (cards) {
      return cards.filter((card) => card.cardId === cardId)[0];
    }
  }, [cards, cardId]);

  return card;
};

export default useCard;
