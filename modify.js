const fs = require("fs");

const units = require("./game_units.json");
const unit = units[8];

const originalFile = "game.exe"; // Original .exe file
const modifiedFile = "game_modified.exe"; // New file with changes

// Copy the original .exe to a new file
fs.copyFileSync(originalFile, modifiedFile);
console.log(`Copied ${originalFile} to ${modifiedFile}`);

// Open the copied file for modification
const fd = fs.openSync(modifiedFile, "r+");

const unitOffset = unit.offset; // Offset of the unit inside the .exe

const modify = (fd, newValue, offset) => {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(newValue, 0);
  fs.writeSync(fd, buffer, 0, buffer.length, unitOffset + offset);
};

modify(fd, 1, 12); //cost offset
modify(fd, 240, 20); //speed offset
modify(fd, 180, 24); //fireSpeed offset
modify(fd, 1, 96); //buildTime offset

/*
// Prepare buffer for writing (cost, health, speed, fireSpeed)
const buffer = Buffer.alloc(16);
buffer.writeUInt32LE(1, 0);
buffer.writeUInt32LE(unit.health, 4);
buffer.writeUInt32LE(160, 8);
buffer.writeUInt32LE(180, 12);

// Write changes to the copied .exe file
fs.writeSync(fd, buffer, 0, buffer.length, unitOffset + 12); // Cost at offset + 12
console.log("Modified cost in copied .exe");
*/

// Close the file
fs.closeSync(fd);
console.log(`Modifications saved to ${modifiedFile}`);
