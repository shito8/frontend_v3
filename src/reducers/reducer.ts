import { Action, State, Blockchain } from "@/types/types";

export const initialState: State = {
    darkMode: false,
    mobileMode: false,
    blockchain: Blockchain.ERG,
    walletConnected: false,
    walletAddressErg: '',
    walletBalanceErg: '',
    walletName: '',
    usdBtc: '0.00',
    usdAda: '0.00',
    usdErg: '0.00',
};

export const reducer = (state: State, action: Action): State =>{
    switch (action.type){
        case 'themeMode':
            return {...state, darkMode: action.payload};
        case 'mobileMode':
            return {...state, mobileMode: action.payload};
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
        case 'setUsdAda':
            return {...state, usdAda: action.payload};
        case 'setUsdErg':
            return {...state, usdErg: action.payload};             
        default:
            return state;
    }
};