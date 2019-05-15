import Boss from "../models/Boss.js"
import Player from "../models/Player.js"
import Item from "../models/Item.js"

let _boss = new Boss("Bowser", 100, 0, [], 0, 0)
let _player = new Player("Mario", 100, 0, [], 0, 0)
let _fireFlower = new Item({ name: "Fire Flower", attackModifier: 7, defenseModifier: 0, description: "A wild flower commonly found throughout the Mushroom Kingdom.  Launches a fiery blaze." })
let _koopaShell = new Item({ name: "Koopa Shell", attackModifier: 5, defenseModifier: 0, description: "A shell straight off the back of a Koopa.  You're just borrowing it.." })
let _Hammer = new Item({ name: "Hammer", attackModifier: 15, defenseModifier: 0, description: "A legendary hammer that was first used by Mario to take down the likes of Donkey Kong." })
let _starRod = new Item({ name: "Star Rod", attackModifier: 8, defenseModifier: 5, description: "A magical rod that can make all wishes come to.  Gives Bowser increased attack and defense!" })
let _toughGuy = new Item({ name: "Tough Guy", attackModifier: 8, defenseModifier: 5, description: "Allows Bowser to fight back.  Hits for random number + attack power!" })
let _gigaBowser = new Item({ name: "Giga Bowser", attackModifier: 0, defenseModifier: 0, description: "Gives Bowser an additional 50 health!" })

let maxBossItems = 0
let maxItems = 0
let toughGuyStatus = false;
let toughGuyDamage = 0
let excess = _boss.defense



