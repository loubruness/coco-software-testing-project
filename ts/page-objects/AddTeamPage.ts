import { Page, Locator } from "@playwright/test";

export class AddTeamPage {
  // On déclare les propriétés sans leur assigner de valeur
  private nameInput: Locator;
  private addButton: Locator;

  constructor(private page: Page) {
    // On initialise dans le constructeur
    this.nameInput = this.page.locator('input[name="name"]');
    this.addButton = this.page.getByRole('button', { name: "Add" });
  }

  async goto() {
    await this.page.goto("/add_team");
  }

  async fillTeamName(teamName: string) {
    await this.nameInput.fill(teamName);
  }

  async submit() {
    await this.addButton.click();
  }
}
