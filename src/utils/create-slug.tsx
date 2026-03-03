export function createSlug(username: string): string {
    return username
      .normalize('NFD') // Separa os acentos das letras
      .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
      .toLowerCase() // Tudo para minúsculo primeiro
      .trim() // Remove espaços do começo e do fim ANTES de virar hífen
      .replace(/[^a-z0-9\s-]/g, '') // Remove tudo que NÃO (^) for letra(a-z), número(0-9), espaço ou hífen
      .replace(/\s+/g, '-') // Troca um ou mais espaços por um único hífen
      .replace(/-+/g, '-') // Previne hífens duplos (ex: --)
      .replace(/^-+|-+$/g, ''); // Limpa se sobrou algum hífen no começo ou no fim da string
}