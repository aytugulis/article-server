declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    MONGO_URI: string;
    JWT_SECRET_KEY: string;
    JWT_EXPIRE: string;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
