// src/models/Minion.js

const AbstractCard = require('./AbstractCard');

/**
 * Representa um Lacaio (Minion), herda de AbstractCard e adiciona atributos de combate.
 */
class Minion extends AbstractCard {
    /**
     * @param {string} name - Nome do Lacaio.
     * @param {number} cost - Custo em Axé.
     * @param {number} attack - Valor de Ataque.
     * @param {number} health - Valor de Vida máxima.
     * @param {string} setId - ID da Coleção.
     * @param {Object} keywords - Palavras-chave.
     */
    constructor(name, cost, attack, health, setId, keywords = {}) {
        // Chama o construtor da classe base, passando o setId
        super(name, cost, 'Minion', setId); 

        // --- Atributos de Combate ---
        this.baseAttack = attack;
        this.attack = attack;
        this.maxHealth = health;
        this.currentHealth = health;

        // --- Estado de Jogo ---
        this.isSleep = true; 
        this.canAttack = false; 
        this.isDead = false;

        // --- Palavras-Chave (Keywords) ---
        this.hasCharge = keywords.charge || false;
        this.hasWindfury = keywords.windfury || false;
        this.isTaunt = keywords.taunt || false;

        // --- Efeitos Específicos ---
        this.battlecry = keywords.battlecry || null;
        this.deathrattle = keywords.deathrattle || null;
        
        if (this.hasCharge) {
            this.isSleep = false;
        }
    }
    
    takeDamage(damage) {
        this.currentHealth -= damage;

        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            this.isDead = true;
        }
    }
}

module.exports = Minion;