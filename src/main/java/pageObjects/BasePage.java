package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import utils.ActionUtils;
import utils.JavaScriptExecutorUtils;

import java.time.Duration;

public class BasePage {
    public static WebDriverWait wait;
    public static WebDriver driver;
    public static JavaScriptExecutorUtils jsUtils;
    public static ActionUtils actionUtils;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
        jsUtils = new JavaScriptExecutorUtils(driver);
        actionUtils = new ActionUtils(driver);
    }

    public static WebDriver getDriver() {
        return driver;
    }

    // Common page functions can be written down here
    public String getPageTitle() {
        return driver.getTitle();
    }

    public void setExplicitWait(Duration explicitWait) {
        wait = new WebDriverWait(driver, explicitWait);
    }
    //<editor-fold desc="Visible Text Functions">

    public WebElement getElementByVisibleText(String visibleText) {
        return driver.findElement(By.xpath("//*[contains(text(),'" + visibleText + "')]"));
    }

    public boolean isElementWithTextAvailable(String visibleText) {
        try {
            return driver.findElement(By.xpath("//*[contains(text(),'" + visibleText + "')]")).isEnabled();
        } catch (Exception e) {
            return false;
        }
    }
    //</editor-fold>
}
