import { Action, State, Blockchain } from "@/types/types";

export const initialState: State = {
    darkMode: false,
    blockchain: Blockchain.ERG,
    usdBtc: '',
};

export const reducer = (state: State, action: Action): State =>{
    switch (action.type){
        case 'themeMode':
            return {...state, darkMode: action.payload};
        case 'selectBlockchain':
            return {...state, blockchain: action.payload};
        case 'setUsdBtc':
            return {...state, usdBtc: action.payload};            
        default:
            return state;
    }
};