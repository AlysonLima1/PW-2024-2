document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('transformar').addEventListener('click', function() {
        const Matricula = document.getElementById('Matricula').value.trim();
        const Nome = document.getElementById('Nome').value.trim();
        const Idade = document.getElementById('Idade').value.trim();
        const CPF = document.getElementById('CPF').value.trim();
        if (!Matricula || !Nome || !Idade || !CPF) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        const IdadeNum = parseInt(Idade, 10);
        if (isNaN(IdadeNum) || IdadeNum <= 0) {
            alert('A idade deve ser um valor inteiro positivo.');
            return;
        }
        const aluno = {
            Matricula: Matricula,
            Nome: Nome,
            Idade: IdadeNum,
            CPF: CPF
        };
        const alunoJSON = JSON.stringify(aluno, null, 2);

        document.getElementById('resultado').textContent = alunoJSON;
    });
});