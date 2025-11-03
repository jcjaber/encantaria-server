# 🔱 GDD - Regras Essenciais (Core)

## 1. Loop de Jogo (Turno)

| Fase                   | Ação Principal  | Regra de Servidor                                                |
| :--------------------- | :-------------- | :--------------------------------------------------------------- |
| **1. Início do Turno** | Passiva/Axé     | Aumenta `maxAxé` (+1 até 10) e restaura `currentAxé` = `maxAxé`. |
| **2. Compra**          | Compra de Carta | Mover 1 carta do Deck para a Mão. Checar Dano de Fadiga.         |
| **3. Principal**       | Ações           | Jogar Carta / Usar Poder Heroico / Ataque com Lacaios e Herói.   |
| **4. Fim do Turno**    | Passa o Turno   | Processar efeitos de Fim de Turno.                               |

## 2. Tipos e Atributos de Carta (Classe `Card.js`)

Todos os Lacaios devem ter os seguintes atributos de estado para o combate:

- `name` (string)
- `cost` (number)
- `attack` (number)
- `health` (number)
- `currentHealth` (number)
- `isSleep` (boolean) - _True_ no turno que entra, _False_ depois.
- **Raridade (Simplificada):** Começaremos com cartas do **Set Básico**.

### 2.1. Palavras-Chave (Keywords) Essenciais

| Palavra-Chave        | Propriedade no Código       |
| :------------------- | :-------------------------- |
| **Investida**        | `hasCharge: boolean`        |
| **Fúria dos Ventos** | `hasWindfury: boolean`      |
| **Provocar**         | `isTaunt: boolean`          |
| **Grito de Guerra**  | `battlecryEffect: string`   |
| **Último Suspiro**   | `deathrattleEffect: string` |

## 3. Arquétipo Inicial: Guerreiro

| Elemento | Regra |
| :--- | :--- |
| **Classe** | Guerreiro |
| **Herói** | Zumbi dos Palmares |
| **Poder Heroico**| **Fortificar** |
| **Custo** | 2 Axé |
| **Efeito** | **Ganha 2 de Armadura.** |
