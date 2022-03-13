# Installation

- update `.env.a` files in `packages/*`
- run `npm ci`
- run `npm run bootstrap`
- run `npm run build`

> Note. Node@16 was used

# Starting dev servers

### Manually

- install postgres, zookeeper, kafka
- create `accounts` table in postgres db
- update `env.a` files
- run `npm ci`
- run `npm run bootstrap`
- run `npm run build `
- to seed accounts data run `npm run db:reset:a` in `packages/accounts`
- run `npm run dev `
- open `http://localhost:${APP_PORT}/graphql`

### Docker compose

- run `npm ci`
- run `npm run bootstrap`
- run `npm run build`
- `docker-compose up`

> Note. If you have previously started postgres volumes, you should run `docker-compose down --volumes` before start or create database `accounts` manually

# Architecture

## Structure

```
Client *-> API Gateway #-> Accounts MS
                       $-> Processing MS #-> Commission MS
                                         #-> Converter MS
                                         #-> Accounts MS

*-> Graphql API, Motivation: reduce sended data, self-documented
#-> GRPC API, Motivation: fast, protobuf
$-> Kafka, Motivation: increase RPS, rollback
```

## Graphql API

playground `http://localhost:${APP_PORT}/graphql`

### List of accounts

```gql
{
  accounts {
    items {
      id
      balance {
        amount
        currency
      }
    }
  }
}
```

### Get account

```gql
{
  account(id: "15a66b90-9475-4f59-8a99-7b27a5167f9f") {
    id
    withOverdraft
    balance {
      amount
      currency
    }
  }
}
```

### Create account

```gql
mutation {
  createAccount(currency: "USD") {
    id
  }
}
```

### Delete (soft) account

```gql
mutation {
  deleteAccount(id: "fe532ba0-3a8d-4144-9952-30252dfa97aa") {
    id
  }
}
```

### Update account

```gql
mutation {
  updateAccount(
    id: "119e8c75-35bd-45d7-bc2e-e40ced69fdad"
    withOverdraft: true
  ) {
    id
    withOverdraft
    balance {
      currency
      amount
    }
  }
}
```

### Transfer (p2p)

```gql
mutation {
  makeTransfer(
    type: "p2p"
    amount: 10
    currency: "EUR"
    fromAccountId: "15a66b90-9475-4f59-8a99-7b27a5167f9f"
    toAccountId: "f812dc02-edcb-4a7a-9bfd-9361cdfbff8c"
  ) {
    id
    status
  }
}
```

## GRPC API

see `packages/common/src/api/*.proto` files

# Testing

In progress ...
