import { Database, open } from "sqlite";
import { afterAll, beforeAll, expect, test } from "@jest/globals";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import sqlite3 from "sqlite3";

export default class Employee {
  name: string;
  email: string;
  address: {
    line1: string;
    line2: string;
  };
  city: string;
  zipCode: number;
  hiringDate: string;
  jobTitle: string;

  constructor(
    name: string,
    email: string,
    address: { line1: string; line2: string },
    city: string,
    zipCode: number,
    hiringDate: string,
    jobTitle: string
  ) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.city = city;
    this.zipCode = zipCode;
    this.hiringDate = hiringDate;
    this.jobTitle = jobTitle;
  }
}

const DATABASE_PATH = "../backend/db.sqlite3";
let db: Database;
beforeAll(async () => {
  db = await open({ filename: DATABASE_PATH, driver: sqlite3.Database });
});

afterAll(async () => {
  await db.close();
});

test("Add the same employee two times", async () => {
  const user = new Employee(
    uuidv4(),
    `${uuidv4()}@example.com`,
    { line1: uuidv4(), line2: uuidv4() },
    uuidv4(),
    12345,
    "2021-01-01",
    uuidv4()
  );

  const add_employee_url = "http://localhost:8000/add_employee";
  const params = new URLSearchParams();

  params.append("name", user.name);
  params.append("email", user.email);
  params.append("address_line1", user.address.line1);
  params.append("address_line2", user.address.line2);
  params.append("city", user.city);
  params.append("zip_code", user.zipCode.toString());
  params.append("hiring_date", user.hiringDate);
  params.append("job_title", user.jobTitle);

  await axios.post(add_employee_url, params);

  await axios.post(add_employee_url, params);

  const res = await db.all(
    "SELECT hr_basicinfo.name FROM hr_employee JOIN hr_basicinfo ON hr_employee.basic_info_id=hr_basicinfo.id WHERE name=?",
    [user.name]
  );

  expect(res).toEqual([{ name: user.name }]);
});
