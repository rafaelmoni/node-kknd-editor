const { infantryNames, unitNames, buildingNames } = require("./constants");
const units = require("./units_game.json");

// Reveal entire map
const revealMap = (modifier) => {
  const { modifyUnit } = modifier;
  const unit2 = units.find((u) => u.name === "Outpost");
  modifyUnit(unit2, 4096, "viewRange");
};

// Change Anaconda and Barrage Craft Turrets and Projectile
const changeProjectileSpeed = (modifier) => {
  const { modifyUnit, modifyTurret, modifyProjectile } = modifier;
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
};

// Swap Anaconda's Turret with Barrage Craft Turret
const swapBarrageTank = (modifier) => {
  const { modifyUnit } = modifier;
  const anaconda = units.find((u) => u.name === "Anaconda Tank");
  const barrage = units.find((u) => u.name === "Barrage Craft");

  modifyUnit(anaconda, barrage.turretOffset, "turret");
  modifyUnit(anaconda, barrage.projectileOffset, "projectile");
};

// Reduce autocannon tank and missile crab size
const reduceAutoTankAndCrabSize = (modifier) => {
  const { modifyUnit } = modifier;
  const unit = units.find((u) => u.name === "Autocannon Tank");
  modifyUnit(unit, 1, "cost");
  modifyUnit(unit, 1, "buildTime");
  modifyUnit(unit, 128, "size");

  const crab = units.find((u) => u.name === "Missile Crab");
  modifyUnit(crab, 1, "cost");
  modifyUnit(crab, 1, "buildTime");
  modifyUnit(crab, 128, "size");
};

// Increase gamespeed 30% faster
const increaseGameSpeed30 = (modifier) => {
  const { modifyUnit, modifyTurret, modifyProjectile } = modifier;
  units
    .filter((u) =>
      [...infantryNames, ...unitNames, ...buildingNames].includes(u.name)
    )
    .forEach((unit) => {
      const { speed, fireSpeed, rotateSpeed, buildTime, turret, projectile } =
        unit;
      const factorIncrease = 4 / 3;
      const factorDecrease = 2 / 3;

      if (speed > 0)
        modifyUnit(unit, Math.floor(speed * factorIncrease), "speed");
      if (fireSpeed > 0)
        modifyUnit(unit, Math.floor(fireSpeed * factorDecrease), "fireSpeed");
      if (rotateSpeed > 0)
        modifyUnit(
          unit,
          Math.floor(rotateSpeed * factorIncrease),
          "rotateSpeed"
        );

      modifyUnit(unit, Math.ceil(buildTime * factorDecrease), "buildTime");

      if (projectile && projectile.speed > 0) {
        const { speed: projectileSpeed } = projectile;
        modifyProjectile(
          unit.projectile,
          Math.floor(projectileSpeed * factorIncrease),
          "speed"
        );
      }

      if (turret) {
        const { fireSpeed: turretFireSpeed, reloadTime: turretReloadTime } =
          turret;
        if (turretFireSpeed > 0)
          modifyTurret(
            turret,
            Math.ceil(turretFireSpeed * factorDecrease),
            "fireSpeed"
          );
        if (turretReloadTime > 0)
          modifyTurret(
            turret,
            Math.ceil(turretReloadTime * factorDecrease),
            "reloadTime"
          );

        if (turret.projectile) {
          const { speed: turretProjectileSpeed } = turret.projectile;
          if (turretProjectileSpeed > 0)
            modifyProjectile(
              turret.projectile,
              Math.floor(turretProjectileSpeed * factorIncrease),
              "speed"
            );
        }
      }

      // For debugging
      modifyUnit(unit, 4096, "viewRange");
      /*
      modifyUnit(unit, 1, "cost");
      modifyUnit(unit, 1, "buildTime");
      */
    });
};

// Increase gamespeed 5% faster
const increaseGameSpeed50 = (modifier) => {
  const { modifyUnit, modifyTurret, modifyProjectile } = modifier;
  units
    .filter((u) =>
      [...infantryNames, ...unitNames, ...buildingNames].includes(u.name)
    )
    .forEach((unit) => {
      const { speed, fireSpeed, rotateSpeed, buildTime, turret, projectile } =
        unit;
      const factorIncrease = 2;
      const factorDecrease = 1 / 2;

      if (speed > 0)
        modifyUnit(unit, Math.floor(speed * factorIncrease), "speed");
      if (fireSpeed > 0)
        modifyUnit(unit, Math.floor(fireSpeed * factorDecrease), "fireSpeed");
      if (rotateSpeed > 0)
        modifyUnit(
          unit,
          Math.floor(rotateSpeed * factorIncrease),
          "rotateSpeed"
        );

      modifyUnit(unit, Math.ceil(buildTime * factorDecrease), "buildTime");

      if (projectile && projectile.speed > 0) {
        const { speed: projectileSpeed } = projectile;
        modifyProjectile(
          {
            ...unit.projectile,
            name: `${unit.name} Projectile`,
          },
          Math.floor(projectileSpeed * factorIncrease),
          "speed"
        );
      }

      if (turret) {
        const { fireSpeed: turretFireSpeed, reloadTime: turretReloadTime } =
          turret;
        if (turretFireSpeed > 0)
          modifyTurret(
            {
              ...turret,
              name: `${unit.name} Turret`,
            },
            Math.ceil(turretFireSpeed * factorDecrease),
            "fireSpeed"
          );
        if (turretReloadTime > 0)
          modifyTurret(
            {
              ...turret,
              name: `${unit.name} Turret`,
            },
            Math.ceil(turretReloadTime * factorDecrease),
            "reloadTime"
          );

        if (turret.projectile) {
          const { speed: turretProjectileSpeed } = turret.projectile;
          if (turretProjectileSpeed > 0)
            modifyProjectile(
              {
                ...turret.projectile,
                name: `${unit.name} Turret Projectile`,
              },
              Math.floor(turretProjectileSpeed * factorIncrease),
              "speed"
            );
        }
      }

      // For debugging/show entire map
      modifyUnit(unit, 4096, "viewRange");
      /*
      modifyUnit(unit, 1, "cost");
      modifyUnit(unit, 1, "buildTime");
      */
    });
};

module.exports = {
  revealMap,
  changeProjectileSpeed,
  swapBarrageTank,
  reduceAutoTankAndCrabSize,
  increaseGameSpeed30,
  increaseGameSpeed50,
};
