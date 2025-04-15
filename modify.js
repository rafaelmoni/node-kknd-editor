const { Modificator } = require("./configuration");
const {
  increaseGameSpeed,
  increaseGameSpeed30,
  doubleGameSpeed,
} = require("./experiments");

const fileCli = process.argv.slice(2, 3)[0];
const originalFile = fileCli || "game.exe"; // Original .exe file
const modifiedFile = originalFile.replace(".exe", "") + "_modified.exe"; // New file with changes

const modifier = new Modificator(originalFile, modifiedFile);
//increaseGameSpeed(modifier, 1.25, 0.75);
increaseGameSpeed30(modifier);

/*
const units = require("./units_game.json");
const { modifyProjectile, modifyTurret, modifyUnit } = modifier;
const unit = units.find((u) => u.name === "Barrage Craft");
modifyUnit(unit, 1, "cost");
modifyUnit(unit, 300, "speed");
modifyUnit(unit, 300, "rotateSpeed");
//modifyUnit(unit, 10, "fireSpeed");

modifyTurret(unit.turret, 10, "fireSpeed");
modifyTurret(unit.turret, 1, "reloadTime");

modifyProjectile(unit.turret.projectile, 10, "speed");
*/
