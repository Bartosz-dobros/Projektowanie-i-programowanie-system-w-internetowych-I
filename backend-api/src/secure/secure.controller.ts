// src/secure/secure.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { db, auth } from '../firebase-admin';

@Controller('secure')
export class SecureController {
    @Get('user/:uid')
    async getUserData(@Param('uid') uid: string) {
        const user = await auth.getUser(uid);
        const favs = await db.collection(`users/${uid}/favorites`).get();
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            favorites: favs.docs.map(d => d.data()),
        };
    }
}
