// Componente interno — não é rota, só exporta estilos e nav reutilizáveis
export const blogStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Sora',sans-serif;background:#080B12;color:#F0F4FF;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  a{color:inherit;text-decoration:none}
  @media(max-width:768px){.blog-content{padding:0 1.25rem !important}.blog-hero{padding:100px 5% 3rem !important}}
`
