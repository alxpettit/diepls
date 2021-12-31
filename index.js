const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'localhost', // minecraft server ip
    username: 'diepls', // minecraft username
    // password: '12345678'. // minecraft password, comment out if you want to log into online-mode=false servers
    port: 33929,                // only set if you need a port that isn't 25565
    // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
    // auth: 'mojang'              // only set if you need microsoft auth, then set this to 'microsoft'
})

function player_filter(entity) {
    return entity.type === 'player'
}

function look_at_nearest_player() {

    bot.setControlState('forward', true)
    //if (bot.blockAt(bot.entity.position.offset(0, 0, 1))) {
    bot.setControlState('jump', true)
    //}
    const player_entity = bot.nearestEntity(player_filter)
    if (player_entity) {
        const player_entity_pos = player_entity.position;
        const player_eye_pos = player_entity_pos.offset(0, player_entity.height, 0)
        bot.lookAt(player_eye_pos)
        if (bot.entity.position.distanceTo(player_entity_pos) > 2) {
        } else {
            bot.attack(player_entity)
        }
    }
    //bot.clearControlStates()
}

bot.on('physicTick', look_at_nearest_player)
//
// bot.on('chat', (username, message) => {
//     if (username === bot.username) return
//     bot.chat(message)
//     bot.lookAt()
// })

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)