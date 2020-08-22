"use strict";
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
    let canvas = document.getElementsByTagName("canvas")[0];
    let stage;
    let assets;
    let diceTableBackground;
    let rollButton;
    let dice1Label;
    let firstRoll;
    let dice2Label;
    let secondRoll;
    let rollLine;
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
    function Preload() {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
    This method initializes the CreateJS (EaselJS) Library
    It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
    */
    function Start() {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config
        Main();
    }
    /*
     This function is triggered every frame (16ms)
     The stage is then erased and redrawn
    */
    function Update() {
        stage.update();
    }
    function Main() {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        // Dice Table Background
        diceTableBackground = new Core.GameObject("background", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(diceTableBackground);
        // Buttons
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 68, true);
        stage.addChild(rollButton);
        rollButton.on("click", () => {
            console.log("Dices rolled...");
            stage.removeAllChildren();
            stage.addChild(diceTableBackground);
            stage.addChild(rollButton);
            // Dice 1
            let firstDice = Math.floor(Util.Mathf.RandomRange(1, 6)).toString();
            firstRoll = new Core.GameObject(firstDice, Config.Game.CENTER_X - 194, Config.Game.CENTER_Y - 80, true);
            stage.addChild(firstRoll);
            dice1Label = new UIObjects.Label(firstDice, "100px", "Consolas", "#FFFFFF", Config.Game.CENTER_X - 194, Config.Game.CENTER_Y + 140, true);
            stage.addChild(dice1Label);
            // Dice 2
            let secondDice = Math.floor(Util.Mathf.RandomRange(1, 6)).toString();
            secondRoll = new Core.GameObject(secondDice, Config.Game.CENTER_X + 194, Config.Game.CENTER_Y - 80, true);
            stage.addChild(secondRoll);
            dice2Label = new UIObjects.Label(secondDice, "100px", "Consolas", "#FFFFFF", Config.Game.CENTER_X + 194, Config.Game.CENTER_Y + 140, true);
            stage.addChild(dice2Label);
        });
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map