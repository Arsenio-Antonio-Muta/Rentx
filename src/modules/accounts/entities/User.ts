import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string | undefined;

  @Column()
  name: string | undefined;

  @Column()
  email: string | undefined;

  @Column()
  password: string | undefined;

  @Column()
  drive_licence: string | undefined;

  @Column()
  isAdmin: boolean | undefined;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
