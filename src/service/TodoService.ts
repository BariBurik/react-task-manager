import {FetchBaseQueryMeta, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { ITodo } from "../models/ITodo"
import { formatDate } from "../utils/date"
import { IUser } from "../models/IUser"

let date = new Date()
const currentDate = formatDate(date)

export const todoAPI = createApi({
    reducerPath: "todoAPI",
    const API_URL =
    process.env.REACT_APP_API_URL ||
    'http://localhost:5000/';

    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    tagTypes: ['Todo'],
    endpoints: (build) => ({
        fetchAllTodos: build.query<ITodo[], IUser>({
            query: (user) => ({
                url: '/todos'
            }),
            transformResponse: (baseQueryReturnValue: ITodo[], meta: FetchBaseQueryMeta, user: IUser) => {
                return baseQueryReturnValue.filter(todo => todo.userId === user.id);
            },
            providesTags: result => ['Todo']
        }),
        createTodo: build.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        updateTodo: build.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTodo: build.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todo']
        })
    })
})