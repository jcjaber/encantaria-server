# 🔱 GDD - Essential Rules (Core)

## 1. Game Loop (Turn Structure)

| Phase | Main Action | Server Logic |
| :--- | :--- | :--- |
| **1. Start Turn** | Passive/Axé | Increases `maxAxe` (+1 up to 10) and restores `currentAxe` = `maxAxe`. |
| **2. Draw Phase** | Card Draw | Moves 1 card from Deck to Hand. Checks for Fatigue Damage. |
| **3. Main Phase** | Actions | Play Card / Use Hero Power / Attack with Minions and Hero. |
| **4. End Turn** | Pass Control | Processes 'End of Turn' effects. |

## 2. Card Types and Attributes (`Card.js` Classes)

### 2.1. Essential Keywords (Keywords)

| Keyword | Property in Code | Effect Summary |
| :--- | :--- | :--- |
| **Charge** (Investida) | `hasCharge: boolean` | Can attack on the turn it is played. |
| **Windfury** (Fúria dos Ventos) | `hasWindfury: boolean` | Can attack twice per turn. |
| **Taunt** (Provocar) | `isTaunt: boolean` | Must be attacked first. |
| **Battlecry** (Grito de Guerra) | `battlecryEffect: string` | Effect triggers when played from hand. |
| **Deathrattle** (Último Suspiro) | `deathrattleEffect: string` | Effect triggers when the Minion dies. |

## 3. Initial Archetype: The Warrior

| Element | Rule |
| :--- | :--- |
| **Class** | Warrior |
| **Hero** | Zumbi dos Palmares |
| **Hero Power**| Fortify |
| **Cost** | 2 Axé |
| **Effect** | **Gains 2 Armor.** |