import gameService from "../components/game-service.js"
// import Player from "../models/Player.js";
// import Boss from "../models/Boss.js"
// import Item from "../models/Item.js"

let _gameService = new gameService()

let boss = _gameService.Boss
let player = _gameService.Player


function drawStart() {
  let boss = _gameService.Boss
  let player = _gameService.Player
  document.querySelector('#playerName').textContent = player.name
  document.querySelector('#playerHealth').textContent = player.health
  document.querySelector('#player-hits').textContent = player.hits
  document.querySelector('#bonusDamage').textContent = player.attackPower
  document.querySelector('#bossName').textContent = boss.name
  document.querySelector('#bossHealth').textContent = boss.health
  document.querySelector('#bossHits').textContent = boss.hits
  document.querySelector('#bossAttack').textContent = boss.attackPower
  document.querySelector('#bossDefense').textContent = boss.defense
}

function reDraw() {
  let boss = _gameService.Boss
  let player = _gameService.Player
  document.querySelector('#bossHits').textContent = boss.hits
  if (player.health < 0) {
    document.querySelector('#playerHealth').textContent = 0
  }
  else {
    document.querySelector('#playerHealth').textContent = player.health
  }
  document.querySelector('#player-hits').textContent = player.hits
  // document.querySelector('#bossHealth').textContent = boss.health
  // document.querySelector('#bossDefense').textContent = boss.defense
  if (boss.defense < 0) {
    document.getElementById("bossDefense").innerText = 0
  }
  else {
    document.getElementById("bossDefense").innerText = boss.defense
  }
  if (boss.health < 0) {
    document.getElementById("bossHealth").innerText = 0
  }
  else {
    document.getElementById("bossHealth").innerText = boss.health
  }
}
function drawPlayerAttack() {
  let player = _gameService.Player
  console.log(player.attackPower)
  document.getElementById("bonusDamage").innerText = player.attackPower
}
function drawBossAttack() {
  let boss = _gameService.Boss
  console.log(boss.attackPower)
  document.querySelector('#bossAttack').textContent = boss.attackPower
}
function drawBossDefense() {
  let boss = _gameService.Boss
  console.log(boss.defense)
  document.querySelector('#bossDefense').textContent = boss.defense
}

export default class gameController {
  constructor() {
    drawStart()
  }
  slap() {
    _gameService.slap()
    reDraw()
  }
  punch() {
    _gameService.punch()
    reDraw()
  }
  kick() {
    _gameService.kick()
    reDraw()
  }
  giveFireFlower() {
    _gameService.fireFlower()
    _gameService.addPlayerAttack()
    drawPlayerAttack()
  }
  giveKoopaShell() {
    _gameService.koopaShell()
    _gameService.addPlayerAttack()
    drawPlayerAttack()
  }
  giveHammer() {
    _gameService.Hammer()
    _gameService.addPlayerAttack()
    drawPlayerAttack()
  }
  giveStarRod() {
    _gameService.starRod()
    _gameService.addBossAttack()
    _gameService.addBossDefense()
    _gameService.maxBossItems()
    drawBossAttack()
    drawBossDefense()
  }
  toughGuy() {
    _gameService.toughGuy()
    _gameService.addBossAttack()
    _gameService.addBossDefense()
    _gameService.maxBossItems()
    drawBossAttack()
    drawBossDefense()
  }
  gigaBowser() {
    document.getElementById("gigaTransformation").disabled = true;
    _gameService.gigaBowser()
    _gameService.addBossAttack()
    _gameService.maxBossItems()
    drawBossAttack()
    reDraw()
  }
  rematch() {
    _gameService.rematch()
    drawStart()
  }
}