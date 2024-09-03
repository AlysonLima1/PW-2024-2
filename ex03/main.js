function transformarEmJSON() {
    const Matricula = document.getElementById('Matricula').value.trim();
    const Nome = document.getElementById('Nome').value.trim();
    const Idade = document.getElementById('Idade').value.trim();
    const CPF = document.getElementById('CPF').value.trim();
    
    if (!Matricula || !Nome || !Idade || !CPF) {
        alert('Todos os campos devem ser preenchidos!');
        return;
    }
    
    const IdadeInt = parseInt(Idade, 10);
    if (isNaN(IdadeInt) || IdadeInt.toString() !== Idade) {
        alert('A idade deve ser um número inteiro!');
        return;
    }
    const aluno = {
        Matricula: Matricula,
        Nome: Nome,
        Idade: IdadeInt,
        CPF: CPF
    };
    const resultado = document.getElementById('resultado');
    resultado.textContent = JSON.stringify(aluno, null, 4);
}