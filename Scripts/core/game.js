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
    let dice2Label;
    let leftRoll;
    let rightRoll;
    let rollLine;
    //rolls tallies
    let R1 = 0;
    let R2 = 0;
    let R3 = 0;
    let R4 = 0;
    let R5 = 0;
    let R6 = 0;
    let assetManifest = [
        { id: "R1", src: "./Assets/images/1.png" },
        { id: "R2", src: "./Assets/images/2.png" },
        { id: "R3", src: "./Assets/images/3.png" },
        { id: "R4", src: "./Assets/images/4.png" },
        { id: "R5", src: "./Assets/images/5.png" },
        { id: "R6", src: "./Assets/images/6.png" },
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
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
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
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        stage.update();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRoll(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    function Rolls() {
        var rollLine = [" ", " "];
        var outCome = [0, 0];
        for (var roll = 0; roll < 2; roll++) {
            outCome[roll] = Math.floor(Math.random() * 12 + 1);
            switch (outCome[roll]) {
                case checkRoll(outCome[roll], 1, 2): // 16.6% probability
                    rollLine[roll] = "R1";
                    R1++;
                    break;
                case checkRoll(outCome[roll], 3, 4): // 16.6% probability
                    rollLine[roll] = "R2";
                    R2++;
                    break;
                case checkRoll(outCome[roll], 5, 6): // 16.6% probability
                    rollLine[roll] = "R3";
                    R3++;
                    break;
                case checkRoll(outCome[roll], 7, 8): //  16.6% probability
                    rollLine[roll] = "R4";
                    R4++;
                    break;
                case checkRoll(outCome[roll], 9, 10): //  16.6% probability
                    rollLine[roll] = "R5";
                    R5++;
                    break;
                case checkRoll(outCome[roll], 11, 12): //  16.6% probability
                    rollLine[roll] = "R6";
                    R6++;
                    break;
            }
        }
        return rollLine;
    }
    function buildInterface() {
        // Slot Machine Background
        diceTableBackground = new Core.GameObject("background", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(diceTableBackground);
        // Buttons
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);
        // Labels
        dice1Label = new UIObjects.Label("Value1", "40px", "Consolas", "#FFFFFF", Config.Game.CENTER_X - 194, Config.Game.CENTER_Y, true);
        stage.addChild(dice1Label);
        dice2Label = new UIObjects.Label("Value2", "40px", "Consolas", "#FFFFFF", Config.Game.CENTER_X + 194, Config.Game.CENTER_Y, true);
        stage.addChild(dice2Label);
        // Reel GameObjects
        leftRoll = new Core.GameObject("1", Config.Game.CENTER_X - 194, Config.Game.CENTER_Y - 12, true);
        stage.addChild(leftRoll);
        rightRoll = new Core.GameObject("2", Config.Game.CENTER_X + 194, Config.Game.CENTER_Y - 12, true);
        stage.addChild(rightRoll);
        // Bet Line
        rollLine = new Core.GameObject("bet_line", Config.Game.CENTER_X, Config.Game.CENTER_Y - 12, true);
        stage.addChild(rollLine);
    }
    function interfaceLogic() {
        rollButton.on("click", () => {
            // roll test
            let rolls = Rolls();
            // example of how to replace the images in the Rolls
            leftRoll.image = assets.getResult(rolls[0]);
            rightRoll.image = assets.getResult(rolls[1]);
        });
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        buildInterface();
        interfaceLogic();
        rollButton = new UIObjects.Button("button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map