// src/models/Player.js

/**
 * Representa um Jogador genérico no jogo Encantaria.
 * Gerencia o estado básico (HP, Encante) e delega o poder heróico para a classe específica.
 */
class Player {
    /**
     * @param {string} socketId - O ID da conexão Socket.IO do jogador.
     * @param {Object} heroPower - A instância do Poder Heroico específico da classe.
     */
    constructor(socketId, heroPower) { 
        this.socketId = socketId;
        this.heroPower = heroPower; 
        
        // Dados do Herói (Cosmético)
        this.heroName = 'Zumbi dos Palmares'; 

        // --- Estado Básico do Herói ---
        this.hp = 30;         
        this.armor = 0; // Armadura
        this.isAlive = true;  

        // --- Sistema de Recursos (Encante) ---
        this.maxEncante = 1;      
        this.currentEncante = 1; 
        
        // --- Coleções de Cartas ---
        this.deck = [];       
        this.hand = [];       
        this.field = [];      // Lacaios em campo
        this.graveyard = [];  
    }
    
    // --- Métodos de Jogo (Genéricos) ---
    startTurn() {
        if (this.maxEncante < 10) {
            this.maxEncante += 1; 
        }
        this.currentEncante = this.maxEncante;
    }
    
    takeDamage(damage) {
        let remainingDamage = damage;
        
        // Lógica de Armadura e Dano
        if (this.armor > 0) {
            this.armor -= remainingDamage;
            if (this.armor < 0) {
                remainingDamage = Math.abs(this.armor); 
                this.armor = 0;
            } else {
                remainingDamage = 0;
            }
        }
        if (remainingDamage > 0) {
            this.hp -= remainingDamage;
            if (this.hp <= 0) {
                this.hp = 0;
                this.isAlive = false;
            }
        }
        return remainingDamage;
    }

    /**
     * Método genérico para usar o Poder Heroico (delegação).
     */
    useHeroPower(target) {
        return this.heroPower.execute(this, target); 
    }
}

module.exports = Player;