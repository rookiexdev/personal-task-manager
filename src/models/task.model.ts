import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import User from "./user.model";
import { Optional } from "sequelize";

export interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  dueDate: Date;
  status: "pending" | "completed";
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

type TaskCreationAttributes = Optional<
  TaskAttributes,
  "id" | "createdAt" | "updatedAt"
>;

@Table({
  tableName: "tasks",
})
class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  description?: string;

  @AllowNull(false)
  @Column(DataType.ENUM("low", "medium", "high"))
  priority!: "low" | "medium" | "high";

  @AllowNull(false)
  @Column(DataType.DATE)
  dueDate!: Date;

  @AllowNull(false)
  @Column(DataType.ENUM("pending", "completed"))
  status!: "pending" | "completed";

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export default Task;
