// tests/add-team.test.ts
import { test, expect } from "@playwright/test";
import { AddTeamPage } from "../page-objects/AddTeamPage";
import { TeamsPage } from "../page-objects/TeamsPage";

test("should create a new team and verify it appears in the list", async ({ page }) => {
  // Instancie les objets de page
  const addTeamPage = new AddTeamPage(page);
  const teamsPage = new TeamsPage(page);

  // Nom de l'équipe pour le test
  const teamName = "my team";

  // 1. Aller sur la page "/add_team" et remplir le nom
  await addTeamPage.goto();
  await addTeamPage.fillTeamName(teamName);

  // 2. Soumettre le formulaire
  await addTeamPage.submit();

  // 3. Vérifier que l'équipe a été créée en allant sur "/teams"
  await teamsPage.goto();
  const isVisible = await teamsPage.isTeamVisible(teamName);
  expect(isVisible).toBe(true);
});
