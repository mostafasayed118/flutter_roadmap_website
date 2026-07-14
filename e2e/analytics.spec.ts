import { test, expect } from "@playwright/test";

test.describe("Analytics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/analytics");
  });

  test("should display analytics title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Analytics");
  });

  test("should display weekly review", async ({ page }) => {
    await expect(page.locator("text=Weekly Review")).toBeVisible();
  });

  test("should display study heatmap", async ({ page }) => {
    await expect(page.locator("text=Study Activity")).toBeVisible();
  });

  test("should display daily challenges", async ({ page }) => {
    await expect(page.locator("text=Daily Challenges")).toBeVisible();
  });

  test("should display study reminders", async ({ page }) => {
    await expect(page.locator("text=Study Reminders")).toBeVisible();
  });

  test("should have tabs for navigation", async ({ page }) => {
    await expect(page.locator("text=Overview")).toBeVisible();
    await expect(page.locator("text=Sessions")).toBeVisible();
    await expect(page.locator("text=Goals")).toBeVisible();
    await expect(page.locator("text=Badges")).toBeVisible();
    await expect(page.locator("text=Progress")).toBeVisible();
  });

  test("should switch between tabs", async ({ page }) => {
    await page.click("text=Sessions");
    await expect(page.locator("text=Session List")).toBeVisible();

    await page.click("text=Goals");
    await expect(page.locator("text=Goal Setting")).toBeVisible();

    await page.click("text=Badges");
    await expect(page.locator("text=Badge Showcase")).toBeVisible();
  });

  test("should have export PDF button", async ({ page }) => {
    await expect(page.locator("text=Export PDF")).toBeVisible();
  });
});
