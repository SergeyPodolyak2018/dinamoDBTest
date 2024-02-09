import React, { useEffect, useState } from 'react';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';

const GET_LOCATIONS = gql`
  query Status {
    status {
      id
      name
    }
  }
`;

const UPDATE_CARD = gql`
  mutation UpdateCard($cardId: String!, $cardStatus: String!) {
    updateCard(id: $cardId, status: $cardStatus)
  }
`;

const GET_CARDS_BY_STATUS = gql`
  query CardsByStatus($status: String!) {
    cardsByStatus(status: $status) {
      id
      body
      status
    }
  }
`;
export default function useBoard() {
  const [statuses, setStatuses] = useState([]);
  const [cards, setCards] = useState({});
  const [loading, setLoading] = useState(true);
  const [getLocations] = useLazyQuery(GET_LOCATIONS);
  const [getCards] = useLazyQuery(GET_CARDS_BY_STATUS);
  const [updateCardMut] = useMutation(UPDATE_CARD);

  useEffect(() => {
    if (statuses.length === 0) {
      getLocations()
        .then((resp) => {
          const statuses = resp.data.status;
          setStatuses(resp.data.status);
          const queries = [];
          for (const iterator of statuses) {
            queries.push(getCards({ variables: { status: iterator.name } }));
          }
          return Promise.all(queries);
        })
        .then((resp) => {
          const cards = {};
          for (const iterator of resp) {
            if (iterator.data.cardsByStatus.length > 0) {
              cards[iterator.data.cardsByStatus[0].status] =
                iterator.data.cardsByStatus;
            }
          }
          setCards(cards);
          setLoading(false);
        });
    }
  }, []);

  const updateCard = async (cardId, cardStatusTarget, cardStatusFrom) => {
    const cardsMutated = [...cards[cardStatusFrom]];
    const index = cardsMutated.findIndex((el) => el.id === cardId);
    if (index !== -1) {
      cardsMutated.splice(index, 1);
      const updatedFrom = {
        [cardStatusFrom]: cardsMutated,
      };
      setCards((prev) => ({
        ...prev,
        ...updatedFrom,
      }));
    }

    const resp = await updateCardMut({
      variables: { cardId: cardId, cardStatus: cardStatusTarget },
    });
    const target = await getCards({ variables: { status: cardStatusTarget } });
    const source = await getCards({ variables: { status: cardStatusFrom } });
    const newcard = {
      [cardStatusTarget]: target.data.cardsByStatus,
      [cardStatusFrom]: source.data.cardsByStatus,
    };
    setCards((prev) => ({
      ...prev,
      ...newcard,
    }));
  };

  return [loading, statuses, cards, updateCard];
}
