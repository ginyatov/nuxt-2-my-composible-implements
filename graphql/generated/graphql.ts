// THIS FILE IS GENERATED, DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  products: Array<Product>;
  total: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type CreateTodoInput = {
  author: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: Todo;
  deleteProduct: Product;
  deleteTodo: Todo;
  updateProduct: Product;
  updateTodo: Todo;
};


export type MutationAddTodoArgs = {
  input: CreateTodoInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};

export type Product = {
  __typename?: 'Product';
  article: Scalars['Int']['output'];
  discount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  oldPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  books: Array<Maybe<Book>>;
  cart: Array<Maybe<Cart>>;
  productById: Product;
  products: Array<Product>;
  todos: Array<Todo>;
};


export type QueryProductByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTodosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Todo = {
  __typename?: 'Todo';
  author: Scalars['String']['output'];
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UpdateTodoInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ProductBaseFragment = { __typename?: 'Product', title: string, id: string, article: number, discount?: number | null, image: string, oldPrice?: number | null, price: number };

export type TodoFragmentFragment = { __typename?: 'Todo', id: string, author: string, createdAt: string, title: string, updatedAt: string, completed: boolean };

export type AddTodoMutationVariables = Exact<{
  input: CreateTodoInput;
}>;


export type AddTodoMutation = { __typename?: 'Mutation', addTodo: { __typename?: 'Todo', id: string, author: string, createdAt: string, title: string, updatedAt: string, completed: boolean } };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: { __typename?: 'Todo', id: string, author: string, createdAt: string, title: string, updatedAt: string, completed: boolean } };

export type UpdateTodoMutationVariables = Exact<{
  input: UpdateTodoInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string, author: string, createdAt: string, title: string, updatedAt: string, completed: boolean } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', title: string, id: string, article: number, discount?: number | null, image: string, oldPrice?: number | null, price: number }> };

export type GetTodosQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, author: string, createdAt: string, title: string, updatedAt: string, completed: boolean }> };

export const ProductBaseFragmentDoc = gql`
    fragment ProductBase on Product {
  title
  id
  article
  discount
  image
  oldPrice
  price
}
    `;
export const TodoFragmentFragmentDoc = gql`
    fragment TodoFragment on Todo {
  id
  author
  createdAt
  title
  updatedAt
  completed
}
    `;
export const AddTodoDocument = gql`
    mutation AddTodo($input: CreateTodoInput!) {
  addTodo(input: $input) {
    ...TodoFragment
  }
}
    ${TodoFragmentFragmentDoc}`;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    ...TodoFragment
  }
}
    ${TodoFragmentFragmentDoc}`;
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    ...TodoFragment
  }
}
    ${TodoFragmentFragmentDoc}`;
export const GetProductsDocument = gql`
    query GetProducts {
  products {
    ...ProductBase
  }
}
    ${ProductBaseFragmentDoc}`;
export const GetTodosDocument = gql`
    query GetTodos($limit: Int) {
  todos(limit: $limit) {
    ...TodoFragment
  }
}
    ${TodoFragmentFragmentDoc}`;