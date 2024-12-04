"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_1 = require("sequelize");
const envKeys_1 = require("./envKeys");
const envKeys_2 = require("./envKeys");
const envKeys_3 = require("./envKeys");
const envKeys_4 = require("./envKeys");
const envKeys_5 = require("./envKeys");
exports.database = new sequelize_1.Sequelize(envKeys_1.DB_NAME, envKeys_2.DB_USERNAME, envKeys_3.DB_PASSWORD, {
    host: envKeys_4.DB_HOST,
    port: envKeys_5.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        encrypt: true
    },
});
