export interface State {
    darkMode: boolean;
    blockchain: Blockchain;
    usdBtc: string;

};

export enum Blockchain {
    ERG = 'ERGO',
    ADA = 'CARDANO',
    ETH = 'ETHEREUM',
}

export type Action = 
    | {type: 'themeMode'; payload: boolean}
    | {type: 'selectBlockchain'; payload: Blockchain}
    | {type: 'setUsdBtc'; payload: string};