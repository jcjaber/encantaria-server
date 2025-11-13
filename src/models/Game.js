// src/models/Game.js

const Player = require('./Player.js'); 
const GuerreiroPower = require('../classes/Guerreiro/GuerreiroPower.js'); 
const { GUERREIRO_BASIC_DECK_LIST } = require('../classes/Guerreiro/GuerreiroCards.js'); 
const crypto = require('crypto'); 

/**
 * Classe responsável por gerenciar o estado completo de uma partida de Encantaria.
 */
class Game {
    /**
     * @param {Object} player1Socket - Objeto socket do primeiro jogador.
     * @param {Object} player2Socket - Objeto socket do segundo jogador.
     */
    constructor(player1Socket, player2Socket) {
        // --- Conexões Socket.IO ---
        this.sockets = {
            [player1Socket.id]: player1Socket,
            [player2Socket.id]: player2Socket,
        };
        this.io = player1Socket.server; 

        // --- Inicialização dos Jogadores ---
        const power1 = new GuerreiroPower(); 
        const power2 = new GuerreiroPower();
        
        this.player1 = new Player(player1Socket.id, power1);
        this.player2 = new Player(player2Socket.id, power2);
        
        this.players = {
            [this.player1.socketId]: this.player1,
            [this.player2.socketId]: this.player2,
        };

        // MONTAGEM DOS DECKS: Clona a lista, embaralha e atribui.
        const deck1 = [...GUERREIRO_BASIC_DECK_LIST];
        const deck2 = [...GUERREIRO_BASIC_DECK_LIST];

        this.shuffleDeck(deck1);
        this.shuffleDeck(deck2);

        this.player1.deck = deck1;
        this.player2.deck = deck2;

        // --- Estado do Jogo ---
        this.activePlayer = null; 
        this.turnCount = 0;
        this.status = 'INITIALIZING'; 
        this.gameLog = [];

        this.emitGameStatus('Game created successfully!');
    }
    
    // ... (Métodos startGame, endTurn, shuffleDeck)
    startGame() {
        this.status = 'RUNNING';
        this.activePlayer = this.player1; 
        this.turnCount = 1;
        this.emitGameStatus(`A partida começou! ${this.activePlayer.heroName} começa.`);
        this.startTurn();
    }
    
    /**
     * Usa o algoritmo Fisher-Yates para embaralhar o deck.
     */
    shuffleDeck(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = crypto.randomInt(i + 1); 
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startTurn() {
        const active = this.activePlayer;
        
        active.startTurn(); 
        
        this.emitGameUpdate(); 
        // Comunicação usando 'encante'
        this.emitToPlayer(active.socketId, 'YOUR_TURN', { encante: active.currentEncante });
    }
    
    endTurn(endingPlayerId) {
        if (this.activePlayer.socketId !== endingPlayerId) return;

        this.activePlayer = (this.activePlayer === this.player1) ? this.player2 : this.player1;
        this.turnCount++;
        
        this.emitGameStatus(`Turno de ${this.activePlayer.heroName}`);
        this.startTurn();
    }

    // --- Métodos de Comunicação (Socket.IO) ---
    emitGameStatus(message) {
        this.io.to(this.player1.socketId).emit('game_log', { message });
        this.io.to(this.player2.socketId).emit('game_log', { message });
    }

    emitGameUpdate() {
        // Envia o estado completo do jogo para os clientes
        const state = {
            activePlayerId: this.activePlayer.socketId,
            players: {
                [this.player1.socketId]: { 
                    hp: this.player1.hp, 
                    armor: this.player1.armor, 
                    currentEncante: this.player1.currentEncante // ATUALIZADO
                },
                [this.player2.socketId]: { 
                    hp: this.player2.hp, 
                    armor: this.player2.armor, 
                    currentEncante: this.player2.currentEncante // ATUALIZADO
                }
            }
            // NO FUTURO: Incluir Mão e Campo (hand, field)
        };
        this.io.to(this.player1.socketId).emit('game_update', state);
        this.io.to(this.player2.socketId).emit('game_update', state);
    }
    
    emitToPlayer(socketId, eventName, data) {
        this.sockets[socketId].emit(eventName, data);
    }
}

module.exports = Game;