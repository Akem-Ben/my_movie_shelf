import { Transaction, Sequelize } from "sequelize";
import { database } from "../../configurations/database"; // Update with your Sequelize instance import

const performTransaction = async (
    operations: ((transaction: Transaction) => Promise<void>)[]
  ) => {
    const sequelize: Sequelize = database; // Your Sequelize instance
  
    const transaction = await sequelize.transaction();
  
    try {
      for (const operation of operations) {
        await operation(transaction); // Pass the transaction to each operation
      }
  
      await transaction.commit();
      console.log("Transaction committed successfully");
    } catch (error: any) {
      await transaction.rollback();
      console.error("Transaction aborted due to an error:", error);
      throw new Error(`Transaction failed: ${error.message}`);
    }
  };
  
  export default {
    performTransaction,
  };
  