import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  Unique,
  AllowNull,
} from "sequelize-typescript";
import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "createdAt" | "updatedAt"
>;

@Table({
  tableName: "users",
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  username!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @CreatedAt
  @Column({ field: "createdAt" })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updatedAt" })
  updatedAt!: Date;
}

export default User;
