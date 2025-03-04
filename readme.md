This project is couple of node scripts to extract and modify KKNX xtreme game executable information about missions and units.

It's based on the [script](https://discord.com/channels/303959211749146645/723453780800176208/988718875040419860) shared on OpenKrush Discord by [IceReaper](https://github.com/IceReaper) to edit the game using 010 editor.

The `extract` script simply read the .exe and extract 3 JSON files:

```
missions.json
units.json
```

With these files you can inspect and modify game information.

### WIP, modify:

The `modify` script is still in progress, but it already copy and modifies the game.exe into a game_modified.exe.
Inside of it, there's a function called `modify`, it will modify the unit information based on the offset of that info, right I hardcoded some information like `cost`, `speed`, `fireSpeed` and `buildTime`:

```
// 8 = Dirt Bike unit on units.json, search for unit name to know their index
const unit = units[8];

modify(fd, 1, 12); //cost offset = 12
modify(fd, 240, 20); //speed offset = 20
modify(fd, 180, 24); //fireSpeed offset = 24
modify(fd, 1, 96); //buildTime offset = 96
```

The offset of each information is inside the `extract.js` script, I will improve more later.

# How to run

Modify the extract.js file variable:

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
