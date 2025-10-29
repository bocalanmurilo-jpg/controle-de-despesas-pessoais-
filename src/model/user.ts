import { connection } from "../infra/connection";

export type User = {
    id_usuario?: number;
    nome: string;
    email: string;
    senha: string;
    data_criacao?: string;
};

export async function insert(user: User) { 
    await connection.query('INSERT INTO usuario(nome, email, senha) VALUES ($1, $2, $3 );',
        [
            user.nome,
            user.email,
            user.senha,
        ]
    )
    
};

export async function getByemail(email: string) {
    const { rows } = await connection.query('SELECT * FROM usuario where email = $1',
        [email]);
    return rows[0];    
};