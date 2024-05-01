/* eslint-disable */
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Flex,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
// Custom components
import Card from 'components/card/Card';
import AppContext from '../../../../Context';
import Menu from 'components/menu/MainMenu';
import React, { useMemo, useState, useEffect, useContext } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const { state, dispatch } = useContext(AppContext);
  console.log(state);
  const { investments2024 } = state.excel;

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const [sheetData, setSheetData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/fetch-data');
      console.log('response.data', response.data);
      setSheetData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('secondaryGray.500', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  console.log('page', page);
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Development Table
        </Text>
        <Menu />
      </Flex>
      {/* <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                  >
                    {column.render('Header')}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = '';
                  if (cell.column.Header === 'Invested type') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === 'Invested name') {
                    data = (
                      <Flex align="center">
                        {cell.value.map((item, key) => {
                          if (item === 'apple') {
                            return (
                              <AppleLogo
                                key={key}
                                color={iconColor}
                                me="16px"
                                h="18px"
                                w="15px"
                              />
                            );
                          } else if (item === 'android') {
                            return (
                              <AndroidLogo
                                key={key}
                                color={iconColor}
                                me="16px"
                                h="18px"
                                w="16px"
                              />
                            );
                          } else if (item === 'windows') {
                            return (
                              <WindowsLogo
                                key={key}
                                color={iconColor}
                                h="18px"
                                w="19px"
                              />
                            );
                          }
                        })}
                      </Flex>
                    );
                  } else if (cell.column.Header === 'Invested amount') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === 'Invested app') {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}%
                        </Text>
                        <Progress
                          variant="table"
                          colorScheme="brandScheme"
                          h="8px"
                          w="63px"
                          value={cell.value}
                        />
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table> */}
      <TableContainer>
        <Table variant="simple" color="gray.500" mb="24px">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>{investments2024[0][0]}</Th>
              <Th>{investments2024[0][1]}</Th>
              <Th>{investments2024[0][2]}</Th>
              <Th>{investments2024[0][3]}</Th>
            </Tr>
          </Thead>
          {investments2024.slice(1).map((array, index) => (
            <Tr key={index}>
              <Td>{array[0]}</Td>
              <Td>{array[1]}</Td>
              <Td>{array[2]}</Td>
              <Td>{array[3]}</Td>
            </Tr>
          ))}
          {/* <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody> */}
        </Table>
      </TableContainer>
    </Card>
  );
}
