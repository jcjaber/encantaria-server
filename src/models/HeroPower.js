// src/models/HeroPower.js

/**
 * Classe base abstrata para todos os Poderes Heróicos.
 * Define a interface (o 'contrato') que todos os poderes devem seguir.
 */
class HeroPower {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }

    /**
     * O método principal que define a lógica do poder. Deve ser implementado em classes filhas.
     */
    execute(self, target) {
        throw new Error("O método 'execute' deve ser implementado pela classe filha.");
    }
}

module.exports = HeroPower;