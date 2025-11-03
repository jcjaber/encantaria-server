// server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Game = require('./src/models/Game'); // Importa a nova classe Game

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'],
    },
});

// --- NOVO: Variável global para gerenciar a fila de espera ---
const waitingPlayers = [];
let activeGame = null; // Usado para armazenar a instância da partida

console.log('--- Servidor Encantaria - Iniciando ---');

io.on('connection', (socket) => {
    console.log(`✅ Usuário conectado: ID ${socket.id}`);

    // Adiciona o jogador à fila de espera (Simulação de Matchmaking)
    waitingPlayers.push(socket);
    socket.emit('servidor_status', { message: 'Conectado. Aguardando outro jogador...' });

    if (waitingPlayers.length >= 2) {
        console.log("MATCH FOUND: Iniciando partida!");
        
        const player1Socket = waitingPlayers.shift();
        const player2Socket = waitingPlayers.shift();
        
        // Cria a instância do Game
        activeGame = new Game(player1Socket, player2Socket);
        
        // Inicia o jogo
        activeGame.startGame();
    }
    
    // --- NOVO: Evento para terminar o turno (usaremos no teste) ---
    socket.on('end_turn', () => {
        if (activeGame) {
            activeGame.endTurn(socket.id);
        }
    });

    // Evento de desconexão
    socket.on('disconnect', () => {
        console.log(`❌ Usuário desconectado: ID ${socket.id}`);
        // Remove da fila ou encerra a partida se ele era o ativo
        if (waitingPlayers.includes(socket)) {
             waitingPlayers.splice(waitingPlayers.indexOf(socket), 1);
        }
    });
});
// -------------------------------------

server.listen(PORT, () => {
    console.log(`Servidor de Encantaria rodando em http://localhost:${PORT}`);
});