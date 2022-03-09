import { Connection, createConnection } from 'typeorm';

export class DBConnector {
  private static connection: Connection;

  public static async getConnection(): Promise<Connection> {
    if (!DBConnector.connection) {
      DBConnector.connection = await createConnection();
    }
    return DBConnector.connection;
  }
}
