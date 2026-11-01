import bcrypt from 'bcrypt';

import { IHasher } from "../../application/ports/hasher.port";
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptHasher implements IHasher {
    async hashearPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async compararPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
