import { Request, Response } from "express";
import { getByemail } from "../model/user";

export  function show_login(req: Request, res: Response) {
    res.render('login', {
        message: null
});
}

export async function register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.render('login', {
            message: {
                type: 'error',
                value: 'Preencha corretamente os dados!',
                title: 'dados invalídos'
            }
        });
    }
    
    const userFounded = await getByemail(email);

    if (userFounded) {
        return res.render('login', {
            message: {
                type: 'error',
                 value: 'E-mail já cadastrado',
                title: 'dados invalídos'
            }
        });
    }

    const user: User={
        name,
        email,
        password,
    role:UserRole.USER
    };

    await insert (user)
     res.render('login', {
         message: {
                type: 'sucess',
                 value: 'usuário cadastrado com sucesso',
                title: 'Sucesso'
         }
     });
}