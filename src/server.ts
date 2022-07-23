import express, { json, request, response } from "express";

const app = express();
app.use(express.json());

const users = [];
const emprestimo = [];

//Reflexao
//Será que esse método tem muita responsabilidade ?
//Será que é válido quebrar em classes ?
app.post("/user", (request, response) => {
  const { name, cpf, age, uf, renda_mensal } = request.body;

  const userAlreayExists = users.some((users) => users.cpf === cpf);

  if(userAlreayExists) {
    return response.status(400).json({error: "User already exists!"})
  }

  //Dica
  //O Cliente pode ter mais de uma empréstimo disponível para usar
  //Será que ao dar o return eu passo nas demais condições para saber se ele é elegivel ?
  //Isso serve para todos os condicionais.
  if(renda_mensal <= 3000 ) {
    users.push({
      name,cpf,age,uf,renda_mensal,
      //Será que vale renomear a variavel emprestimo para representar melhor qual tipo de empréstimo estamos adicionando ?
      emprestimo: [emprestimo]
    });
    
    const emprestimo =[
    "EMPRESTIMO COM GARANTIA", 
    "Taxa: 4%",
  ]
    return response.json(users);
  }

  if(renda_mensal > 3000 && uf === "SP") {
    users.push({
      name,cpf,age,uf,renda_mensal,
      emprestimo: [emprestimo]
    });
    const emprestimo =[
    "EMPRESTIMO COM GARANTIA", 
    "Taxa: 4%",
  ]
    return response.json(users);
  }

  if(renda_mensal > 5000 && uf === "SP" && age < 30) {
    users.push({
      name,cpf,age,uf,renda_mensal,
      emprestimo: [emprestimo]
    });
    const emprestimo =[
    "EMPRESTIMO COM GARANTIA", 
    "Taxa: 4%",
  ]
    return response.json(users);
  }

  if(renda_mensal > 5000) {
    const emprestimo =["EMPRESTIMO Consignado", "Taxa: 2%" ]
    users.push({name,cpf,age,uf,renda_mensal, emprestimo: [emprestimo]});
    return response.json(users);
  }

  else {
    return response.json({ error:"Valor não definido!" });
  }

});

app.listen(3333, () => console.log("Server is running!"));
