import { hash } from 'bcryptjs';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

import { PowerUserRole } from '../../types';

@Entity('power_users')
export class PowerUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  userName: string;

  @Column({
    type: 'varchar',
    length: 60,
    select: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: PowerUserRole,
  })
  role: PowerUserRole;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await hash(this.password, 10);
  }
}
