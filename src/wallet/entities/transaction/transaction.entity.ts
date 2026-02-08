import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clientId: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  monto: number;

  @Column()
  sessionId: string;

  @Column()
  token: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ type: 'datetime' })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
