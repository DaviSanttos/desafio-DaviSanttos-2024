import RecintosZooService from './services/recintos-zoo-service.js';

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const recintoZoo = new RecintosZooService();
        return recintoZoo.execute(animal, quantidade);
    }

}

export { RecintosZoo as RecintosZoo };
