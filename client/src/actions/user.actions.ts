'use server'

import { PaginatedUsers, UserFilter, User } from "@/@types/user"
import api from "@/lib/axios.server"

export const getUsers = async (filters?: UserFilter) => {
  const { data } = await api.get<PaginatedUsers>('/users', { params: {...filters} })
  return data
}

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`)
  return data
}

export const createUser = async (user: User): Promise<User> => {
  const { data } = await api.post<User>('/users', user)
  return data
}

export const updateUser = async (id: string, user: User): Promise<User> => {
  const { data } = await api.put<User>(`/users/${id}`, user)
  return data
}

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`)
}