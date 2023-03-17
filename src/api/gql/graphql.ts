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
  id: Scalars['String'];
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
  column: Array<Maybe<Column>>;
  me?: Maybe<User>;
  row: Array<Maybe<Row>>;
  tableCount: Scalars['Int'];
  tables: Array<Maybe<Table>>;
};


export type QueryTableCountArgs = {
  filters?: InputMaybe<TableFilters>;
};


export type QueryTablesArgs = {
  filters?: InputMaybe<TableFilters>;
};

export type Row = {
  __typename?: 'Row';
  id: Scalars['String'];
  table: Table;
  values: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  addedColumn: Column;
  addedRow: Row;
  addedTable: Table;
  deletedColumn: Scalars['Boolean'];
  deletedRow: Scalars['Boolean'];
  deletedTable: Scalars['String'];
  updatedTable?: Maybe<Table>;
};

export type Table = {
  __typename?: 'Table';
  columns: Array<Maybe<Column>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  rows: Array<Maybe<Row>>;
};

export type TableFilters = {
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type CreateTableMutationVariables = Exact<{
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateTableMutation = { __typename?: 'Mutation', createTable?: { __typename?: 'Table', id: string } | null };

export type DeleteTableMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTableMutation = { __typename?: 'Mutation', deleteTable?: string | null };

export type MutationMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type MutationMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token?: string | null, user?: { __typename?: 'User', id: string, username: string } | null } };

export type UpdateTableMutationVariables = Exact<{
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
}>;


export type UpdateTableMutation = { __typename?: 'Mutation', updateTable?: { __typename?: 'Table', id: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string } | null };

export type TableQueryVariables = Exact<{ [key: string]: never; }>;


export type TableQuery = { __typename?: 'Query', tables: Array<{ __typename?: 'Table', id: string, name: string, description?: string | null } | null> };

export type AddedTableSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AddedTableSubscription = { __typename?: 'Subscription', addedTable: { __typename?: 'Table', id: string, name: string, description?: string | null } };

export type DeletedTableSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type DeletedTableSubscription = { __typename?: 'Subscription', deletedTable: string };

export type UpdatedTableSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdatedTableSubscription = { __typename?: 'Subscription', updatedTable?: { __typename?: 'Table', id: string, name: string, description?: string | null } | null };


export const CreateTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTableMutation, CreateTableMutationVariables>;
export const DeleteTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTableMutation, DeleteTableMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const UpdateTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTableMutation, UpdateTableMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const TableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Table"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tables"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<TableQuery, TableQueryVariables>;
export const AddedTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"AddedTable"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addedTable"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AddedTableSubscription, AddedTableSubscriptionVariables>;
export const DeletedTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"DeletedTable"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletedTable"}}]}}]} as unknown as DocumentNode<DeletedTableSubscription, DeletedTableSubscriptionVariables>;
export const UpdatedTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"UpdatedTable"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedTable"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdatedTableSubscription, UpdatedTableSubscriptionVariables>;