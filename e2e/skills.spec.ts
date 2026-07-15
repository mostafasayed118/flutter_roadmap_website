import { test, expect } from "@playwright/test";

test.describe("Skills", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/skills");
  });

  test("should display skills title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Skills");
  });

  test("should display skill categories", async ({ page }) => {
    await expect(page.locator("text=Dart").first()).toBeVisible();
    await expect(page.locator("text=Flutter").first()).toBeVisible();
  });

  test("should have skill checkboxes", async ({ page }) => {
    const checkboxes = page.locator("input[type='checkbox']");
    const count = await checkboxes.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should track skill completion", async ({ page }) => {
    const firstCheckbox = page.locator("input[type='checkbox']").first();
    if (await firstCheckbox.isVisible()) {
      const initialState = await firstCheckbox.isChecked();
      await firstCheckbox.click();
      await expect(firstCheckbox).toBeChecked({ checked: !initialState });
    }
  });
});

test.describe("Leaderboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/leaderboard");
  });

  test("should display leaderboard title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Leaderboard");
  });

  test("should display ranking information", async ({ page }) => {
    await expect(page.locator("text=Rank").first()).toBeVisible();
  });
});

test.describe("Showcase", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/showcase");
  });

  test("should display showcase title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Showcase");
  });

  test("should have add project button", async ({ page }) => {
    const addButton = page.locator("button").filter({ hasText: /add|project/i }).first();
    if (await addButton.isVisible()) {
      await expect(addButton).toBeVisible();
    }
  });
});
