import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
class Prisma extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect()
    }
    
    
    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close()
        })
    }

    async wipe(){
        this;
    }
} export default Prisma;
