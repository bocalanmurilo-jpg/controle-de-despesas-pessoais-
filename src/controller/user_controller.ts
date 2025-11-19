import { Request, Response } from "express";
import { getByemail, getByEmailAndSenha, insert, User } from "../model/user";

export  function show_login(req: Request, res: Response) {
    res.render('login', {
        message: null
});
}

export async function register(req: Request, res: Response) {
    const {  nome, email, senha } = req.body;

    if ( !nome || !email || !senha ) {
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
        nome,
        email,
        senha,
        
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
export async function login(req: Request, res: Response) {
    const {  email, senha } = req.body;

    if ( !email || !senha ) {
        return res.render('login', {
            message: {
                type: 'error',
                value: 'Preencha todos os campos corretamente !',
                title: 'dados invalídos'
            }
        });
    }

    const user = await getByEmailAndSenha(email, senha);

    if ( !user) {
        return res.render('login', {
            message: {
                type: 'error',
                value: 'e-mail ou senha incorretos !',
                title: 'dados invalídos'
            }
        });
    }
    return res.redirect('/adm');
}

    
  
    
