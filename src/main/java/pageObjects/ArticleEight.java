package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class ArticleEight extends BasePage {

    public ArticleEight (WebDriver driver) {
        super(driver); }

    @FindBy(xpath = "//h1[@class='elementor-heading-title elementor-size-default']")
    public WebElement title;

    public void verifyPageTitle(String expectedTitle) {

        String actualTitle = driver.getTitle();
        Assert.assertEquals("Title does not match!", expectedTitle, actualTitle);
    }



}
