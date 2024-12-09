"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../configurations/database");
const performTransaction = async (operations) => {
    const sequelize = database_1.database;
    const transaction = await sequelize.transaction();
    try {
        for (const operation of operations) {
            await operation(transaction);
        }
        await transaction.commit();
        console.log("Transaction committed successfully");
    }
    catch (error) {
        await transaction.rollback();
        console.error("Transaction aborted due to an error:", error);
        throw new Error(`Transaction failed: ${error.message}`);
    }
};
exports.default = {
    performTransaction,
};
