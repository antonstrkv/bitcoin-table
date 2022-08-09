/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadJson_action, setOrder, setOrderBy, setPage, setRowsPerPage } from '../../RTK/reducers';
import { stableSort, getComparator } from "../../utilities";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import { ru } from 'date-fns/esm/locale';
import { EnhancedTableHead } from "./Table-Head"


function EnhancedTable() {
	const dispatch = useDispatch();
	const bitcoinHistoryArray = useSelector(state => state.bitcoin.bitcoinHistoryArray);
	const interval = useSelector(state => state.bitcoin.interval);
	const order = useSelector(state => state.bitcoin.order);
	const orderBy = useSelector(state => state.bitcoin.orderBy);
	const page = useSelector(state => state.bitcoin.page);
	const rowsPerPage = useSelector(state => state.bitcoin.rowsPerPage);


	useEffect(() => {
		if (bitcoinHistoryArray.length) setTimeout(() => { dispatch(loadJson_action()); }, interval * 1000);
	}, [bitcoinHistoryArray]);


	useEffect(() => {
		if (!bitcoinHistoryArray.length) dispatch(loadJson_action());
	}, []);


	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		dispatch(setOrder(isAsc ? 'desc' : 'asc'))
		dispatch(setOrderBy(property))
	};


	const handleChangePage = (event, newPage) => {
		dispatch(setPage(newPage))
	};

	const handleChangeRowsPerPage = (event) => {
		dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
		dispatch(setPage(0));
	};


	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bitcoinHistoryArray.length) : 0;

	return (
		<Paper sx={{ border: "1px solid #000", boxShadow: "none" }}>
			<TableContainer>
				<Table
					sx={{ minWidth: 400 }}
					aria-labelledby="tableTitle"
					size={'medium'}
				>
					<EnhancedTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>

						{stableSort(bitcoinHistoryArray, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {

								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow key={labelId}>
										<TableCell component="th" id={labelId} scope="row"	>
											{format(new Date(row.date), 'dd MMMM uuuu, HH:mm:ss', { locale: ru })}
										</TableCell>
										<TableCell align="right">{row.price}</TableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: 53 * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={bitcoinHistoryArray.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>

	);
}

export { EnhancedTable };