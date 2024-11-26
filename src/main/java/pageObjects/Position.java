package pageObjects;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class Position extends BasePage {
    public Position(WebDriver driver) {
        super(driver);
    }

    @FindBy(xpath = "//span[normalize-space()='Test Engineer']")
    public WebElement testEngineerSpan;

    @FindBy(css = "div.flex.justify-center.items-center.gap-4 > div.text-white.flex.justify-center.items-center.text-[14px].py-2.px-4.rounded-full.bg-[#DF1F29].cursor-pointer")
    public WebElement gonderButton;

    public void assertTestEngineerVisible() {
        wait.until(ExpectedConditions.visibilityOf(testEngineerSpan));
        Assert.assertTrue("Name_Surname is not visible", testEngineerSpan.isDisplayed());
    }

    public void clicTestEngineer() {
        wait.until(ExpectedConditions.elementToBeClickable(testEngineerSpan));
        testEngineerSpan.click();
    }

    public void clicGonderButton() {
        wait.until(ExpectedConditions.elementToBeClickable(gonderButton));
        gonderButton.click();
    }




}

