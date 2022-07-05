import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './base.entity';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column()
  password: string;

  toJSON() {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      username: this.username,
      phone_number: this.phone_number,
    };
  }

  toProfile() {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      username: this.username,
      phone_number: this.phone_number,
    };
  }
}
