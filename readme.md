# About

This project is a couple of node scripts to extract and modify KKNX xtreme game executable information about missions and units.

It's based on the [script](https://discord.com/channels/303959211749146645/723453780800176208/988718875040419860) shared on OpenKrush Discord by [IceReaper](https://github.com/IceReaper) to edit the game using 010 editor.

# How it works

The `extract` script simply read the .exe and extract 2 JSON files:

```
missions.json
units.json
```

With these files you can inspect and modify game information.

## Modifying

The `modify` script is still in progress, but it already copy and modifies the `game.exe` into a `game_modified.exe`.

Inside of it, there's a function called `modifyUnit`, it will modify the unit information based on the offset of the information specified.

You need units.json to be extracted before you modify things.
There are memory offset attributes for `unit`, `turret` and `projectile` informations at the beginning of the file like `cost`, `speed`, `fireSpeed` and `buildTime`.

Suppose you want to modify Anaconda Tank, you will find the unit by its name and change whatever you want in the unit's attributes, turret's or projectile's attributes:

```
// Find inside units by name
const anaconda = units.find((u) => u.name === "Anaconda Tank");

modifyUnit(anaconda, 1, "cost");
modifyUnit(anaconda, 240, "speed");
modifyUnit(anaconda, 180, "fireSpeed");
modifyUnit(anaconda, 1, "buildTime"); // 1 second

//Modify turret
modifyTurret(anaconda.turret, 30, "fireSpeed");
modifyTurret(anaconda.turret, 30, "reloadTime");

//Modify projectile
modifyProjectile(anaconda.turret.projectile, 10, "speed");
```

Note: I'm not sure what unit are those integer values like speed, fireSpeed and reloadTime, the only we know is cost which is oil number and build time in seconds.

## Running

Update `extract.js` file variable:

```
const FILE_PATH = "game.exe"; // Path to the game EXE
```

Then, just run in terminal:

```
node extract.js
```

Or:

```
node modify.js
```

Tested with node v20.
