
export interface State {
    darkMode: boolean;
    mobileMode: boolean;
    blockchain: Blockchain;
    walletConnected: boolean;
    walletAddressErg: string;
    walletBalanceErg: string;
    walletName: string;
    usdBtc: string;

};

export interface SettingProps {
    openSetting: boolean;
    setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
    display: boolean;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface WrappingProps {
    bridgeWrapActive: boolean;
    setBridgeWrapActive: React.Dispatch<React.SetStateAction<boolean>>;
}



export interface WalletConnectProps {
    openWallet: boolean;
    setOpenWallet: React.Dispatch<React.SetStateAction<boolean>>;
}


export enum Blockchain {
    ERG = 'ERGO',
    ADA = 'CARDANO',
    ETH = 'ETHEREUM',
}

export type Action = 
    | {type: 'themeMode'; payload: boolean}
    | {type: 'mobileMode'; payload: boolean}
    | {type: 'selectBlockchain'; payload: Blockchain}
    | {type: 'walletConnected'; payload: boolean}
    | {type: 'walletAddressErg'; payload: string}
    | {type: 'walletBalanceErg'; payload: string}   
    | {type: 'walletName'; payload: string}         
    | {type: 'setUsdBtc'; payload: string};


export interface AppConfig {
    ergo:{
        name: string;
        status:{
            connect:boolean;
            wallet: string;
        };
        active: boolean;
    };
    cardano:{
        name: string;
        status:{
            connect:boolean;
            wallet: string;
        };
        active: boolean;
    };
    ethereum:{
        name: string;
        status:{
            connect:boolean;
            wallet: string;
        };
        active: boolean;
    };
}