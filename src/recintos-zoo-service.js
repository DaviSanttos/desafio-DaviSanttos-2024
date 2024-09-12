const animais = {
  MACACO: { nome: 'MACACO', tamanho: 1 },
  LEAO: { nome: 'LEAO', tamanho: 3 },
  LEOPARDO: { nome: 'LEOPARDO', tamanho: 2 },
  CROCODILO: { nome: 'CROCODILO', tamanho: 3 },
  GAZELA: { nome: 'GAZELA', tamanho: 2 },
  HIPOPOTAMO: { nome: 'HIPOPOTAMO', tamanho: 4 },
}

const biomas = {
  savana: 'savana',
  floresta: 'floresta',
  rio: 'rio',
}

const animaisCarnivoros = ['LEAO', 'LEOPARDO', 'CROCODILO']

class RecintosZooService {

  recinto1 = {
    numero: 1,
    bioma: ['savana'],
    tamanhoTotal: 10,
    animaisExistentes: { qtd: 3, tipo: 'MACACO' }
  }

  recinto2 = {
    numero: 2,
    bioma: ['floresta'],
    tamanhoTotal: 5,
    animaisExistentes: { qtd: 0}
  }

  recinto3 = {
    numero: 3,
    bioma: ['savana', 'rio'],
    tamanhoTotal: 7,
    animaisExistentes: {qtd: 1, tipo: 'GAZELA' }
  }

  recinto4 = {
    numero: 4,
    bioma: ['rio'],
    tamanhoTotal: 8,
    animaisExistentes: { qtd: 0}
  }

  recinto5 = {
    numero: 5,
    bioma: ['savana'],
    tamanhoTotal: 9,
    animaisExistentes: { qtd: 1, tipo: 'LEAO' }
  }

  inserirAnimal = {
    MACACO: (match) => this.macaco(match.quantidade, match.recintosComEspaco),
    GAZELA: (match) => this.gazela(match.recintosComEspaco),
    HIPOPOTAMO: (match) => this.hipopotamo(match.recintosComEspaco),
    CROCODILO: (match) => this.crocodilo(match.recintosComEspaco, match.animal),
    LEOPARDO: (match) => this.leopardo(match.recintosComEspaco, match.animal),
    LEAO: (match) => this.leao(match.recintosComEspaco, match.animal),
  }

  recintos = [this.recinto1, this.recinto2, this.recinto3, this.recinto4, this.recinto5]

  execute(animal, quantidade) {
    const recintos = this.verificaBiomaCompativel(animal)
    const recintosComEspaco = this.verificaEspaco(animal, quantidade, recintos)

    if (recintos.length && recintosComEspaco.length) {
      let recintosCompativeis = []

      recintosCompativeis = this.inserirAnimal[animal]({quantidade, recintosComEspaco, animal})
      console.log(recintosCompativeis)

      //FAZER A LOGICA PARA FORMATAR A SAIDA FUNÇOES DE ERRO
    }

  }

  verificaBiomaCompativel(animal) {
    if (animal === animais.MACACO.nome) {
      return this.recintos
        .filter(recinto => recinto.bioma.includes(biomas.savana) || recinto.bioma.includes(biomas.floresta))
    }

    if (animal === animais.CROCODILO.nome) {
      return this.recintos
        .filter(recinto => recinto.bioma.includes(biomas.rio))
    }

    if (animal === animais.GAZELA.nome) {
      return this.recintos
        .filter(recinto => recinto.bioma.includes(biomas.savana))
    }

    if (animal === animais.HIPOPOTAMO.nome) {
      return this.recintos
        .filter(recinto => recinto.bioma.includes(biomas.savana) || recinto.bioma.includes(biomas.rio))
    }

    if (animal === animais.LEAO.nome) {
      return this.recintos
        .filter(recinto => recinto.bioma.includes(biomas.savana))
    }

    if (animal === animais.LEOPARDO.nome) {
      return this.recintos
        .filter(recinto => recinto.bioma.includes(biomas.savana))
    }
  }

  verificaEspaco(animal, quantidade, recintos){
    let recintosValidos = []

    recintos.forEach(recinto => {
      const tipoAnimalExistente = recinto.animaisExistentes.tipo
 
      if (!tipoAnimalExistente){
        const tamanhoParaEntrar = quantidade * animais[animal].tamanho

        if (tamanhoParaEntrar <= recinto.tamanhoTotal) recintosValidos.push(recinto)
      } 

      if (tipoAnimalExistente) {
        const tamanhoParaEntrar = quantidade * animais[animal].tamanho
        const tamanhoNoRecinto = recinto.animaisExistentes.qtd * animais[recinto.animaisExistentes.tipo].tamanho
        
        let tamanhoTotal = tamanhoParaEntrar + tamanhoNoRecinto
        if (upperCase(tipoAnimalExistente) !== animal) tamanhoTotal += 1
        console.log(tamanhoTotal)
        if (tamanhoTotal <= recinto.tamanhoTotal) recintosValidos.push(recinto)
      }
    })

    return recintosValidos
  }

  carnivoro(animal){
    return animaisCarnivoros.includes(upperCase(animal))
  }

  macaco(quantidade, recintosComEspaco){
    if(quantidade === 1){
      return recintosComEspaco.filter(recinto => recinto.animaisExistentes.qtd != 0 && !this.carnivoro(recinto.animaisExistentes.tipo))
    } else {
      return this.recintosNaoCarnivoros(recintosComEspaco)
    }
  }

  gazela(recintosComEspaco){
    return this.recintosNaoCarnivoros(recintosComEspaco)
  }

  hipopotamo(recintosComEspaco){

    const recintosDisponivel = []

    recintosComEspaco.forEach(recinto => {

      if (recinto.bioma.includes(biomas.savana) && recinto.bioma.includes(biomas.rio)){
        recintosDisponivel.push(recinto)
      } else {
        if (recinto.animaisExistentes.qtd === 0) recintosDisponivel.push(recinto)
      }

    })

    return this.recintosNaoCarnivoros(recintosDisponivel)
  }

  leao(recintosComEspaco, animal){
    return this.recintoCarnivoros(recintosComEspaco, animal)
  }

  crocodilo(recintosComEspaco, animal){
    return this.recintoCarnivoros(recintosComEspaco, animal)
  }

  leopardo(recintosComEspaco, animal){
    return this.recintoCarnivoros(recintosComEspaco, animal)
  }

  recintoCarnivoros(recintosComEspaco, animal){
    return recintosComEspaco
      .filter(recinto => recinto.animaisExistentes?.tipo === animal || recinto.animaisExistentes.qtd === 0)
  }

  recintosNaoCarnivoros(recintosComEspaco){
    return recintosComEspaco.filter(recinto => !this.carnivoro(recinto.animaisExistentes.tipo))
  }
}

const upperCase = (string) => string?.toUpperCase()

const test = new RecintosZooService().execute('HIPOPOTAMO', 1)