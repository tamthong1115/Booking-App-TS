import { test, expect } from "@playwright/test";
import path from "path";


test.beforeEach(async ({ page }) => {
    await page.goto("/");

    // get sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=email]").fill("test@test.com");
    await page.locator("[name=password]").fill("Password!1");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign in Successful!")).toBeVisible();
});


test("should allow user to add a hotel", async ({ page }) => {
    await page.goto("/add-hotel");

    await page.locator("[name=\"name\"]").fill("Test Hotel");
    await page.locator("[name=\"city\"]").fill("Test City");
    await page.locator("[name=\"country\"]").fill("Test Country");
    await page
        .locator("[name=\"description\"]")
        .fill("This is a test description for Test Hotel!");
    await page.locator("[name=\"pricePerNight\"]").fill("199");
    await page.selectOption("select[name=\"starRating\"]", "3");
    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator("[name=\"adultCount\"]").fill("2");
    await page.locator("[name=\"childCount\"]").fill("5");

    await page.setInputFiles("[name=\"imageFiles\"]", [
        path.join(__dirname, "files", "1.png"),
        path.join(__dirname, "files", "2.png"),
        path.join(__dirname, "files", "3.png"),
    ]);

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 30000 });
});

test("should display hotels", async ({ page }) => {
    await page.goto("/my-hotels");

    expect(page.getByRole("heading", { name: "Test Hotel" }));
    await expect(page.getByText("This is a test description for Test Hotel!")).toBeVisible();
    await expect(page.getByText("Test City, Test Country")).toBeVisible();
    await expect(page.getByText("Budget")).toBeVisible();
    await expect(page.getByText("2 adults, 5 children")).toBeVisible();
    await expect(page.getByText("3 Star Rating")).toBeVisible();

    await expect(
        page.getByRole("link", { name: "View Details" }).first(),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
    await page.goto("/my-hotels");

    await page.getByRole("link", { name: "View Details" }).first().click();

    await page.waitForSelector("[name=\"name\"]", { state: "attached" });
    await expect(page.locator("[name=\"name\"]")).toHaveValue("Test Hotel");
    await page.locator("[name=\"name\"]").fill("Test Hotel UPDATED");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();

    await page.reload();

    await expect(page.locator("[name=\"name\"]")).toHaveValue(
        "Test Hotel UPDATED",
    );
    await page.locator("[name=\"name\"]").fill("Test Hotel");
    await page.getByRole("button", { name: "Save" }).click();
});

test.afterAll(async ({ page }) => {
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.click("button#basic-button");
    await page.getByRole("menuitem", { name: "Sign Out" }).click();

    await page.goto("/my-hotels");
    await page.getByRole("button", { name: "Delete" }).click();
});