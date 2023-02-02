import { useQuery } from '@apollo/client'
import {
  GetUserQuery,
  GetUserIdsQuery,
  GetUsersNameQuery,
} from '~/models/client'
import { fetcherSSG } from '~/repositories/server'

type UserWorksReturn = {
  data?: any
  loading?: any
  error?: any
}

export async function GetUserServer(id: string): Promise<GetUserQuery> {
  const sdk = await fetcherSSG()
  const user = await sdk.GetUser({ id: id })
  return user
}

export async function GetUserIdsServer(limit: number, offset: number): Promise<GetUserIdsQuery> {
  const sdk = await fetcherSSG()
  const users = await sdk.GetUserIds({ limit: limit, offset: offset })
  return users
}

export async function GetUsersNameServer(): Promise<GetUsersNameQuery> {
  const sdk = await fetcherSSG()
  const users = await sdk.GetUsersName({ limit: 10, offset: 0 })
  return users
}
