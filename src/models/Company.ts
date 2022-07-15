import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'company'
})
export class Company extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  taxId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  legalName!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  amount!: number;
}
