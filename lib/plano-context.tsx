'use client'
import { createContext, useContext } from 'react'

export interface PlanoCtx {
  plano:         string
  postsHoje:     number
  maxPosts:      number
  maxSlides:     number
  temLogo:       boolean
  temHistorico:  boolean
  temSugestoes:  boolean
  pronto:        boolean
}

export { LIMITES } from '@/lib/plano-limites'

export const PlanoContext = createContext<PlanoCtx>({
  plano: 'free', postsHoje: 0, maxPosts: 1, maxSlides: 1,
  temLogo: false, temHistorico: false, temSugestoes: false,
  pronto: false,
})

export function usePlano() { return useContext(PlanoContext) }
