import { IsNumber } from 'class-validator';
import { BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';

//Unix timestamp
//HAPPY NEW YEAR 2023
export abstract class BaseTable {
  @PrimaryGeneratedColumn('increment')
  @IsNumber()
  public id: number;

  @Column({
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  public created_at: number;

  @Column({
    type: 'bigint',
    default: new Date().getTime(),
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  public updated_at: number;

  @BeforeUpdate()
  updateManagedAt(): void {
    this.updated_at = new Date().getTime();
  }
}
