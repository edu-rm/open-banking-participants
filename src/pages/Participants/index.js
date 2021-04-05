import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Container } from './styles';

// import { participants } from '../../data/participants';



function Participants() {
  const [participantsSerialized, setParticipantsSerialized] = useState();
  const [searchText, setSearchText] = useState();
  const [searchedColumn, setSearchedColumn] = useState();

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

 const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  let searchInput;
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
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