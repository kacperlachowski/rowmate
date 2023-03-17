import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  schema: `http://${process.env.API_URL}`,
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/api/gql/': {
      preset: 'client',
    },
  },
};
export default config;
