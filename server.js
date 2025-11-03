// Importa as dependências instaladas:
// express: para gerenciar o servidor web (embora nosso foco seja Socket.IO, ele é a base).
// http: Módulo nativo do Node.js necessário para criar o servidor base que o Socket.IO irá usar.
// Server: A classe do Socket.IO que gerencia a comunicação em tempo real.
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Define a porta do servidor. O padrão profissional usa a variável de ambiente process.env.PORT,
// mas usamos 3001 como um fallback (valor padrão) para o desenvolvimento local.
const PORT = process.env.PORT || 3001;

// 1. Inicializa o Express e cria o servidor HTTP
const app = express();
const server = http.createServer(app);

// 2. Configura o Socket.IO para o tempo real
// O 'cors' é crucial: permite que seu Front-end (que estará em outro endereço) se conecte.
const io = new Server(server, {
    cors: {
        origin: '*', // Permite qualquer Front-end conectar (ótimo para testes iniciais)
        methods: ['GET', 'POST'],
    },
});

console.log('--- Servidor Encantaria - Iniciando ---');
console.log(`Porta: ${PORT}`);

// 3. O Coração do Socket.IO: Monitora Novas Conexões
// io.on('connection') dispara sempre que um cliente (jogador) se conecta.
io.on('connection', (socket) => {
    // 'socket' é o objeto que representa a conexão individual com este único jogador.
    console.log(`✅ Usuário conectado: ID ${socket.id}`);

    // EX: Ouvindo um evento que o cliente enviará quando quiser procurar uma partida.
    socket.on('iniciar_busca_partida', (_data) => {
        console.log(`Pedido de busca de partida de ${socket.id}.`);
        
        // socket.emit envia uma mensagem APENAS para o jogador que enviou o evento.
        socket.emit('servidor_status', { message: 'Busca por partida iniciada. Aguarde...' });
    });

    // Evento disparado quando o cliente fecha a aba ou perde a conexão.
    socket.on('disconnect', () => {
        console.log(`❌ Usuário desconectado: ID ${socket.id}`);
    });
});
// -------------------------------------

// 4. Faz o servidor começar a ouvir requisições na porta definida
server.listen(PORT, () => {
    console.log(`Servidor de Encantaria rodando em http://localhost:${PORT}`);
});