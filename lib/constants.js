//Victorious:           0x27cd81Bae42CdD7fafD369ed8c3cE6E307283350
//Victorious_Automator: 0x6F10D979dabb6F5A4fE5B995Cd57540ee085Abd9

export const victoriousAddress = '0x27cd81Bae42CdD7fafD369ed8c3cE6E307283350'
export const rundownStatus = Object.freeze({
    
    //* I M P O R T A N T */
    //Have an admin override where the bets are refunded if games are postponed / cancelled
    //or there is an issue with the resolution and payment like for some Seria A games.

    1: "CANCELED",
    2: "DELAYED",
    3: "END OF FIGHT",
    4: "END OF ROUND",
    5: "END PERIOD",
    6: "FIGHTERS INTRODUCTION",
    7: "FIGHTERS WALKING",
    8: "FINAL",
    9: "FINAL PEN",
    10: "FIRST HALF",
    11: "FULL TIME",
    12: "HALFTIME",
    13: "IN PROGRESS",
    14: "IN PROGRESS 2",
    15: "POSTPONED",
    16: "PRE FIGHT",
    17: "RAIN DELAY",
    18: "SCHEDULED",
    19: "SECOND HALF",
    20: "TBD",
    21: "UNCONTESTED",
    22: "ABANDONED",
    23: "FORFEIT"

})

//The RunDown statuses can be viewed by admins.
//Have only 3 statuses available to end users, 
//open to bets (pre-game), 
//betting closed (game in progress or unresolved),
//resolved (paid out)

