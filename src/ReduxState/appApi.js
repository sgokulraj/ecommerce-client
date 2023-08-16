import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://periwinkle-sea-lion-gear.cyclic.app" }),
    endpoints: (builder) => ({

        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user
            }),
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: 'POST',
                body: user
            })
        }),

        productCreation: builder.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product
            })
        }),

        productEdit: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PATCH",
                body: product
            })
        }),

        productDeletion: builder.mutation({
            query: ({ productId, userId }) => ({
                url: `/products/${productId}`,
                method: "DELETE",
                body: { userId }
            })
        }),

        //add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/addToCart",
                method: "POST",
                body: cartInfo
            })
        }),

        //Remove from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/removeFromCart",
                method: "POST",
                body
            })
        }),

        //increase cart
        increaseCart: builder.mutation({
            query: (body) => ({
                url: "/products/increaseCart",
                method: "POST",
                body
            })
        }),

        //dECREASE CART
        decreaseCart: builder.mutation({
            query: (body) => ({
                url: "/products/decreaseCart",
                method: "POST",
                body
            })
        }),

        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body
            })
        }),

        update: builder.mutation({
            query:(user) => ({
                url: `/users/${user.userId}/profile`,
                method: "PATCH",
                body: user
            })
        }),
       

    })
})


export const { useSignupMutation, useLoginMutation, useProductCreationMutation, useProductEditMutation, useProductDeletionMutation, useAddToCartMutation, useRemoveFromCartMutation, useIncreaseCartMutation, useDecreaseCartMutation, useCreateOrderMutation , useUpdateMutation} = appApi

export default appApi 