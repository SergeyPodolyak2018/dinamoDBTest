import React, { useEffect, useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

export default function useColumns(name) {
  const GET_CARDS_BY_STATUS = gql`
  query CardsByStatus {
    cardsByStatus(status: "${name}") {
      id
      body
      status
    }
  }
`;

  const [getCards, { loading, data }] = useLazyQuery(GET_CARDS_BY_STATUS);

  useEffect(() => {
    if (!data) {
      getCards();
    }
  }, [name]);

  return [getCards, loading, data];
}
