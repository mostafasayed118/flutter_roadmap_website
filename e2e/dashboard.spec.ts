import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("should display dashboard title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  test("should display progress card", async ({ page }) => {
    await expect(page.locator("text=Overall Progress")).toBeVisible();
  });

  test("should display streak card", async ({ page }) => {
    await expect(page.locator("text=Study Streak")).toBeVisible();
  });

  test("should display quick stats", async ({ page }) => {
    await expect(page.locator("text=Topics Completed")).toBeVisible();
    await expect(page.locator("text=Projects Built")).toBeVisible();
  });

  test("should display study timer", async ({ page }) => {
    await expect(page.locator("text=00:00:00")).toBeVisible();
  });

  test("should display next steps card", async ({ page }) => {
    await expect(page.locator("text=Next Steps")).toBeVisible();
  });

  test("should have working sidebar navigation", async ({ page }) => {
    const sidebar = page.locator("nav").first();
    await expect(sidebar).toBeVisible();
  });
});
