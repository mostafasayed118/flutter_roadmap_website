import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should redirect to dashboard", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/dashboard");
  });

  test("should navigate to roadmap page", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page).toHaveURL("/roadmap");
    await expect(page.locator("h1")).toContainText("Flutter Roadmap");
  });

  test("should navigate to skills page", async ({ page }) => {
    await page.goto("/skills");
    await expect(page).toHaveURL("/skills");
    await expect(page.locator("h1")).toContainText("Skills Checklist");
  });

  test("should navigate to analytics page", async ({ page }) => {
    await page.goto("/analytics");
    await expect(page).toHaveURL("/analytics");
    await expect(page.locator("h1")).toContainText("Analytics");
  });

  test("should navigate to docs page", async ({ page }) => {
    await page.goto("/docs");
    await expect(page).toHaveURL("/docs");
    await expect(page.locator("h1")).toContainText("Knowledge Base");
  });

  test("should navigate to resources page", async ({ page }) => {
    await page.goto("/resources");
    await expect(page).toHaveURL("/resources");
    await expect(page.locator("h1")).toContainText("Resources");
  });

  test("should navigate to cheat-sheet page", async ({ page }) => {
    await page.goto("/cheat-sheet");
    await expect(page).toHaveURL("/cheat-sheet");
  });

  test("should navigate to showcase page", async ({ page }) => {
    await page.goto("/showcase");
    await expect(page).toHaveURL("/showcase");
  });

  test("should navigate to leaderboard page", async ({ page }) => {
    await page.goto("/leaderboard");
    await expect(page).toHaveURL("/leaderboard");
  });
});
