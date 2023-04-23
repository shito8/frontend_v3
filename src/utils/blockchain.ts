export const BLOCKCHAIN = [
    {
        name: 'ERGO',
        symbol: '&#931;',
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
        symbol: 'A',
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
    {
        name: 'ETHEREUM',
        symbol: 'E',
        wallets: [{
            name: 'Metamask',
            img: '/img/wallets/metamask.png',
        }/* ,
        {
            name: 'Metamask',
            img: '/img/wallets/metamask.png',
        } */]
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
    
}