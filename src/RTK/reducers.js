import { createData } from '../utilities';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const SERVER_URL = "https://coin-realy.mobilauto.com.ua/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=aeb01691-00c7-49ee-9b67-79e398712069&convert=USD&id=1";


export const loadJson_action = createAsyncThunk(
	"bitcoin/loadJson_action",
	async () => {
		return fetch(SERVER_URL)
			.then(response => {
				if (response.ok) {
					return response.json()
				}
			})
	}
)


const initialState = {
	bitcoinHistoryArray: [],
	interval: 30,
	order: 'desc',
	orderBy: 'date',
	page: 0,
	rowsPerPage: 10
}


export const BitcoinAppSlice = createSlice({
	name: "bitcoin",
	initialState,
	reducers: {
		setInterval: (state, action) => {
			state.interval = action.payload;
		},
		setOrder: (state, action) => {
			state.order = action.payload;
		},
		setOrderBy: (state, action) => {
			state.orderBy = action.payload;
		},
		setPage: (state, action) => {
			state.page = action.payload;
		},
		setRowsPerPage: (state, action) => {
			state.rowsPerPage = action.payload;
		},
	},
	extraReducers: {
		[loadJson_action.fulfilled]: (state, action) => {
			state.bitcoinHistoryArray.push(createData(action.payload.status.timestamp, action.payload.data["1"].quote.USD.price));
		}
	}
});


export const { addHistoryObject, setInterval, setOrder, setOrderBy, setPage, setRowsPerPage } = BitcoinAppSlice.actions
export default BitcoinAppSlice.reducer;


