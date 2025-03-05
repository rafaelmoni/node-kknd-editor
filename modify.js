const fs = require("fs");

const UNIT_ATTRIBUTES_OFFSETS = {
  cost: 12,
  health: 16,
  speed: 20,
  fireSpeed: 24,
  rotateSpeed: 28,
  viewRange: 32,
  fireRange: 36,
  accuracy: 40,
  canCrush: 44,
  crushable: 48,
  turret: 68,
  projectile: 72,
  size1: 76,
  size2: 80,
  faction: 84,
  buildTime: 96,
};

const TURRET_ATTRIBUTES_OFFSETS = {
  fireSpeed: 12,
  reloadTime: 16,
  clipSize: 20,
};

const PROJECTILE_ATTRIBUTES_OFFSETS = {
  speed: 16,
  damageInfantry: 20,
  damageVehicle: 24,
  damageBuilding: 28,
};

const units = require("./game_units.json");

const originalFile = "game.exe"; // Original .exe file
const modifiedFile = "game_modified.exe"; // New file with changes

// Copy the original .exe to a new file
fs.copyFileSync(originalFile, modifiedFile);
console.log(`Copied ${originalFile} to ${modifiedFile}`);

// Open the copied file for modification
const fd = fs.openSync(modifiedFile, "r+");

const modify = (fd, modified, newValue, offset, UAO) => {
  if (!modified || !UAO[offset]) {
    console.log(`modified: ${modified}`);
    console.warn(`Offset ${offset} not found on UAO: ${JSON.stringify(UAO)}`);
    return false;
  }
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(newValue, 0);
  fs.writeSync(fd, buffer, 0, buffer.length, modified.offset + UAO[offset]);
};

const modifyUnit = (unit, newValue, offset) =>
  modify(fd, unit, newValue, offset, UNIT_ATTRIBUTES_OFFSETS);

const modifyTurret = (turret, newValue, offset) =>
  modify(fd, turret, newValue, offset, TURRET_ATTRIBUTES_OFFSETS);

const modifyProjectile = (projectile, newValue, offset) =>
  modify(fd, projectile, newValue, offset, PROJECTILE_ATTRIBUTES_OFFSETS);

/*
// Simply update all units craziness lol
const infantryNames = [
  // Survivors
  "Rifleman",
  "SWAT",
  "Flamer",
  "Sapper",
  "RPG Launcher",
  "Sniper",

  // Evolveds
  "Berserker",
  "Shotgunner",
  "Pyromaniac",
  "Rioter",
  "Bazooka",
  "Crazy Harry",
];

units
  .filter((u) => infantryNames.includes(u.name))
  .forEach((unit) => {
    console.log(unit);

    modify(fd, unit, 1, "cost");
    modify(fd, unit, 4096, "viewRange");
    //modify(fd, unit, 4096, "fireRange");
    modify(fd, unit, 120, "speed");
    modify(fd, unit, 10, "fireSpeed");
    modify(fd, unit, 1, "buildTime");
  });

const unitNames = [
  // Survivors
  "Dirt Bike",
  "4x4 Pickup",
  "All terrain Vehicle",
  "ATV Flamethrower",
  "Anaconda Tank",
  "Barrage Craft",
  "Autocannon Tank",
  "Bomber",

  // Evolved
  "Dire Wolf",
  "Bike & Sidecar",
  "Monster Truck",
  "Giant Scorpion",
  "War Mastodon",
  "Giant Beetle",
  "Missile Crab",
  "Wasp",

  // Both
  "Oil Tanker",
  "Derrick",
];

units
  .filter((u) => unitNames.includes(u.name))
  .forEach((unit) => {
    console.log(unit);

    modify(fd, unit, 1, "cost");
    modify(fd, unit, 4096, "viewRange");
    modify(fd, unit, 128, "rotateSpeed");
    //modify(fd, unit, 4096, "fireRange");
    modify(fd, unit, 120, "speed");
    if (unit.rotateSpeed > 10) modify(fd, unit, 10, "fireSpeed");
    modify(fd, unit, 1, "buildTime");
  });

const building = units.find((u) => u.name === "Research Lab");
console.log(building);
modify(fd, building, 1, "cost");
modify(fd, building, 1, "buildTime");
*/

//const unit2 = units.find((u) => u.name === "Outpost");
//modify(fd, unit2, 4096, "viewRange");

/*
// Change Anaconda, Barrage Craft and Autocannon Tank
const anaconda = units.find((u) => u.name === "Anaconda Tank");
const barrage = units.find((u) => u.name === "Barrage Craft");
const cannon = units.find((u) => u.name === "Autocannon Tank");

[anaconda, barrage].forEach((unit) => {
  modifyUnit(unit, 1, "cost");
  modifyUnit(unit, 4096, "viewRange");
  modifyUnit(unit, 128, "rotateSpeed");
  //modifyUnit( unit, 4096, "fireRange"); // meme
  modifyUnit(unit, 120, "speed");
  modifyUnit(unit, 10, "fireSpeed");
  modifyUnit(unit, 1, "buildTime");

  modifyTurret(unit.turret, 30, "fireSpeed");
  modifyTurret(unit.turret, 30, "reloadTime");

  modifyProjectile(unit.turret.projectile, 10, "speed");
});

modifyUnit(cannon, 1, "cost");
modifyUnit(cannon, 128, "rotateSpeed");
modifyUnit(cannon, 120, "speed");
modifyUnit(cannon, 1, "fireSpeed");
modifyUnit(cannon, 1, "buildTime");

modifyTurret(cannon.turret, 1, "fireSpeed");
modifyTurret(cannon.turret, 1, "reloadTime");

const buildings = ["Research Lab", "Derrick", "Machine Shop", "Power Station"];

units
  .filter((u) => buildings.includes(u.name))
  .forEach((unit) => {
    modifyUnit(unit, 1, "cost");
    modifyUnit(unit, 4096, "viewRange");
    modifyUnit(unit, 1, "buildTime");
  });
  */

/*
// Swap Anaconda's Turret with Barrage Craft Turret
const anaconda = units.find((u) => u.name === "Anaconda Tank");
const barrage = units.find((u) => u.name === "Barrage Craft");

modifyUnit(anaconda, barrage.turretOffset, "turret");
modifyUnit(anaconda, barrage.projectileOffset, "projectile");
*/

// Close the file
fs.closeSync(fd);
console.log(`Modifications saved to ${modifiedFile}`);
