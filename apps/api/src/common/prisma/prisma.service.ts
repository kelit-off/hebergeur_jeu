import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaBetter
    }
}