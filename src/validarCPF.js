
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ""); // Remove tudo que não for número

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false; // CPF com 11 dígitos iguais ou fora do padrão
    }

    let soma = 0;
    let resto;

    // Valida 1º dígito
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Valida 2º dígito
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

export default validarCPF