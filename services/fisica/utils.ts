import { format } from "date-fns";

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

export function validaTamanhoRg(rg: string): boolean {
    return rg.length === 12 ? true : false;
}

export function validaEmail(email: string): boolean {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    return true && email.length >= 6;
}

export function formataTelefone(telefone: string): string {
    const cleaned = telefone.replace(/\D/g, '');
    let codigoArea = cleaned.slice(0, 2);
    let corpo = cleaned.slice(2);
    let formattedTelefone = `(${codigoArea}) `;

    if (corpo.length > 5) {
        formattedTelefone += `${corpo.slice(0, 5)}-${corpo.slice(5, 9)}`;
    } else {
        formattedTelefone += `${corpo.slice(0, 4)}-${corpo.slice(4, 8)}`;
    }
    return formattedTelefone;

}

export function validaTamanhoTelefone(telefone: string): boolean {
    return telefone.length >= 13 ? true : false; 
}
  
export function validarCPF(cpf: string): boolean {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}
  
export function validarDataNascimento(dataStr: string): boolean {
    const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const dataFormat = format(new Date(dataStr),"dd/MM/yyyy");
    const match = dataFormat.match(regexData);
    
    if (!match) {
        return false;
    }
    
    const dia = parseInt(match[1]);
    const mes = parseInt(match[2]) - 1; 
    const ano = parseInt(match[3]);

    const data = new Date(ano, mes, dia);
    
    if (isNaN(data.getTime())) {
        return false; // Data inválida
    }

    const anoAtual = new Date().getFullYear();
    const idadeMaxima = 120; 
    const anoMinimo = anoAtual - idadeMaxima;

    if (ano < anoMinimo || ano > anoAtual) {
        return false; 
    }
    
    return true; 
}