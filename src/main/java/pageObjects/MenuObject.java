package pageObjects;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class MenuObject extends BasePage {

    public MenuObject(WebDriver driver) {
        super(driver); }

    @FindBy(xpath = "//*[name()='path' and contains(@d,'M505 442.7')]")
    public WebElement searchButton;

    @FindBy(xpath = "//input[@placeholder='Keşfet...']")
    public WebElement KesfetInput;

    @FindBy(xpath = "//*[name()='path' and contains(@d,'M505 442.7')]")
    public WebElement nedenButton;

    @FindBy(xpath = "//*[name()='path' and contains(@d,'M505 442.7')]")
    public WebElement nasilButton;

    @FindBy(xpath = "//*[name()='path' and contains(@d,'M505 442.7')]")
    public WebElement isDunyasiButton;

    @FindBy(xpath = "//*[name()='path' and contains(@d,'M505 442.7')]")
    public WebElement yasamButton;

    public void assertSearchButtonVisible() {
        wait.until(ExpectedConditions.visibilityOf(searchButton));
        Assert.assertTrue("searchButton is not visible", searchButton.isDisplayed());
    }

    public void clickSearchButton() {
        wait.until(ExpectedConditions.elementToBeClickable(searchButton));
        searchButton.click();
    }

    public void enterKesfetInput(String kesfet) {
        wait.until(ExpectedConditions.elementToBeClickable(KesfetInput));
        KesfetInput.sendKeys(kesfet);
        KesfetInput.sendKeys(Keys.ENTER);
    }

    public void clickNedenButton() {
        wait.until(ExpectedConditions.elementToBeClickable(nedenButton));
        nedenButton.click();
    }

    public void clickNasilButton() {
        wait.until(ExpectedConditions.elementToBeClickable(nasilButton));
        nasilButton.click();
    }

    public void clickisDunyasiButton() {
        wait.until(ExpectedConditions.elementToBeClickable(isDunyasiButton));
        isDunyasiButton.click();
    }

    public void clickIsYasamButton() {
        wait.until(ExpectedConditions.elementToBeClickable(yasamButton));
        yasamButton.click();
    }

}
