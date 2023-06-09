
export interface State {
    darkMode: boolean;
    mobileMode: boolean;
    blockchain: Blockchain;
    walletConnected: boolean;
    walletAddressErg: string;
    walletBalanceErg: string;
    walletName: string;
    usdBtc: string;
    usdAda: string;
    usdErg: string;

};

export type Action = 
    | {type: 'themeMode'; payload: boolean}
    | {type: 'mobileMode'; payload: boolean}
    | {type: 'selectBlockchain'; payload: Blockchain}
    | {type: 'walletConnected'; payload: boolean}
    | {type: 'walletAddressErg'; payload: string}
    | {type: 'walletBalanceErg'; payload: string}   
    | {type: 'walletName'; payload: string}         
    | {type: 'setUsdBtc'; payload: string}
    | {type: 'setUsdAda'; payload: string}
    | {type: 'setUsdErg'; payload: string};

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

export interface DepositProps {
    valueInput: string;
    setOpenDepositMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenConfirmDeposit: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ConfirmProps {
    valueInput: string;
    setValueInput: React.Dispatch<React.SetStateAction<string>>;
    setOpenDepositMenu: React.Dispatch<React.SetStateAction<boolean>>;
    tokenReceive: string;
    tokenWrap: string;
    setOpenConfirmDeposit: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BridgeWrapProps {
    priceUsdBTC: string;
}


export enum Blockchain {
    ERG = 'ERGO',
    ADA = 'CARDANO',
    ETH = 'ETHEREUM',
}




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