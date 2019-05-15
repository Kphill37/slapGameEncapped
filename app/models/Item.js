export default class Item {
  constructor({ name = "", attackModifier = 0, defenseModifier = 0, description = "" }) {
    this.name = name
    this.attackModifier = attackModifier
    this.defenseModifier = defenseModifier
    this.description = description
  }
}