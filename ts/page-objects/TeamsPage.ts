import { Page } from "@playwright/test";

export class TeamsPage {
  constructor(private page: Page) {}

  // Aller à la page des teams
  async goto() {
    await this.page.goto("/teams");
  }

  // Vérifier si une équipe est visible dans le tableau
  async isTeamVisible(teamName: string): Promise<boolean> {
    return this.page.isVisible(`td:has-text('${teamName}')`);
  }
}
