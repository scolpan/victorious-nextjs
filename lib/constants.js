export const victoriousAddress = '0xed2A3808a29B5c37E04899F3568a442b40Ce9D9A'

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

