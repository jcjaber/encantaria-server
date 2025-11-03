// src/models/AbstractCard.js

/**
 * Classe base abstrata para todas as cartas no jogo Encantaria.
 * Define as propriedades mínimas que toda carta deve ter, incluindo a qual coleção pertence.
 */
class AbstractCard {
    /**
     * @param {string} name - Nome da Carta.
     * @param {number} cost - Custo em Axé.
     * @param {string} type - Tipo de carta (Minion, Spell, etc.).
     * @param {string} setId - ID da coleção/expansão a que a carta pertence (Ex: 'VANILLA').
     */
    constructor(name, cost, type, setId) {
        this.name = name;
        this.cost = cost;
        this.type = type; 
        this.rarity = 'Basic'; // Por enquanto, só Basic
        this.setId = setId;    // Propriedade para a coleção (escalabilidade)
    }

    isType(type) {
        return this.type === type;
    }
}

module.exports = AbstractCard;