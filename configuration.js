const fs = require("fs");

const {
  UNIT_ATTRIBUTES_OFFSETS,
  TURRET_ATTRIBUTES_OFFSETS,
  PROJECTILE_ATTRIBUTES_OFFSETS,
} = require("./constants");

class Modificator {
  fd;

  constructor(originalFile, modifiedFile) {
    this.openFile(originalFile, modifiedFile);
  }

  openFile = (originalFile, modifiedFile) => {
    // Copy the original .exe to a new file
    fs.copyFileSync(originalFile, modifiedFile);
    console.log(`Copied ${originalFile} to ${modifiedFile}`);

    // Open the copied file for modification
    this.fd = fs.openSync(modifiedFile, "r+");
  };

  closeFile = () => {
    // Close the file
    fs.closeSync(this.fd);
    console.log(`Modifications saved to ${modifiedFile}`);
  };

  modify = (modified, newValue, offset, objectAttrOffset) => {
    if (!modified || !objectAttrOffset[offset]) {
      console.log(`modified: ${modified}`);
      console.warn(
        `Offset ${offset} not found on objectAttrOffset: ${JSON.stringify(
          objectAttrOffset
        )}`
      );
      return false;
    }
    console.log(`Changing ${modified.name} ${offset} From: ${modified[offset]} To: ${newValue}`);
    const buffer = Buffer.alloc(4);
    buffer.writeUInt32LE(newValue, 0);
    fs.writeSync(
      this.fd,
      buffer,
      0,
      buffer.length,
      modified.offset + objectAttrOffset[offset]
    );
  };

  modifyUnit = (unit, newValue, offset) =>
    this.modify(unit, newValue, offset, UNIT_ATTRIBUTES_OFFSETS);

  modifyTurret = (turret, newValue, offset) =>
    this.modify(turret, newValue, offset, TURRET_ATTRIBUTES_OFFSETS);

  modifyProjectile = (projectile, newValue, offset) =>
    this.modify(projectile, newValue, offset, PROJECTILE_ATTRIBUTES_OFFSETS);
}

module.exports = {
  Modificator,
};
