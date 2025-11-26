export function authMiddleware(req: any, res: any, next: any) {
    if(req.session?.user) { // se o usuario estiver logado
        return next();//continua a resquest
    }

    return res.redirect('/user/logn');//senão volta pro login
}