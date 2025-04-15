const infantryNames = [
  // Survivors
  "Rifleman",
  "SWAT",
  "Technician",
  "Flamer",
  "Saboteur",
  "Sapper",
  "RPG Launcher",
  "Sniper",
  // Special
  "El Presidente",
  "General",
  "Scout",

  // Evolveds
  "Berserker",
  "Shotgunner",
  "Mekanik",
  "Pyromaniac",
  "Vandal",
  "Rioter",
  "Bazooka",
  "Crazy Harry",
  "King Zog",
  "Warlord",
];

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
  // Special
  "Convoy Tanker",
  "Mobile Outpost",

  // Evolved
  "Dire Wolf",
  "Bike & Sidecar",
  "Monster Truck",
  "Giant Scorpion",
  "War Mastodon",
  "Giant Beetle",
  "Missile Crab",
  "Wasp",
  // Special
  "Clanhall Wagon",

  // Both
  "Oil Tanker",
  "Derrick",

  // Robots
  "U.F.O.",
  "Gort The Robot",
  "G.O.R.N.",
  "Plasma Tank",
  "Sentinel Droid",
  "Mech",
  "Infiltrator",
];

const buildingNames = [
  "Outpost",
  "Research Lab",
  "Derrick",
  "Machine Shop",
  "Power Station",
  "Repair Bay",
  "Guard Tower",
  "Cannon Tower",
  "Missile Battery",

  "Clanhall",
  "Alchemy Hall",
  "Beast Enclosure",
  "Blacksmith",
  "Menagerie",
  "Machinegun Nest",
  "GrapeShot Cannon",
  "Rotary Cannon",
];

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
  size: 76,
  faction: 80,
  unk1: 84,
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

module.exports = {
  infantryNames,
  unitNames,
  buildingNames,
  UNIT_ATTRIBUTES_OFFSETS,
  TURRET_ATTRIBUTES_OFFSETS,
  PROJECTILE_ATTRIBUTES_OFFSETS,
};
