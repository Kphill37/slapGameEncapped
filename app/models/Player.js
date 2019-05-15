export default class Player {
  constructor(name = "", health = 0, hits = 0, items = [], attackPower = 0, defense = 0) {
    this.name = name
    this.health = health
    this.hits = hits
    this.items = items
    this.attackPower = attackPower
    this.defense = defense
  }
}