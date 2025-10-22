import { connection } from "../infra/connection";

export type User = {
    id?: number,
    name: string,
    email: string,
    password: string,
    role: UserRole,
    created_at?: string
};

export async function insert(user: User) { 
    await connection.query('INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4);',

    )
    
}

export async function getByemail(email: string) {
    const { rows } = await connection.query('SELECT * FROM users where email = $1',
        [email]);
    return rows[0];    
}