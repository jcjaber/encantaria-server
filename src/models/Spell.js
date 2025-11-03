// src/models/Spell.js

const AbstractCard = require('./AbstractCard');

/**
 * Representa uma Ação/Feitiço (Spell).
 */
class Spell extends AbstractCard {
    /**
     * @param {string} name - Nome da Ação.
     * @param {number} cost - Custo em Axé.
     * @param {string} setId - ID da Coleção.
     * @param {function} effect - A função que será executada.
     */
    constructor(name, cost, setId, effect) {
        // Chama o construtor da classe base, passando o setId
        super(name, cost, 'Spell', setId); 
        this.effect = effect; 
    }
}

module.exports = Spell;