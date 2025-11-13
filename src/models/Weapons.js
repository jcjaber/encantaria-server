// src/models/Weapon.js

const AbstractCard = require('./AbstractCard');

/**
 * Representa uma Arma (Weapon), herda de AbstractCard e adiciona Durabilidade.
 * Armas são equipadas pelo Herói e usadas para atacar diretamente.
 */
class Weapon extends AbstractCard {
    /**
     * @param {string} name - Nome da Arma.
     * @param {number} cost - Custo em Encante.
     * @param {string} setId - ID da Coleção.
     * @param {number} attack - Valor de Ataque.
     * @param {number} durability - Durabilidade (quantos ataques pode dar).
     */
    constructor(name, cost, setId, attack, durability) {
        // Define o tipo como 'Weapon' e repassa o setId
        super(name, cost, 'Weapon', setId); 
        
        this.baseAttack = attack;
        this.attack = attack;
        this.maxDurability = durability;
        this.currentDurability = durability;
    }
    
    /**
     * Usada quando o Herói ataca com a arma.
     * @returns {boolean} True se a arma quebrou.
     */
    useDurability() {
        this.currentDurability -= 1;
        if (this.currentDurability <= 0) {
            return true; // A arma quebrou
        }
        return false; // A arma ainda pode ser usada
    }
}

module.exports = Weapon;