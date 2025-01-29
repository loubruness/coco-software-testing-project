import { Database, open } from 'sqlite'
import { afterAll, beforeAll, beforeEach, expect, test } from '@jest/globals'

import axios from 'axios'
import sqlite3 from 'sqlite3'

const DATABASE_PATH = '../backend/db.sqlite3'
let db: Database

beforeAll(async () => {
  db = await open({filename: DATABASE_PATH, driver : sqlite3.Database })
})

beforeEach(async () => {
  // Clear the database before each test
  await db.exec(`
    DELETE FROM hr_team;
    DELETE FROM hr_employee;
    DELETE FROM hr_address;
    DELETE FROM hr_basicinfo;
    DELETE FROM hr_contract;
  `)
})

afterAll(async () => {
  await db.close()
})

test('adding a team', async () => {
  const url = 'http://127.0.0.1:8000/add_team'
  const params = new URLSearchParams()
  params.append('name', 'Typescript devs')
  await axios.post(url, params)

  const res = await db.all('SELECT name FROM hr_team')

  expect(res).toEqual([{name: 'Typescript devs' }])
})
