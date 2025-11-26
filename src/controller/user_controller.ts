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
        console.log({
            message: {
                type: 'error',
                value: 'Preencha corretamente os dados!',
                title: 'dados invalídos'
            }
        });
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
        console.log({
            message: {
                type: 'error',
                 value: 'E-mail já cadastrado',
                title: 'dados invalídos'
            }
        });
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
    console.log('aqui.........................')
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

    (req.session as any).user = {
        nome: user.nome,
        email: user.email,
        id: user.id
    }

    return res.redirect('/adm');

}

    
  
    
