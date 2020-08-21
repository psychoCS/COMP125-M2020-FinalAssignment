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
    let exampleLabel;
    let exampleButton;
    let diceTableBackground;
    let rollButton;
    let dice1Label;
    let dice2Label;
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
    function buildInterface() {
        // Slot Machine Background
        diceTableBackground = new Core.GameObject("background", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(diceTableBackground);
        // Buttons
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X + 135, Config.Game.CENTER_Y + 176, true);
        stage.addChild(rollButton);
        // Labels
        dice1Label = new UIObjects.Label("99999999", "20px", "Consolas", "#FF0000", Config.Game.CENTER_X, Config.Game.CENTER_Y - 175, true);
        stage.addChild(dice1Label);
        creditLabel = new UIObjects.Label("99999999", "20px", "Consolas", "#FF0000", Config.Game.CENTER_X - 94, Config.Game.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label("99999999", "20px", "Consolas", "#FF0000", Config.Game.CENTER_X + 94, Config.Game.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label("9999", "20px", "Consolas", "#FF0000", Config.Game.CENTER_X, Config.Game.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject("star", Config.Game.CENTER_X - 79, Config.Game.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("america", Config.Game.CENTER_X, Config.Game.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("thor", Config.Game.CENTER_X + 78, Config.Game.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        rollLine = new Core.GameObject("bet_line", Config.Game.CENTER_X, Config.Game.CENTER_Y - 12, true);
        stage.addChild(rollLine);
    }
    function interfaceLogic() {
        rollButton.on("click", () => {
            // reel test
            let Rolls = Rolls();
            // example of how to replace the images in the Rolls
            leftReel.image = assets.getResult(Rolls[0]);
            middleReel.image = assets.getResult(Rolls[1]);
            rightReel.image = assets.getResult(Rolls[2]);
        });
        ResetButton.on("click", () => {
            //document.getElementById("betLabel").reset() as HTMLImageElement;
            console.log("ResetButton Button Clicked");
        });
        ExitButton.on("click", () => {
            window.open("your current page URL", "_self", "");
            window.close();
            console.log("ExitButton Button Clicked");
        });
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        exampleLabel = new UIObjects.Label("An Example Label", "40px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(exampleLabel);
        exampleButton = new UIObjects.Button("button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(exampleButton);
        exampleButton.on("click", () => {
            console.log("example button clicked");
        });
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map