/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateTable($name: String!, $description: String) {\n    createTable(name: $name, description: $description) {\n      id\n    }\n  }\n": types.CreateTableDocument,
    "\n  mutation DeleteTable($id: String!) {\n    deleteTable(id: $id)\n  }\n": types.DeleteTableDocument,
    "\n  mutation Mutation($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      user {\n        id\n        username\n      }\n      token\n    }\n  }\n": types.MutationDocument,
    "\n  mutation UpdateTable($id: String!, $name: String, $description: String) {\n    updateTable(id: $id, name: $name, description: $description) {\n      id\n    }\n  }\n": types.UpdateTableDocument,
    "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n": types.MeDocument,
    "\n  query Table {\n    tables {\n      id\n      name\n      description\n    }\n  }\n": types.TableDocument,
    "\n  subscription AddedTable {\n    addedTable {\n      id\n      name\n      description\n    }\n  }\n": types.AddedTableDocument,
    "\n  subscription DeletedTable {\n    deletedTable\n  }\n": types.DeletedTableDocument,
    "\n  subscription UpdatedTable {\n    updatedTable {\n      id\n      name\n      description\n    }\n  }\n": types.UpdatedTableDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTable($name: String!, $description: String) {\n    createTable(name: $name, description: $description) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTable($name: String!, $description: String) {\n    createTable(name: $name, description: $description) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTable($id: String!) {\n    deleteTable(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteTable($id: String!) {\n    deleteTable(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Mutation($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      user {\n        id\n        username\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      user {\n        id\n        username\n      }\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTable($id: String!, $name: String, $description: String) {\n    updateTable(id: $id, name: $name, description: $description) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTable($id: String!, $name: String, $description: String) {\n    updateTable(id: $id, name: $name, description: $description) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Table {\n    tables {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query Table {\n    tables {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription AddedTable {\n    addedTable {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  subscription AddedTable {\n    addedTable {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription DeletedTable {\n    deletedTable\n  }\n"): (typeof documents)["\n  subscription DeletedTable {\n    deletedTable\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription UpdatedTable {\n    updatedTable {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  subscription UpdatedTable {\n    updatedTable {\n      id\n      name\n      description\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;