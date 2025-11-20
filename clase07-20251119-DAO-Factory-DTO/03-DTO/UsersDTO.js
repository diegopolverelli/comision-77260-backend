export class UsersDTO{
    constructor(usuario){
        this.name=usuario.nombre
        this.email=usuario.email
        this.role="user"
        this.username=usuario.email.split("@")[0]
        this.password=usuario.clave
    }
}