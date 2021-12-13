import { Module } from '@nestjs/common';
import { InfraestructuraModule } from 'src/infraestructura/infraestructura.module';

@Module({
  imports: [InfraestructuraModule],
})
export class AppModule {}
