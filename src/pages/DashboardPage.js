/* eslint-disable camelcase */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { sentenceCase } from 'change-case';
import { getContinentList, getStateList, getCountryList ,getCityList } from '../api';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { ListHead, ListToolbar } from '../sections/@dashboard/app';
import Dropdown from '../components/dropdown';
// mock
// import CONTINENT_LIST from '../_mock/continents';
import CreateModal from '../components/create-modal';
import InfoModal from '../components/info-modal';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b, orderBy) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(
      array,
      (_data) =>
        _data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _data.id.toString().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DashboardPage() {
  // const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [tableData, setTableData] = useState([]);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // multi select
  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const filteredData = applySortFilter(tableData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredData.length && !!filterName;
  const SELECT_OPTIONS = [
    { id: 0, name: 'continent' },
    { id: 1, name: 'country' },
    { id: 2, name: 'state' },
    { id: 3, name: 'city' },
  ];
  const [selectedOption, setSelectedOption] = useState('continent');

  const TABLE_HEAD = [
    { id: 'name', label: sentenceCase(selectedOption), alignRight: false },
    { id: 'id', label: `${sentenceCase(selectedOption)} Code`, alignRight: false },
    { id: 'active', label: 'Active', alignRight: false },
  ];

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(0);
  useEffect(() => {
    if (selectedOption === 'continent') {
      (async () => {
        const continents = await getContinentList();
        setTableData(continents.continent);
      })();
    }

    if (selectedOption === 'country') {
      (async () => {
        const countries = await getCountryList();
        setTableData(countries.country);
      })();
    }

    if (selectedOption === 'state') {
      (async () => {
        const states = await getStateList();
        setTableData(states.state);
      })();
    }
    if (selectedOption === 'city') {
      (async () => {
        const cities = await getCityList();
        setTableData(cities.city);
      })();
    }
  }, [selectedOption, requestStatus]);

  const [selectedData, setSelectedData] = useState([]);

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      {isCreateModalOpen && (
        <CreateModal
          type={selectedOption}
          count={tableData.length}
          open={isCreateModalOpen}
          setOpen={setIsCreateModalOpen}
          title={`Create ${sentenceCase(selectedOption)}`}
          placeholder={sentenceCase(selectedOption)}
          setReqStatus={(value) => setRequestStatus(value)}
        />
      )}

      {isInfoModalOpen && (
        <InfoModal
          type={selectedOption}
          count={tableData.length}
          selectedData={selectedData}
          open={isInfoModalOpen}
          setOpen={setIsInfoModalOpen}
          title={'Details'}
          placeholder={sentenceCase(selectedOption)}
          setReqStatus={(value) => setRequestStatus(value)}
        />
      )}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Dropdown
            options={SELECT_OPTIONS}
            onSort={(event) => setSelectedOption(event.target.value)}
            option={selectedOption}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#58B85D',
              color: 'white',
              '&:hover': {
                backgroundColor: '#6BDB8A',
              },
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            New {sentenceCase(selectedOption)}
          </Button>
        </Stack>

        <Card>
          <ListToolbar
            placeholder={`Search ${selectedOption}...`}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // eslint-disable-next-line camelcase
                    const { id, name, status } = row;
                    const selectedData = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        selected={selectedData}
                        onClick={() => {
                          setSelectedData(row);
                          setIsInfoModalOpen(true);
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name} {id}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left" sx={{ color: status ? 'green' : 'grey' }}>
                          {status.toString()}
                        </TableCell>
                        {/* <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      {/* <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setIsEditModalOpen(true);
            handleCloseMenu(false);
          }}
        >
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        
        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}
