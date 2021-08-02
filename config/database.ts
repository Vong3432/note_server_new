/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Application from '@ioc:Adonis/Core/Application';
import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import Url from 'url-parse';

const CLEARDB_DATABASE_URL = new Url(Env.get('CLEARDB_DATABASE_URL'))
const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql
    |
    */
    mysql: {
      client: 'mysql',
      connection: {
        host: Application.inProduction ? CLEARDB_DATABASE_URL.host : Env.get('MYSQL_HOST'),
        port: Application.inProduction ? Number('') : Env.get('MYSQL_PORT', ""),
        user: Application.inProduction ? CLEARDB_DATABASE_URL.username : Env.get('MYSQL_USER'),
        password: Application.inProduction ? CLEARDB_DATABASE_URL.password : Env.get('MYSQL_PASSWORD'),
        database: Application.inProduction ? CLEARDB_DATABASE_URL.pathname.substr(1) : Env.get('MYSQL_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },

  }
}

export default databaseConfig
