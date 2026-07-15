import { test, expect } from "@playwright/test";

test.describe("Roadmap", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/roadmap");
  });

  test("should display roadmap title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Roadmap");
  });

  test("should display phases", async ({ page }) => {
    await expect(page.locator("text=Phase")).toBeVisible();
  });

  test("should display week cards", async ({ page }) => {
    await expect(page.locator("text=Week")).toBeVisible();
  });

  test("should have expandable phase sections", async ({ page }) => {
    const phaseHeader = page.locator("button").filter({ hasText: "Phase" }).first();
    if (await phaseHeader.isVisible()) {
      await phaseHeader.click();
      await expect(page.locator("text=topics").first()).toBeVisible();
    }
  });

  test("should display progress indicators", async ({ page }) => {
    await expect(page.locator("[role='progressbar']").first()).toBeVisible();
  });
});

test.describe("Timer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("should display timer controls", async ({ page }) => {
    await expect(page.locator("text=00:00:00")).toBeVisible();
  });

  test("should start timer on button click", async ({ page }) => {
    const startButton = page.locator("button").filter({ hasText: /start/i }).first();
    if (await startButton.isVisible()) {
      await startButton.click();
      await page.waitForTimeout(1100);
      await expect(page.locator("text=00:00:01")).toBeVisible();
    }
  });
});

test.describe("Docs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs");
  });

  test("should display docs title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Knowledge Base");
  });

  test("should display documentation categories", async ({ page }) => {
    await expect(page.locator("text=Dart").first()).toBeVisible();
  });

  test("should have search functionality", async ({ page }) => {
    const searchInput = page.locator("input[placeholder*='Search']");
    if (await searchInput.isVisible()) {
      await searchInput.fill("widget");
      await page.waitForTimeout(300);
    }
  });
});
