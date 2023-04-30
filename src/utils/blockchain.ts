export const BLOCKCHAIN = [
    {
        name: 'ERGO',
        svg: '/img/crypto/ergo-logo.svg#Layer_1',
        ticker: 'ERG',
        symbol: '&#931;',
        tokenWrap: 'eBTC',
        wallets: [{
            name: 'Nautilus',
            img: '/img/wallets/nautilus.png',
        }/* ,
        {
            name: 'Eternl',
            img: '/img/wallets/eternl.png',
        } */]
    },
    {
        name: 'CARDANO',
        svg: '/img/crypto/cardano-logo.svg#Layer_1',
        ticker: 'ADA',
        symbol: 'A',
        tokenWrap: 'cBTC',
        wallets: [{
            name: 'Eternl',
            img: '/img/wallets/eternl.png',
        }/* ,
        {
            name: 'Eternl',
            img: '/img/wallets/eternl.png',
        } */,
    ]
    },
]

export const APPCONFIG = {
    ergo: {
        name: 'ERGO',
        status: {connect: false, wallet: ''},
        active:  true,
        }, 
    cardano: {
        name: 'CARDANO',
        status: {connect: false, wallet: ''},
        active:  false,
    }    
}



/* export const BLOCKCHAIN = [
    {
        name: 'ERGO',
        svg: '/img/crypto/ergo-logo.svg#Layer_1',
        ticker: 'ERG',
        symbol: '&#931;',
        tokenWrap: 'eBTC',
        wallets: [{
            name: 'Nautilus',
            img: '/img/wallets/nautilus.png',
        }]
    },
    {
        name: 'CARDANO',
        svg: '/img/crypto/cardano-logo.svg#Layer_1',
        ticker: 'ADA',
        symbol: 'A',
        tokenWrap: 'cBTC',
        wallets: [{
            name: 'Eternl',
            img: '/img/wallets/eternl.png',
        },
    ]
    },
    {
        name: 'ETHEREUM',
        svg: '/img/crypto/ethereum-logo.svg#Layer_1',
        ticker: 'ETH',
        symbol: 'ETH',
        tokenWrap: 'eWBTC',
        wallets: [{
            name: 'Metamask',
            img: '/img/wallets/metamask.png',
        }]
    },
]

export const APPCONFIG = {
    ergo: {
        name: 'ERGO',
        status: {connect: false, wallet: ''},
        active:  true,
        }, 
    cardano: {
        name: 'CARDANO',
        status: {connect: false, wallet: ''},
        active:  false,
    },
    ethereum: {
        name: 'ETHEREUM',
        status: {connect: false, wallet: ''},
        active:  false,
    }
    
} */