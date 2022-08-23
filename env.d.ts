declare namespace NodeJS {
  export interface ProcessEnv {
    ARTICLE_NODE_ENV: 'development' | 'production';
    ARTICLE_PORT?: string;
    ARTICLE_MONGO_URI: string;
    ARTICLE_JWT_SECRET_KEY: string;
    ARTICLE_JWT_EXPIRE: string;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
