
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
 import { Exclude } from 'class-transformer';



@Entity()
class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public phoneNumber?: string;

  @Column()
  public name: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({ default: 0 })
  referralCount: number;

  @Column({ default: 0 })
  balance: number;

  @Column({ nullable: true })
  referrerId: number;

  @ManyToOne(type => User, user => user.referees)
  @JoinColumn({ name: 'referrer_id' })
  referrer: User | null

  @OneToMany(type => User, user => user.referrer)
  referees: User[];
}

export default User;