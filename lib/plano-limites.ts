// Arquivo sem 'use client' — pode ser importado no servidor
export const LIMITES: Record<string, {
  maxPosts: number
  maxSlides: number
  temLogo: boolean
  temHistorico: boolean
  temSugestoes: boolean
}> = {
  free:      { maxPosts: 1,   maxSlides: 1,  temLogo: false, temHistorico: false, temSugestoes: false },
  starter:   { maxPosts: 1,   maxSlides: 5,  temLogo: false, temHistorico: true,  temSugestoes: false },
  pro:       { maxPosts: 2,   maxSlides: 10, temLogo: true,  temHistorico: true,  temSugestoes: true  },
  ilimitado: { maxPosts: 999, maxSlides: 10, temLogo: true,  temHistorico: true,  temSugestoes: true  },
}
