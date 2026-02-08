import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  documento: string;

  @Column()
  nombres: string;

  @Column({ unique: true })
  email: string;

  @Column()
  celular: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  saldo: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
