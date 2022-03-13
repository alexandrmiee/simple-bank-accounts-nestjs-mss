// @ts-check
const { ConfigUtils } = require('./src/config/config.utils');

// TypeORM CLI expects a promise to be returned directly from the config file.
module.exports = (async () => {
  const appConfig = await ConfigUtils.getAppConfig();

  console.group({
    ...appConfig.db,
    ...appConfig.typeOrmForMigration,
  });
  return {
    ...appConfig.db,
    ...appConfig.typeOrmForMigration,
  };
})();
