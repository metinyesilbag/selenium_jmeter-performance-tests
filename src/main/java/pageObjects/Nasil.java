package pageObjects;

import org.openqa.selenium.WebDriver;

public class Nasil extends BasePage{

    public Nasil (WebDriver driver) {
        super(driver); }

    public void verifyPageTitle() {

        String actualTitle = driver.getTitle();
        Assert.assertEquals("Title does not match!", "Nasıl – 2N Haber", actualTitle);
    }
}
