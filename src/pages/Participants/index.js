import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Table } from 'antd';

import { Container } from './styles';

// import { participants } from '../../data/participants';

function Participants() {
  const [participantsSerialized, setParticipantsSerialized] = useState();
  useEffect(() => {
    axios.get('https://data.directory.openbankingbrasil.org.br/participants').then(res => {
      const serialized = res.data.map(item => {
        return {
          name: item.OrganisationName,
          developerPortal: item.AuthorisationServers[0].DeveloperPortalUri
        }
      })
      setParticipantsSerialized(serialized);
    })
  }, [])

  // const participantsSerialized = participants.map(item=> {
  //   return {
  //     name: item.OrganisationName,
  //     developerPortal: item.AuthorisationServers[0].DeveloperPortalUri
  //   }
  // })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Developer portal',
      dataIndex: 'developerPortal',
      key: 'developerPortal',
      render: text => <a href={text} rel="noreferrer" target="_blank">Developer portal</a>,
    },
  ];
  
  return (
    <Container>
      <h1>Participants</h1>
      <Table columns={columns} dataSource={participantsSerialized}/>
    </Container>
  );
}

export default Participants;