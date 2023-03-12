/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Column = {
  __typename?: 'Column';
  _id: Scalars['String'];
  name: Scalars['String'];
  table: Table;
};

export enum ColumnType {
  BooleanColumn = 'BOOLEAN_COLUMN',
  NumberColumn = 'NUMBER_COLUMN',
  StringColumn = 'STRING_COLUMN'
}

export type Mutation = {
  __typename?: 'Mutation';
  createColumn?: Maybe<Column>;
  createRow?: Maybe<Row>;
  createTable?: Maybe<Table>;
  deleteColumn?: Maybe<Scalars['String']>;
  deleteRow?: Maybe<Scalars['String']>;
  deleteTable?: Maybe<Scalars['String']>;
  login: AuthResponse;
  signup: AuthResponse;
  updateColumn?: Maybe<Column>;
  updateTable?: Maybe<Table>;
};


export type MutationCreateColumnArgs = {
  name: Scalars['String'];
  tableId: Scalars['String'];
  type: ColumnType;
};


export type MutationCreateRowArgs = {
  tableId: Scalars['String'];
  values: Scalars['String'];
};


export type MutationCreateTableArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationDeleteColumnArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRowArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTableArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSignupArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateColumnArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTableArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  column?: Maybe<Array<Maybe<Column>>>;
  me?: Maybe<User>;
  row?: Maybe<Array<Maybe<Row>>>;
  tables: Array<Maybe<Table>>;
};


export type QueryTablesArgs = {
  filters?: InputMaybe<TableFilters>;
};

export type Row = {
  __typename?: 'Row';
  _id: Scalars['String'];
  table: Table;
  values: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  addedColumn?: Maybe<Column>;
  addedRow?: Maybe<Row>;
  addedTable?: Maybe<Table>;
  deletedColumn?: Maybe<Scalars['Boolean']>;
  deletedRow?: Maybe<Scalars['Boolean']>;
  deletedTable?: Maybe<Scalars['Boolean']>;
};

export type Table = {
  __typename?: 'Table';
  _id: Scalars['String'];
  columns: Array<Maybe<Column>>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  rows: Array<Maybe<Row>>;
};

export type TableFilters = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type MutationMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type MutationMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token?: string | null, user?: { __typename?: 'User', id: string, username: string } | null } };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;