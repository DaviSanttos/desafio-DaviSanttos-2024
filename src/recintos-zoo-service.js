const animais = {
  macaco: { nome: 'MACACO', tamanho: 1 }
}

const biomas = {
  savana: 'savana',
  floresta: 'floresta'
}

const animaisCarnivoros = ['LEAO', 'LEOPARDO', 'CROCODILO']


class RecintosZooService {

  recinto1 = {
    numero: 1,
    bioma: 'savana',
    tamanhoTotal: 10,
    animaisExistentes: { qtd: 3, tipo: 'macaco' }
  }

  recinto2 = {
    numero: 2,
    bioma: 'floresta',
    tamanhoTotal: 5,
    animaisExistentes: { qtd: 0}
  }

  recinto3 = {
    numero: 3,
    bioma: 'savana e rio',
    tamanhoTotal: 7,
    animaisExistentes: {qtd: 1, tipo: 'gazela' }
  }

  recinto4 = {
    numero: 4,
    bioma: 'rio',
    tamanhoTotal: 8,
    animaisExistentes: { qtd: 0}
  }

  recinto5 = {
    numero: 5,
    bioma: 'savana',
    tamanhoTotal: 9,
    animaisExistentes: { qtd: 1, tipo: 'leao' }
  }

  inserirAnimal = {
    MACACO: (match) => this.macaco(match.quantidade, match.recintosComEspaco),
    GAZELA: (match) => this.gazela(match.recintosComEspaco),
    HIPOPOTAMO: (match) => this.hipopotamo(match.recintosComEspaco),
    CROCODILO: (match) => this.crocodilo(match.recintosComEspaco),
    LEOPARDO: (match) => this.leopardo(match.recintosComEspaco),
    LEAO: (match) => this.leao(match.recintosComEspaco),
  }

  recintos = [this.recinto1, this.recinto2, this.recinto3, this.recinto4, this.recinto5]

  execute(animal, quantidade) {
    const recintos = this.verificaBiomaCompativel(animal)
    const recintosComEspaco = this.verificaEspaco(animal, quantidade, recintos)
   
    console.log(recintosComEspaco)
    if (recintos.length && recintosComEspaco.length) {
      let recintosCompativeis = []

      recintosCompativeis = this.inserirAnimal[animal]({quantidade, recintosComEspaco})
      console.log(recintosCompativeis)
    }

  }

  verificaBiomaCompativel(animal) {
    if (animal === animais.macaco.nome) {
      return this.recintos
        .filter(recinto => recinto.bioma === biomas.savana || recinto.bioma === biomas.floresta)
    }

    // if (animal === animais.macaco.nome) {
    //   return this.recintos
    //     .filter(recinto => recinto.bioma === biomas.savana || recinto.bioma === biomas.floresta)
    // }
  }

  verificaEspaco(animal, quantidade, recintos){
    let recintosValidos = []

    recintos.forEach(recinto => {
      const tipoAnimalExistente = recinto.animaisExistentes.tipo
 
      if (!tipoAnimalExistente){
        if (recinto.animaisExistentes.qtd + quantidade <= recinto.tamanhoTotal) recintosValidos.push(recinto)
      } 

      if (tipoAnimalExistente) {
        if (upperCase(tipoAnimalExistente) !== animal) quantidade += 1

        if (recinto.animaisExistentes.qtd + quantidade <= recinto.tamanhoTotal) recintosValidos.push(recinto)
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
    return this.recintosNaoCarnivoros(recintosComEspaco)
  }

  recintosNaoCarnivoros(recintosComEspaco){
    return recintosComEspaco.filter(recinto => !this.carnivoro(recinto.animaisExistentes.tipo))
  }
}

const upperCase = (string) => string?.toUpperCase()

const test = new RecintosZooService().execute('MACACO', 1)