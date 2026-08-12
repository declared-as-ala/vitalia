import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { ReceiptNumberGenerator } from './receipt-number.generator';

@Module({
  controllers: [FinanceController],
  providers: [FinanceService, ReceiptNumberGenerator],
  exports: [FinanceService],
})
export class FinanceModule {}
