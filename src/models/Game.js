// src/models/Game.js

const Player = require('./Player'); // Usaremos a classe Player
// Importar o poder heróico do Guerreiro para testes iniciais
const GuerreiroPower = require('../classes/Guerreiro/GuerreiroPower'); 

/**
 * Classe responsável por gerenciar o estado completo de uma partida de Encantaria.
 * Atua como a Máquina de Estados (State Machine) e árbitro.
 */
class Game {
    /**
     * @param {Object} player1Socket - Objeto socket do primeiro jogador.
     * @param {Object} player2Socket - Objeto socket do segundo jogador.
     */
    constructor(player1Socket, player2Socket) {
        // --- Conexões Socket.IO (para enviar eventos em tempo real) ---
        this.sockets = {
            [player1Socket.id]: player1Socket,
            [player2Socket.id]: player2Socket,
        };
        this.io = player1Socket.server; // A instância global do Socket.IO

        // --- Inicialização dos Jogadores (Injeção de Dependência) ---
        // Para a fase inicial, ambos são Guerreiros.
        const power1 = new GuerreiroPower(); 
        const power2 = new GuerreiroPower();
        
        this.player1 = new Player(player1Socket.id, power1);
        this.player2 = new Player(player2Socket.id, power2);
        
        this.players = {
            [this.player1.socketId]: this.player1,
            [this.player2.socketId]: this.player2,
        };

        // --- Estado do Jogo ---
        this.activePlayer = null; // Quem está jogando agora
        this.turnCount = 0;       // Contador de turnos
        this.status = 'INITIALIZING'; // Status: INITIALIZING, RUNNING, FINISHED
        this.gameLog = [];        // Histórico de ações

        this.emitGameStatus('Game created successfully!');
    }
    
    // --- Métodos de Controle do Jogo (GDD - Fluxo) ---

    startGame() {
        this.status = 'RUNNING';
        // Define quem começa. Vamos randomizar no futuro, por enquanto, P1 começa.
        this.activePlayer = this.player1; 
        this.turnCount = 1;
        
        // NO FUTURO: Distribuir decks, fazer compra inicial (mulligan)
        
        this.emitGameStatus(`A partida começou! ${this.activePlayer.heroName} começa.`);
        this.startTurn();
    }
    
    startTurn() {
        const active = this.activePlayer;
        
        // 1. Aumenta e restaura Axé (Conforme lógica do Player.js)
        active.startTurn(); 
        
        // 2. Compra de Carta (NO FUTURO: Implementar lógica de compra)
        // active.drawCard(); 
        
        // 3. Permite que Lacaios que estavam em Sleep acordem para atacar
        // active.field.forEach(minion => { minion.isSleep = false; });
        
        this.emitGameUpdate(); // Envia o estado atualizado para todos
        this.emitToPlayer(active.socketId, 'YOUR_TURN', { axe: active.currentAxe });
    }
    
    endTurn(endingPlayerId) {
        // Verifica se é realmente o turno do jogador que está terminando
        if (this.activePlayer.socketId !== endingPlayerId) return;

        // NO FUTURO: Processar efeitos de 'Fim de Turno'

        // Troca o jogador ativo
        this.activePlayer = (this.activePlayer === this.player1) ? this.player2 : this.player1;
        this.turnCount++;
        
        this.emitGameStatus(`Turno de ${this.activePlayer.heroName}`);
        this.startTurn();
    }
    
    // --- Métodos de Comunicação (Socket.IO) ---

    emitGameStatus(message) {
        // Envia uma mensagem de log para TODOS na sala
        this.io.to(this.player1.socketId).emit('game_log', { message });
        this.io.to(this.player2.socketId).emit('game_log', { message });
    }

    emitGameUpdate() {
        // Envia o estado completo do jogo para os clientes
        const state = {
            activePlayerId: this.activePlayer.socketId,
            players: {
                [this.player1.socketId]: { hp: this.player1.hp, armor: this.player1.armor, currentAxe: this.player1.currentAaxe },
                [this.player2.socketId]: { hp: this.player2.hp, armor: this.player2.armor, currentAxe: this.player2.currentAaxe }
            }
            // NO FUTURO: Incluir Mão e Campo
        };
        this.io.to(this.player1.socketId).emit('game_update', state);
        this.io.to(this.player2.socketId).emit('game_update', state);
    }
    
    emitToPlayer(socketId, eventName, data) {
        // Envia uma mensagem APENAS para o jogador especificado
        this.sockets[socketId].emit(eventName, data);
    }
}

module.exports = Game;