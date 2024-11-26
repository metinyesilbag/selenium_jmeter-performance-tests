package pageObjects;

import org.openqa.selenium.WebDriver;

public class Neden extends BasePage{

    public Neden (WebDriver driver) {
        super(driver); }

    public void verifyPageTitle() {

        String actualTitle = driver.getTitle();
        Assert.assertEquals("Title does not match!", "Neden – 2N Haber", actualTitle);
    }

}
