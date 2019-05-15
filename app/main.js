import gameController from "../app/components/game-controller.js"



class App {
  constructor() {
    this.controllers = {
      gameController: new gameController()
    }
  }
}

window['app'] = new App()