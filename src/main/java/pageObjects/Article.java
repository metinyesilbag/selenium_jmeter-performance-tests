package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class Article extends BasePage{

    public Article (WebDriver driver) {
        super(driver); }

    @FindBy(xpath = "(//article)[8]")
    public WebElement eighthArticle;

    public void clickEighthArticle() {
        wait.until(ExpectedConditions.elementToBeClickable(eighthArticle));
        eighthArticle.click();
    }
}
