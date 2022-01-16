export abstract class User {
    constructor(
        protected id: string,
        protected name: string,
        protected email: string,
        protected birthdate: string,
        protected classId: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getEmail(): string {
        return this.email
    }

    public getBirthdate(): string {
        return this.birthdate
    }

    public getTurmaId(): string {
        return this.classId
    }
}

export class Students extends User {
    constructor(
        id: string,
        nome: string,
        email: string,
        birthdate: string,
        classId: string,
        protected hobbies: string[]
    ) {
        super(id, nome, email, birthdate, classId)
    }

    public getHobbies(): string[] {
        return this.hobbies
    }

    // public getId(): string {
    //     return this.id
    // }
    // public getName(): string {
    //     return this.name
    // }
    // public getEmail(): string {
    //     return this.email
    // }
    // public getBirthdate(): string {
    //     return this.birthdate
    // }
    // public getClassId(): string {
    //     return this.classId
    // }
}

export class Teacher extends User {
    constructor(
        id: string,
        name: string,
        email: string,
        birthdate: string,
        classId: string,
        protected expertise: string[]
    ) {
        super(id, name, email, birthdate, classId)
    }

    public getExpertise(): string[] {
        return this.expertise
    }
}

export class ClassFormat {
    constructor(
        private id: string,
        private name: string,
        private module: string
    ){}

    public getId(): string{
        return this.id
    }

    public getName(): string{
        return this.name
    }

    public getModule(): string{
        return this.module
    }
}






