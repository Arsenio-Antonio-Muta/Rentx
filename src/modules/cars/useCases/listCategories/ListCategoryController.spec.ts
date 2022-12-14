import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared//infra/typeorm"

let connection: Connection;



describe("List categories", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidV4();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, drive_licence )
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `
    );
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })
  it("Should be able list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    const { token } = responseToken.body

    await request(app).post("/categories").send({
      name: "Category Supertest2",
      description: "Category Supertest2"
    }).set({
      Authorization: `Bearer ${token}`
    });

    const response = await request(app).get("/categories")

    expect(response.status).toBe(200);
  })
})