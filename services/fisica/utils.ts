export function formataCPF(cpf: string): string {
    if (!cpf) return '';
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
    return cpf;
  }

export function formataRG(rg: string): string {
    if (!rg) return '';
    rg = rg.replace(/\D/g, '');
    rg = rg.replace(/^(\d{0,2})/, '$1');
    rg = rg.replace(/^(\d{2})/, '$1.');
    rg = rg.replace(/^(\d{2}).(\d{0,3})/, '$1.$2');
    rg = rg.replace(/^(\d{2}).(\d{3})/, '$1.$2.');
    rg = rg.replace(/^(\d{2}).(\d{3}).(\d{0,3})/, '$1.$2.$3');
    rg = rg.replace(/^(\d{2}).(\d{3}).(\d{3})/, '$1.$2.$3-');
    return rg;
}

export function validaEmail(email: string): boolean {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    return true;
}

export function formataTelefone(telefone: string): string {
    const cleaned = telefone.replace(/\D/g, '');
    
    // Separa o número em código de área e corpo do telefone
    let codigoArea = cleaned.slice(0, 2);
    let corpo = cleaned.slice(2);
    
    // Formata o telefone conforme o padrão "(99) 99999-9999" ou "(99) 9999-9999"
    let formattedTelefone = `(${codigoArea}) `;
    
    // Adiciona o hífen se o corpo do telefone tiver mais de 5 dígitos
    if (corpo.length > 5) {
        formattedTelefone += `${corpo.slice(0, 5)}-${corpo.slice(5, 9)}`;
    } else {
        formattedTelefone += `${corpo.slice(0, 4)}-${corpo.slice(4, 8)}`;
    }
    
    return formattedTelefone;
    
}
  
  
  