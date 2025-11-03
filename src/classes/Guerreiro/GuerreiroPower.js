// src/classes/Guerreiro/GuerreiroPower.js

// O caminho de importação é relativo ao arquivo Player.js
const HeroPower = require('../../models/HeroPower'); 

/**
 * Implementa o Poder Heroico "Fortificar" (Ganha 2 Armadura) para a classe Guerreiro.
 */
class GuerreiroPower extends HeroPower {
    constructor() {
        super('Fortificar', 2); // Custo fixo de 2 Axé
    }

    /**
     * Efeito: Ganha 2 de Armadura.
     */
    execute(self, _target) { 
        if (self.currentAxe < this.cost) {
            return { success: false, message: "Axé insuficiente para Fortificar." };
        }
        
        self.currentAxe -= this.cost;
        self.armadura += 2;

        return { 
            success: true, 
            message: `Fortificar! ${self.heroName} ganha 2 de Armadura.`,
            update: { armadura: self.armadura, currentAxe: self.currentAxe }
        };
    }
}

module.exports = GuerreiroPower;