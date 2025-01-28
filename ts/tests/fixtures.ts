import { test as base, expect } from "@playwright/test";
import { ResetDbPage } from "../page-objects/ResetDbPage";

export const test = base;
test.beforeEach(async ({ page }) => {
  const resetDbPage = new ResetDbPage(page);
  await resetDbPage.goto();
  await resetDbPage.resetDb();
});

export { expect };
