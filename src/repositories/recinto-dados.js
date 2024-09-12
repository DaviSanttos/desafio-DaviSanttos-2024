export const RecintosZooDados = [
    {
        numero: 1,
        bioma: ['savana'],
        tamanhoTotal: 10,
        animaisExistentes: { qtd: 3, tipo: 'MACACO' }
    },
    {
        numero: 2,
        bioma: ['floresta'],
        tamanhoTotal: 5,
        animaisExistentes: { qtd: 0 }
    },
    {
        numero: 3,
        bioma: ['savana', 'rio'],
        tamanhoTotal: 7,
        animaisExistentes: { qtd: 1, tipo: 'GAZELA' }
    },
    {
        numero: 4,
        bioma: ['rio'],
        tamanhoTotal: 8,
        animaisExistentes: { qtd: 0 }
    },
    {
        numero: 5,
        bioma: ['savana'],
        tamanhoTotal: 9,
        animaisExistentes: { qtd: 1, tipo: 'LEAO' }
    }
];

export const animaisCarnivoros = ['LEAO', 'LEOPARDO', 'CROCODILO'];

export const biomas = {
    savana: 'savana',
    floresta: 'floresta',
    rio: 'rio',
};

export const animais = {
    MACACO: { nome: 'MACACO', tamanho: 1 },
    LEAO: { nome: 'LEAO', tamanho: 3 },
    LEOPARDO: { nome: 'LEOPARDO', tamanho: 2 },
    CROCODILO: { nome: 'CROCODILO', tamanho: 3 },
    GAZELA: { nome: 'GAZELA', tamanho: 2 },
    HIPOPOTAMO: { nome: 'HIPOPOTAMO', tamanho: 4 },
};
