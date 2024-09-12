import { RecintosZooDados, biomas, animais } from "../repositories/recinto-dados";
import validarAnimalService from "./validar-animal-service";
import { upperCase, setErrors } from "../utils";

export default class RecintosZooService {

  recintos = RecintosZooDados;

  execute(animal, quantidade) {

    if (quantidade <= 0) return setErrors('Quantidade inválida');

    const animaisArray = Object.values(animais).map(animal => animal.nome);

    if (!animaisArray.includes(animal)) return setErrors('Animal inválido');

    const recintosBiomaCompativel = this.verificaBiomaCompativel(animal);
    const recintosComEspaco = this.verificaEspaco(animal, quantidade, recintosBiomaCompativel);

    if (!recintosComEspaco.length) return setErrors('Não há recinto viável');

    if (recintosBiomaCompativel.length && recintosComEspaco.length) {
      let recintosCompativeis = validarAnimalService.validar(animal, quantidade, recintosComEspaco);

      if (recintosCompativeis.length) return this.formataSaida(recintosCompativeis);
      else return setErrors('Não há recinto viável');

    }

  }

  verificaBiomaCompativel(animal) {
    switch (animal) {
      case animais.MACACO.nome:
        return this.recintos.filter(recinto => recinto.bioma.includes(biomas.savana) || recinto.bioma.includes(biomas.floresta));
      case animais.CROCODILO.nome:
        return this.recintos.filter(recinto => recinto.bioma.includes(biomas.rio));
      case animais.GAZELA.nome:
        return this.recintos.filter(recinto => recinto.bioma.includes(biomas.savana));
      case animais.HIPOPOTAMO.nome:
        return this.recintos.filter(recinto => recinto.bioma.includes(biomas.savana) || recinto.bioma.includes(biomas.rio));
      case animais.LEAO.nome:
        return this.recintos.filter(recinto => recinto.bioma.includes(biomas.savana));
      case animais.LEOPARDO.nome:
        return this.recintos.filter(recinto => recinto.bioma.includes(biomas.savana));
      default:
        return [];
    }
  }

  verificaEspaco(animal, quantidade, recintos) {
    let recintosValidos = [];

    recintos.forEach(recinto => {
      const tipoAnimalExistente = recinto.animaisExistentes.tipo;

      if (!tipoAnimalExistente) {
        const tamanhoParaEntrar = quantidade * animais[animal].tamanho;

        if (tamanhoParaEntrar <= recinto.tamanhoTotal) {
          recinto.espacoOcupado = tamanhoParaEntrar;
          recintosValidos.push(recinto);
        }
      }

      if (tipoAnimalExistente) {
        const tamanhoParaEntrar = quantidade * animais[animal].tamanho;
        const tamanhoNoRecinto = recinto.animaisExistentes.qtd * animais[recinto.animaisExistentes.tipo].tamanho;

        let tamanhoTotal = tamanhoParaEntrar + tamanhoNoRecinto;
        if (upperCase(tipoAnimalExistente) !== animal) tamanhoTotal += 1;

        if (tamanhoTotal <= recinto.tamanhoTotal) {
          recinto.espacoOcupado = tamanhoTotal;
          recintosValidos.push(recinto);
        }
      }
    });

    return recintosValidos;
  }

  formataSaida(recintosCompativeis) {

    let recintosViaveis = recintosCompativeis.map(recinto => {
      return `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - recinto.espacoOcupado} total: ${recinto.tamanhoTotal})`;
    });

    return { recintosViaveis };

  }
}
