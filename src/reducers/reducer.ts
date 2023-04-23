import { Action, State, Blockchain } from "@/types/types";

export const initialState: State = {
    darkMode: false,
    blockchain: Blockchain.ERG,
    walletConnected: false,
    walletAddressErg: '',
    walletBalanceErg: '',
    walletName: '',
    usdBtc: '',
};

export const reducer = (state: State, action: Action): State =>{
    switch (action.type){
        case 'themeMode':
            return {...state, darkMode: action.payload};
        case 'selectBlockchain':
            return {...state, blockchain: action.payload};
        case 'walletConnected':
            return {...state, walletConnected: action.payload};
        case 'walletAddressErg':
            return {...state, walletAddressErg: action.payload};  
        case 'walletBalanceErg':
            return {...state, walletBalanceErg: action.payload}; 
        case 'walletName':
            return {...state, walletName: action.payload};           
        case 'setUsdBtc':
            return {...state, usdBtc: action.payload};            
        default:
            return state;
    }
};