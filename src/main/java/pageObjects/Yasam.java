package pageObjects;

import org.openqa.selenium.WebDriver;

public class Yasam extends BasePage{

    public Yasam (WebDriver driver) {
        super(driver); }

    public void verifyPageTitle() {

        String actualTitle = driver.getTitle();
        Assert.assertEquals("Title does not match!", "Yaşam – 2N Haber", actualTitle);
    }

}
