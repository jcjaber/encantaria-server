// src/classes/Guerreiro/GuerreiroCards.js

const Minion = require('../../models/Minion'); 
const Spell = require('../../models/Spell');
const Weapon = require('../../models/Weapon'); 

const SET_ID = 'BASIC'; 

// --- Definição das 6 Cartas Básicas do Guerreiro ---

// 1. Arribar Escudo (Spell)
const ShieldBlock = new Spell(
    'Arribar Escudo', 
    3, 
    SET_ID,
    'DrawCardAndGainArmor' 
);

// 2. Botar pra Dormir (Spell)
const Execute = new Spell(
    'Botar pra Dormir', 
    1, 
    SET_ID,
    'DestroyWoundedMinion' 
);

// 3. Rabo de Arraia (Spell)
const Whirlwind = new Spell(
    'Rabo de Arraia', 
    1, 
    SET_ID,
    'DealOneDamageToAllMinions'
);

// 4. Facão Corta-Demandas (WEAPON)
const FieryWarAxe = new Weapon(
    'Facão Corta-Demandas', 
    2, 
    SET_ID,
    3, // Attack
    2  // Durability
);

// 5. Sova (Spell)
const Slam = new Spell(
    'Sova', 
    2, 
    SET_ID,
    'DealTwoDamageAndDrawIfSurvives'
);

// 6. Lanceiro-Mor (Minion)
const KorkronElite = new Minion(
    'Lanceiro-Mor', 
    4, 
    4, // Attack
    3, // Health
    SET_ID,
    { charge: true } 
);


// --- Lista final do Deck Básico (2 cópias de cada) ---
const GUERREIRO_BASIC_DECK_LIST = [
    ShieldBlock, ShieldBlock,
    Execute, Execute,
    Whirlwind, Whirlwind,
    FieryWarAxe, FieryWarAxe,
    Slam, Slam,
    KorkronElite, KorkronElite,
];

module.exports = {
    GUERREIRO_BASIC_DECK_LIST
};