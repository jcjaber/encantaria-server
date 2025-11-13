// src/classes/Guerreiro/GuerreiroPower.js

const HeroPower = require('../../models/HeroPower.js'); 

/**
 * Implementa o Poder Heroico "Fortificar" (Ganha 2 Armadura) para a classe Guerreiro.
 */
class GuerreiroPower extends HeroPower {
    constructor() {
        super('Fortificar', 2); 
    }

    /**
     * Efeito: Ganha 2 de Armadura.
     */
    execute(self, _target) { 
        if (self.currentEncante < this.cost) {
            return { success: false, message: 'Encante insuficiente para Fortificar.' }; 
        }
        
        self.currentEncante -= this.cost;
        self.armor += 2; 

        return { 
            success: true, 
            message: `Fortificar! ${self.heroName} ganha 2 de Armadura.`,
            update: { armor: self.armor, currentEncante: self.currentEncante } 
        };
    }
}

module.exports = GuerreiroPower;