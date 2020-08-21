/*

Name: game.ts
Author: Thiago Luiz Batista
Student Number: 301110966
Description: Final Assignment
Program: COMP125 M2020
Date: 21 / 08 / 2020
Website: Thiago The Dice Roller
File Description: The codes that make dice`s rolling  properly.

*/

let Game = (function () {
  // variable declarations
  let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
  let stage: createjs.Stage;

  let assets: createjs.LoadQueue;

  let exampleLabel: UIObjects.Label;
  let exampleButton: UIObjects.Button;
  let diceTableBackground: Core.GameObject;
  let rollButton: UIObjects.Button;
  let dice1Label: UIObjects.Label;
  let dice2Label: UIObjects.Label;
  let leftRoll: Core.GameObject;
  let rightRoll: Core.GameObject;
  let rollLine: Core.GameObject;

  //rolls tallies
  let R1 = 0;
  let R2 = 0;
  let R3 = 0;
  let R4 = 0;
  let R5 = 0;
  let R6 = 0;

  let assetManifest = [
    { id: "1", src: "./Assets/images/1.png" },
    { id: "2", src: "./Assets/images/2.png" },
    { id: "3", src: "./Assets/images/3.png" },
    { id: "4", src: "./Assets/images/4.png" },
    { id: "5", src: "./Assets/images/5.png" },
    { id: "6", src: "./Assets/images/6.png" },
    { id: "backButton", src: "./Assets/images/startButton.png" },
    { id: "background", src: "./Assets/images/background.png" },
    { id: "blank", src: "./Assets/images/blank.png" },
    { id: "button", src: "./Assets/images/button.png" },
    { id: "nextButton", src: "./Assets/images/nextButton.png" },
    { id: "placeholder", src: "./Assets/images/placeholder.png" },
    { id: "resetButton", src: "./Assets/images/resetButton.png" },
    { id: "rollButton", src: "./Assets/images/rollButton.png" },
    { id: "startButton", src: "./Assets/images/startButton.png" },
    { id: "startOverButton", src: "./Assets/images/startOverButton.png" },
  ];

  function Preload(): void {
    console.log(
      `%c Preload Function`,
      "color: grey; font-size: 14px; font-weight: bold;"
    );
    assets = new createjs.LoadQueue(); // asset container
    assets.installPlugin(createjs.Sound); // supports sound preloading
    assets.loadManifest(assetManifest);
    assets.on("complete", Start);
  }

  /**
   * This method initializes the CreateJS (EaselJS) Library
   * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
   */
  function Start(): void {
    console.log(
      `%c Start Function`,
      "color: grey; font-size: 14px; font-weight: bold;"
    );
    stage = new createjs.Stage(canvas);
    createjs.Ticker.framerate = Config.Game.FPS;
    createjs.Ticker.on("tick", Update);
    stage.enableMouseOver(20);

    Config.Game.ASSETS = assets; // make a reference to the assets in the global config

    Main();
  }

  /**
   * This function is triggered every frame (16ms)
   * The stage is then erased and redrawn
   */
  function Update(): void {
    stage.update();
  }

  /* Utility function to check if a value falls within a range of bounds */
  function checkRoll(
    value: number,
    lowerBounds: number,
    upperBounds: number
  ): number | boolean {
    if (value >= lowerBounds && value <= upperBounds) {
      return value;
    } else {
      return !value;
    }
  }

  function Rolls(): string[] {
    var rollLine = [" ", " "];
    var outCome = [0, 0];

    for (var roll = 0; roll < 2; roll++) {
      outCome[roll] = Math.floor(Math.random() * 6) + 1;
      switch (outCome[roll]) {
        case checkRoll(outCome[roll], 1, 1): // 16.6% probability
          rollLine[roll] = "1";
          R1++;
          break;
        case checkRoll(outCome[roll], 2, 2): // 16.6% probability
          rollLine[roll] = "2";
          R2++;
          break;
        case checkRoll(outCome[roll], 3, 3): // 16.6% probability
          rollLine[roll] = "3";
          R3++;
          break;
        case checkRoll(outCome[roll], 4, 4): //  16.6% probability
          rollLine[roll] = "4";
          R4++;
          break;
        case checkRoll(outCome[roll], 5, 5): //  16.6% probability
          rollLine[roll] = "5";
          R5++;
          break;
        case checkRoll(outCome[roll], 6, 6): //  16.6% probability
          rollLine[roll] = "6";
          R6++;
          break;
      }
    }
    return rollLine;
  }

  function buildInterface(): void {
    // Slot Machine Background
    diceTableBackground = new Core.GameObject(
      "background",
      Config.Game.CENTER_X,
      Config.Game.CENTER_Y,
      true
    );
    stage.addChild(diceTableBackground);

    // Buttons
    rollButton = new UIObjects.Button(
      "rollButton",
      Config.Game.CENTER_X,
      Config.Game.CENTER_Y + 100,
      true
    );
    stage.addChild(rollButton);

    // Labels
    dice1Label = new UIObjects.Label(
      "Value1",
      "40px",
      "Consolas",
      "#FFFFFF",
      Config.Game.CENTER_X - 194,
      Config.Game.CENTER_Y,
      true
    );
    stage.addChild(dice1Label);

    dice2Label = new UIObjects.Label(
      "Value2",
      "40px",
      "Consolas",
      "#FFFFFF",
      Config.Game.CENTER_X + 194,
      Config.Game.CENTER_Y,
      true
    );
    stage.addChild(dice2Label);

    // Reel GameObjects
    leftRoll = new Core.GameObject(
      "star",
      Config.Game.CENTER_X - 79,
      Config.Game.CENTER_Y - 12,
      true
    );
    stage.addChild(leftRoll);

    rightRoll = new Core.GameObject(
      "thor",
      Config.Game.CENTER_X + 78,
      Config.Game.CENTER_Y - 12,
      true
    );
    stage.addChild(rightRoll);

    // Bet Line
    rollLine = new Core.GameObject(
      "bet_line",
      Config.Game.CENTER_X,
      Config.Game.CENTER_Y - 12,
      true
    );
    stage.addChild(rollLine);
  }

  function interfaceLogic(): void {
    rollButton.on("click", () => {
      // reel test
      let rolls = Rolls();

      // example of how to replace the images in the Rolls
      leftRoll.image = assets.getResult(rolls[0]) as HTMLImageElement;
      rightRoll.image = assets.getResult(rolls[1]) as HTMLImageElement;
    });
  }

  /**
   * This is the main function of the Game (where all the fun happens)
   *
   */
  function Main(): void {
    buildInterface();

    interfaceLogic();
  }

  window.addEventListener("load", Preload);
})();
