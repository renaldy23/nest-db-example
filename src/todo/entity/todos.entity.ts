import { Exclude, Transform } from 'class-transformer';
import * as moment from 'moment';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public title: string;
  @Column()
  public content: string;
  @Column({ default: false })
  public is_done: boolean;
  @Column({ type: 'timestamp' })
  @Transform((deadline) => {
    const formatDeadlineDate = deadline.value.toISOString();
    return moment(formatDeadlineDate).format('YYYY-MM-DD kk:mm:ss');
  })
  public deadline_date: Date;
  @CreateDateColumn()
  @Exclude()
  public created_at: Date;

  formatDeadlineDate(): string {
    const formattedDate = this.deadline_date.toISOString();
    return formattedDate.slice(0, 19).replace('T', ' ');
  }

  constructor(partial: Partial<TodoEntity>) {
    Object.assign(this, partial);
  }
}
