import axios from 'axios';
import React, { useEffect } from 'react';

import { Container } from './styles';

// import { participants } from '../../data/participants';

function Participants() {
  // console.log('participants', participants)
  useEffect(() => {
    axios.get('https://data.directory.openbankingbrasil.org.br/participants').then(res => {
      console.log(res.data);
    })
  }, [])

  return (
    <Container>
      <h1>Participants</h1>
    </Container>
  );
}

export default Participants;