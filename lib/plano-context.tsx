'use client'
import { createContext, useContext } from 'react'

export interface PlanoCtx {
  plano:      string
  postsHoje:  number
  maxPosts:   number
  maxSlides:  number
  temLogo:    boolean
}

export const LIMITES: Record<string, { maxPosts: number; maxSlides: number; temLogo: boolean }> = {
  free:      { maxPosts: 1,  maxSlides: 4,  temLogo: false },
  starter:   { maxPosts: 1,  maxSlides: 5,  temLogo: false },
  pro:       { maxPosts: 2,  maxSlides: 10, temLogo: true  },
  ilimitado: { maxPosts: 999, maxSlides: 10, temLogo: true  },
}

export const PlanoContext = createContext<PlanoCtx>({
  plano: 'free', postsHoje: 0, maxPosts: 1, maxSlides: 4, temLogo: false,
})

export function usePlano() { return useContext(PlanoContext) }
