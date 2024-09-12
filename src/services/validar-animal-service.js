import { upperCase } from "../utils";
import { animaisCarnivoros } from "../repositories/recinto-dados";

class ValidarAnimal {

    validar(animal, quantidade, recintosComEspaco) {
        const inserirAnimal = {
            MACACO: (match) => this.macaco(match.quantidade, match.recintosComEspaco),
            GAZELA: (match) => this.gazela(match.recintosComEspaco),
            HIPOPOTAMO: (match) => this.hipopotamo(match.recintosComEspaco),
            CROCODILO: (match) => this.crocodilo(match.recintosComEspaco, match.animal),
            LEOPARDO: (match) => this.leopardo(match.recintosComEspaco, match.animal),
            LEAO: (match) => this.leao(match.recintosComEspaco, match.animal),
        };

        return inserirAnimal[animal]({ quantidade, recintosComEspaco, animal });
    }

    macaco(quantidade, recintosComEspaco) {
        if (quantidade === 1) {
            return recintosComEspaco.filter(recinto => recinto.animaisExistentes.qtd != 0 && !this.carnivoro(recinto.animaisExistentes.tipo));
        } else {
            return this.recintosNaoCarnivoros(recintosComEspaco);
        }
    }

    gazela(recintosComEspaco) {
        return this.recintosNaoCarnivoros(recintosComEspaco);
    }

    hipopotamo(recintosComEspaco) {
        const recintosDisponivel = [];

        recintosComEspaco.forEach(recinto => {
            if (recinto.bioma.includes(biomas.savana) && recinto.bioma.includes(biomas.rio)) {
                recintosDisponivel.push(recinto);
            } else {
                if (recinto.animaisExistentes.qtd === 0) recintosDisponivel.push(recinto);
            }
        });

        return this.recintosNaoCarnivoros(recintosDisponivel);
    }

    leao(recintosComEspaco, animal) {
        return this.recintoCarnivoros(recintosComEspaco, animal);
    }

    crocodilo(recintosComEspaco, animal) {
        return this.recintoCarnivoros(recintosComEspaco, animal);
    }

    leopardo(recintosComEspaco, animal) {
        return this.recintoCarnivoros(recintosComEspaco, animal);
    }

    carnivoro(animal) {
        return animaisCarnivoros.includes(upperCase(animal));
    }

    recintoCarnivoros(recintosComEspaco, animal) {
        return recintosComEspaco
            .filter(recinto => recinto.animaisExistentes?.tipo === animal || recinto.animaisExistentes.qtd === 0);
    }

    recintosNaoCarnivoros(recintosComEspaco) {
        return recintosComEspaco.filter(recinto => !this.carnivoro(recinto.animaisExistentes.tipo));
    }
}

export default new ValidarAnimal();
