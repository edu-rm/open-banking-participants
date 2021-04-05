import axios from 'axios';
import React, { useEffect } from 'react';

import { Container } from './styles';

function Participants() {

  useEffect(() => {
    axios.get('http://data.directory.openbankingbrasil.org.br/participants').then(res => {
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