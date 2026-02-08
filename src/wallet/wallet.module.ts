import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Transaction } from './entities/transaction.entity';
import { ClientsModule } from '../clients/clients.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), ClientsModule, MailModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