export default class gameService {
  constructor() {

  }
  get Boss() {
    return new Boss(_boss.name, _boss.health, _boss.hits, _boss.items, _boss.attackPower, _boss.defense)
  }
  get Player() {
    return new Player(_player.name, _player.health, _player.hits, _player.items, _player.attackPower, _player.defense)
  }
  slap() {
    this.toughGuyStatus()
    ++_boss.hits
    if (_boss.defense > 0 && excess > 0) {
      _boss.defense -= _player.attackPower + 1
    }
    else if (_boss.defense > 0 && excess < 0) {
      _boss.defense -= excess + _player.attackPower + 1
    }
    else if (_boss.defense <= 0) {
      _boss.health -= excess + _player.attackPower + 1
    }
    this.checkForKo()
    this.buttonBehavior()
  }
  punch() {
    this.toughGuyStatus()
    ++_boss.hits
    if (_boss.defense > 0) {
      _boss.defense -= _player.attackPower + 5
      let excess = _boss.defense
    }
    else if (_boss.defense <= 0) {
      _boss.health -= _player.attackPower + 5
    }
    this.checkForKo()
    this.buttonBehavior()
  }
  kick() {
    debugger
    this.toughGuyStatus()
    ++_boss.hits
    console.log(_boss.defense)
    if (_boss.defense > 0) {
      _boss.defense -= _player.attackPower + 10
    }
    else if (_boss.defense <= 0) {
      _boss.health -= _player.attackPower + 10
    }
    this.checkForKo()
    this.buttonBehavior()
  }
  buttonBehavior() {
    if (_boss.health <= 0 || _player.health <= 0) {
      document.getElementById("slapAttack").disabled = true;
      document.getElementById("punchAttack").disabled = true;
      document.getElementById("kickAttack").disabled = true;
    }
    else if (_boss.health > 0 || _player.health > 0) {
      document.getElementById("slapAttack").disabled = false;
      document.getElementById("punchAttack").disabled = false;
      document.getElementById("kickAttack").disabled = false;
    }
  }
  fireFlower() {
    debugger
    _player.items.push(_fireFlower)
    _player.attackPower += _fireFlower.attackModifier
    document.getElementById("fireFlower").disabled = true;
    this.totalItems()
    this.addPlayerAttack
  }
  koopaShell() {
    _player.items.push(_koopaShell)
    _player.attackPower += _koopaShell.attackModifier
    document.getElementById("koopaShell").disabled = true;
    this.totalItems()
    this.addPlayerAttack()
  }
  Hammer() {
    _player.items.push(_Hammer)
    _player.attackPower += _Hammer.attackModifier
    document.getElementById("Hammer").disabled = true;
    this.totalItems()
    this.addPlayerAttack()
  }
  addPlayerAttack() {
    debugger
    for (let i = 0; i < _player.items.length; i++) {
      let item = _player.items[i]
      _player.attackPower + item.attackModifier
    }
    return _player.attackPower
  }
  totalItems() {
    maxItems++
    if (maxItems == 1) {
      var myJSON = JSON.stringify(_player.items[0].name + ":  " + _player.items[0].description);
      document.getElementById("item1").innerText = myJSON;
    }
    else if (maxItems == 2) {
      var myJSON = JSON.stringify(_player.items[1].name + ":  " + _player.items[1].description);
      document.getElementById("item2").innerText = myJSON;
    }
    else if (maxItems >= 3) {
      var myJSON = JSON.stringify(_player.items[2].name + ":  " + _player.items[2].description);
      document.getElementById("item3").innerText = myJSON;
    }
  }
  starRod() {
    document.getElementById("starRod").disabled = true;
    _boss.attackPower += _starRod.attackModifier
    _boss.defense += _starRod.defenseModifier
    _boss.items.push(_starRod)
    this.addBossAttack()
  }
  getRandomInt(max) {
    toughGuyDamage = Math.floor(Math.random() * Math.floor(max))
  }
  toughGuyStatus() {
    if (toughGuyStatus == true) {
      this.getRandomInt(10)
      _player.hits++
      _player.health -= toughGuyDamage + _boss.attackPower
    }
  }
  toughGuy() {
    document.getElementById("toughGuy").disabled = true;
    _boss.attackPower += _toughGuy.attackModifier
    _boss.attackPower += _toughGuy.defenseModifier
    toughGuyStatus = true;
    _boss.items.push(_toughGuy)
    this.addBossAttack()
    this.addBossDefense()
  }
  gigaBowser() {
    _boss.items.push(_gigaBowser)
    _boss.health += 50
    console.log(_boss.items[0])
  }
  addBossAttack() {
    debugger
    for (let i = 0; i < _boss.items.length; i++) {
      let item = _boss.items[i]
      _boss.attackPower + item.attackModifier
    }
    console.log(_boss.attackPower)
    return _boss.attackPower
  }
  addBossDefense() {
    debugger
    for (let i = 0; i < _boss.items.length; i++) {
      let item = _boss.items[i]
      _boss.defense + item.defenseModifier
    }
    console.log(_boss.defense)
    return _boss.defense
  }
  maxBossItems() {
    maxBossItems++
    if (maxBossItems == 1) {
      var myJSON = JSON.stringify(_boss.items[0].name + ":  " + _boss.items[0].description);
      document.getElementById("bossItem1").innerText = myJSON;
    }
    else if (maxBossItems == 2) {
      var myJSON = JSON.stringify(_boss.items[1].name + ":  " + _boss.items[1].description);
      document.getElementById("bossItem2").innerText = myJSON;
    }
    else if (maxBossItems <= 3) {
      var myJSON = JSON.stringify(_boss.items[2].name + ":  " + _boss.items[2].description);
      document.getElementById("bossItem3").innerText = myJSON;
      document.getElementById("starRod").disabled = true;
      document.getElementById("toughGuy").disabled = true;
      document.getElementById("gigaTransformation").disabled = true;
    }
  }
  checkForKo() {
    if (_player.health <= 0 && _boss.health > 0) {
      alert("Bowser Wins!")
    }
    else if (_boss.health <= 0 && _player.health > 0) {
      alert("Mario Wins!")
    }
    else if (_boss.health <= 0 && _player.health <= 0) {
      alert("It's a draw!")

    }
  }
  rematch() {
    _boss.health = 100
    _boss.defense = 0
    _boss.hits = 0
    _boss.attackPower = 0
    _boss.items = []
    _player.attackPower = 0
    _player.health = 100
    _player.hits = 0
    _player.items = []
    document.getElementById("slapAttack").disabled = false;
    document.getElementById("punchAttack").disabled = false;
    document.getElementById("kickAttack").disabled = false;
    document.getElementById("fireFlower").disabled = false;
    document.getElementById("koopaShell").disabled = false;
    document.getElementById("Hammer").disabled = false;
    document.getElementById("starRod").disabled = false;
    document.getElementById("toughGuy").disabled = false;
    document.getElementById("gigaTransformation").disabled = false;
    document.getElementById("item1").innerText = ""
    document.getElementById("item2").innerText = ""
    document.getElementById("item3").innerText = ""
    document.getElementById("bossItem1").innerText = ""
    document.getElementById("bossItem2").innerText = ""
    document.getElementById("bossItem3").innerText = ""
  }
}