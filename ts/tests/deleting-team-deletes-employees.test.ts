import { test } from "./fixtures";
import { expect, chromium } from "@playwright/test";

test("Deleting team deletes employees", async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // create employees
    await page.goto("https://c.se1.hr.dmerej.info/add_employee");
    await page.getByPlaceholder("Name").fill("tester");
    await page.getByPlaceholder("Email").fill("tester@test.com");
    await page.locator("#id_address_line1").fill("address");
    await page.getByPlaceholder("City").fill("city");
    await page.getByPlaceholder("Zip code").fill("1234");
    await page.getByPlaceholder("Hiring date").fill("2025-01-28");
    await page.getByPlaceholder("Job title").fill("job");
    await page.getByRole("button", { name: "Add" }).click();

    await page.getByRole("link", { name: "Home" }).click();
    await page.getByRole("link", { name: "Add new employee" }).click();
    await page.getByPlaceholder("Name").fill("test1");
    await page.getByPlaceholder("Email").fill("test1@test.com");
    await page.locator("#id_address_line1").fill("address");
    await page.getByPlaceholder("City").fill("city");
    await page.getByPlaceholder("Zip code").fill("1234");
    await page.getByPlaceholder("Hiring date").fill("2025-01-28");
    await page.getByPlaceholder("Job title").fill("job");
    await page.getByRole("button", { name: "Add" }).click();

    await page.getByRole("link", { name: "Home" }).click();
    await page.getByRole("link", { name: "Add new employee" }).click();
    await page.getByPlaceholder("Name").fill("test2");
    await page.getByPlaceholder("Email").fill("test2@test.com");
    await page.locator("#id_address_line1").fill("address");
    await page.getByPlaceholder("City").fill("city");
    await page.getByPlaceholder("Zip code").fill("1234");
    await page.getByPlaceholder("Hiring date").fill("2025-01-28");
    await page.getByPlaceholder("Job title").fill("job");
    await page.getByRole("button", { name: "Add" }).click();

    // get employee list before adding to team
    await page.goto("/employees");
    await page.waitForSelector("table.table tbody tr");
    const employeeListBefore = await page.$$eval("table.table tbody tr", rows =>
        rows.map(row => {
            const cells = row.querySelectorAll("td");
            return {
                name: cells[0]?.textContent?.trim() ?? "",
                email: cells[1]?.textContent?.trim() ?? "",
            };
        })
    );
    console.log("Employee list before adding to team:", employeeListBefore);

    // create team
    await page.goto("/add_team");
    const nameInput = page.locator('input[name="name"]');
    const teamName = "my team";
    await nameInput.fill(teamName);
    await page.click("text='Add'");

    //add employees to team
    await page.goto("/employees");
    await page.getByText("Edit").nth(0).click();
    await page.getByText("Add to team").nth(0).click();
    await page.selectOption("#id_team", { label: "my team team" });
    await page.getByRole("button", { name: "Add" }).click();

    await page.goto("/employees");
    await page.getByText("Edit").nth(1).click();
    await page.getByText("Add to team").nth(0).click();
    await page.selectOption("#id_team", { label: "my team team" });
    await page.getByRole("button", { name: "Add" }).click();

    // delete team
    await page.goto("/teams");
    await page.getByText("Delete").nth(0).click();
    await page.getByText("Proceed").nth(0).click();

    // get employee list again after the team deletion
    await page.goto("/employees");
    await page.waitForSelector("table.table tbody tr");
    const employeeListAfter = await page.$$eval("table.table tbody tr", rows =>
        rows.map(row => {
            const cells = row.querySelectorAll("td");
            return {
                name: cells[0]?.textContent?.trim() ?? "",
                email: cells[1]?.textContent?.trim() ?? "",
            };
        })
    );
    console.log("Employee list after deleting team:", employeeListAfter);

    // verify that the employee lists match
    expect(employeeListAfter).toEqual(employeeListBefore);
});
