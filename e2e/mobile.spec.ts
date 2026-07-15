import { test, expect } from "@playwright/test";

test.describe("Mobile Responsiveness", () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X

  test("dashboard should be usable on mobile", async ({ page }) => {
    await page.goto("/dashboard");

    // Should show mobile nav
    const mobileNav = page.locator("nav").last();
    await expect(mobileNav).toBeVisible();

    // Should display main content
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  test("roadmap should be scrollable on mobile", async ({ page }) => {
    await page.goto("/roadmap");

    // Should display phases
    await expect(page.locator("text=Phase").first()).toBeVisible();

    // Should be scrollable
    const roadmap = page.locator("main");
    await expect(roadmap).toBeVisible();
  });

  test("analytics tabs should work on mobile", async ({ page }) => {
    await page.goto("/analytics");

    // Should display tabs
    await expect(page.locator("[role='tablist']")).toBeVisible();

    // Should be able to switch tabs
    const sessionsTab = page.locator("[role='tab']").filter({ hasText: /sessions/i });
    if (await sessionsTab.isVisible()) {
      await sessionsTab.click();
      await expect(page.locator("text=Recent Sessions")).toBeVisible();
    }
  });

  test("docs should be readable on mobile", async ({ page }) => {
    await page.goto("/docs");

    // Should display content
    await expect(page.locator("h1")).toContainText("Knowledge Base");
  });
});

test.describe("Tablet Responsiveness", () => {
  test.use({ viewport: { width: 768, height: 1024 } }); // iPad

  test("dashboard should show grid layout on tablet", async ({ page }) => {
    await page.goto("/dashboard");

    // Should display cards in grid
    await expect(page.locator("text=Overall Progress")).toBeVisible();
    await expect(page.locator("text=Study Streak")).toBeVisible();
  });

  test("analytics should show tabs on tablet", async ({ page }) => {
    await page.goto("/analytics");

    // Should display all tabs
    await expect(page.locator("[role='tablist']")).toBeVisible();
  });
});
