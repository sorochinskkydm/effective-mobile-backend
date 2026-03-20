export class CustomException extends Error {
    constructor(message: string, statusCode: number) {
        super(message);
    }
}

export class AlreadyExistsException extends CustomException {
    constructor(field: string, value: string) {
        super(`User with ${field} = ${value} already exists`, 401);
    }
}

export class UnauthorizedException extends CustomException {
    constructor() {
        super('Unauthorized', 401);
    }
}

export class ForbiddenException extends CustomException {
    constructor() {
        super('Forbidden', 403);
    }
}

export class EntityNotFoundException extends CustomException {
    constructor(entity: string, field: string, value: string) {
        super(`${entity} with ${field} = ${value}not found`, 404);
    }
}
