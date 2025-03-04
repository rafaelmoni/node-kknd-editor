const fs = require("fs");

const FILE_PATH = "game.exe"; // Path to the game EXE
const OFFSET_FIX = 0x401a00;

// Memory offsets
const MISSION_START = 0x0646b0;
const MISSION_SIZE = 48;
const MISSION_COUNT = 31;

const PROJECTILE_START = 0x06f4e0;
const PROJECTILE_SIZE = 36;
const PROJECTILE_COUNT = 50;

const UNIT_START = PROJECTILE_START + PROJECTILE_SIZE * PROJECTILE_COUNT;
const UNIT_SIZE = 100;
const UNIT_COUNT = 80;

function readString(buffer, offset) {
  let str = "";
  let i = offset;
  while (buffer[i] !== 0 && i < buffer.length) {
    str += String.fromCharCode(buffer[i]);
    i++;
  }
  return str;
}

function parseMission(buffer, offset, index) {
  let mission = {};

  mission.mapOffset = buffer.readUInt32LE(offset);
  mission.musicOffset = buffer.readUInt32LE(offset + 4);
  mission.fmvOffset = buffer.readUInt32LE(offset + 8);

  mission.map = readString(buffer, mission.mapOffset - OFFSET_FIX);
  mission.music = readString(buffer, mission.musicOffset - OFFSET_FIX);
  mission.fmv = readString(buffer, mission.fmvOffset - OFFSET_FIX);

  mission.moneySurvivors = buffer.readUInt16LE(offset + 12);
  mission.moneyEvolved = buffer.readUInt16LE(offset + 14);
  mission.unk1 = buffer.readUInt32LE(offset + 16);
  mission.techLevel = buffer.readUInt32LE(offset + 20);
  mission.unk2 = buffer.readUInt32LE(offset + 24);
  mission.unk3 = buffer.readUInt32LE(offset + 28);
  mission.unk4 = buffer.readUInt32LE(offset + 32);
  mission.unk5 = buffer.readUInt32LE(offset + 36);
  mission.unk6 = buffer.readUInt32LE(offset + 40);
  mission.unk7 = buffer.readUInt32LE(offset + 44);
  mission.offset = offset.toString(16);
  mission.index = index;

  return mission;
}

function parseProjectile(buffer, offset, index) {
  let projectile = {};

  projectile.sprite = buffer.readInt32LE(offset);
  projectile.scriptOffset = buffer.readUInt32LE(offset + 4);
  projectile.anim1 = buffer.readInt32LE(offset + 8);
  projectile.anim2 = buffer.readInt32LE(offset + 12);
  projectile.speed = buffer.readUInt32LE(offset + 16);
  projectile.damageInfantry = buffer.readUInt32LE(offset + 20);
  projectile.damageVehicle = buffer.readUInt32LE(offset + 24);
  projectile.damageBuilding = buffer.readUInt32LE(offset + 28);
  projectile.unk1 = buffer.readUInt32LE(offset + 32);
  projectile.offset = offset.toString(16);
  projectile.index = index;

  return projectile;
}

function parseTurret(buffer, offset, index) {
  let turret = {};

  turret.sprite = buffer.readInt32LE(offset);
  turret.scriptOffset = buffer.readUInt32LE(offset + 4);
  turret.unk1 = buffer.readUInt32LE(offset + 8);
  turret.fireSpeed = buffer.readUInt32LE(offset + 12);
  turret.reloadTime = buffer.readUInt32LE(offset + 16);
  turret.clipSize = buffer.readUInt32LE(offset + 20);
  turret.anim1 = buffer.readInt32LE(offset + 24);
  turret.anim2 = buffer.readInt32LE(offset + 28);
  turret.projectileOffset = buffer.readUInt32LE(offset + 32);
  turret.offset = offset.toString(16);
  turret.index = index;

  if (turret.projectileOffset !== 0) {
    let projOffset = turret.projectileOffset - OFFSET_FIX;
    turret.projectile = parseProjectile(buffer, projOffset);
  }

  return turret;
}

/**
 * @param {Buffer} buffer
 * @param {integer} offset
 */
function parseUnit(buffer, offset, index) {
  let unit = {};

  unit.sprite = buffer.readInt32LE(offset);
  unit.scriptOffset = buffer.readUInt32LE(offset + 4);
  unit.nameOffset = buffer.readUInt32LE(offset + 8);

  unit.name = readString(buffer, unit.nameOffset - OFFSET_FIX);

  unit.cost = buffer.readUInt32LE(offset + 12);
  unit.health = buffer.readUInt32LE(offset + 16);
  unit.speed = buffer.readUInt32LE(offset + 20);
  unit.fireSpeed = buffer.readUInt32LE(offset + 24);
  unit.rotateSpeed = buffer.readUInt32LE(offset + 28);
  unit.viewRange = buffer.readUInt32LE(offset + 32);
  unit.fireRange = buffer.readUInt32LE(offset + 36);
  unit.accuracy = buffer.readUInt32LE(offset + 40);
  unit.canCrush = buffer.readUInt32LE(offset + 44);
  unit.crushable = buffer.readUInt32LE(offset + 48);
  unit.anim1 = buffer.readInt32LE(offset + 52);
  unit.anim2 = buffer.readInt32LE(offset + 56);
  unit.anim3 = buffer.readInt32LE(offset + 60);
  unit.anim4 = buffer.readInt32LE(offset + 64);
  unit.turretOffset = buffer.readUInt32LE(offset + 68);
  unit.projectileOffset = buffer.readUInt32LE(offset + 72);
  unit.size = buffer.readUInt32LE(offset + 76);
  unit.size = buffer.readUInt32LE(offset + 80);
  unit.faction = buffer.readUInt32LE(offset + 84);
  unit.prio1 = buffer.readUInt32LE(offset + 88);
  unit.prio2 = buffer.readUInt32LE(offset + 92);
  unit.buildTime = buffer.readUInt32LE(offset + 96);
  unit.offset = offset;
  unit.index = index;

  if (unit.turretOffset !== 0) {
    let turretOffset = unit.turretOffset - OFFSET_FIX;
    unit.turret = parseTurret(buffer, turretOffset);
  }

  if (unit.projectileOffset !== 0) {
    let projOffset = unit.projectileOffset - OFFSET_FIX;
    unit.projectile = parseProjectile(buffer, projOffset);
  }

  return unit;
}

const getItems = (data, COUNT, START, SIZE, parser, cb = () => null) => {
  const items = [];
  for (let i = 0; i < COUNT; i++) {
    let offset = START + i * SIZE;
    const item = parser(data, offset, i);
    if (cb && cb(item) === false) {
      break;
    }
    items.push(item);
  }
  return items;
};

const toFile = (file, data) =>
  fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Extracted ${file} to file successfully`);
    }
  });

fs.readFile(FILE_PATH, (err, data) => {
  const exeName = FILE_PATH.replace(".exe", "");

  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const missions = getItems(
    data,
    MISSION_COUNT,
    MISSION_START,
    MISSION_SIZE,
    parseMission,
    (item) => item.fmvOffset !== 0
  );
  toFile(`${exeName}_missions.json`, missions);

  const projectiles = getItems(
    data,
    PROJECTILE_COUNT,
    PROJECTILE_START,
    PROJECTILE_SIZE,
    parseProjectile
  );
  toFile(`${exeName}_projectiles.json`, projectiles);

  const units = getItems(
    data,
    UNIT_COUNT,
    UNIT_START,
    UNIT_SIZE,
    parseUnit,
    (item) => item.sprite !== -1
  );
  toFile(`${exeName}_units.json`, units);
});
