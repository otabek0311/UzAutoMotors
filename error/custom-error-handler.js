module.exports = class CustomErrorHendler extends Error{
    status;
    errors;
    constructor(status,message,errors){
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadRequest(message,errors = []){
        return new CustomErrorHendler(400, message,errors = [])
    }

    static unAuthorazed(message,errors = []){
        return new CustomErrorHendler(401, message,errors = [])
    }

    static Forbidden(message,errors = []){
        return new CustomErrorHendler(403, message,errors = [])
    }

    static NotFound(message,errors = []){
        return new CustomErrorHendler(404, message,errors = [])
    }
}

