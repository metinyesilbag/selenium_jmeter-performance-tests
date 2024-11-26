package pageObjects;

import com.fasterxml.jackson.databind.ser.Serializers;
import org.openqa.selenium.WebDriver;

public class IsDunyasi extends BasePage {

    public IsDunyasi (WebDriver driver) {
        super(driver); }

    public void verifyPageTitle() {

        String actualTitle = driver.getTitle();
        Assert.assertEquals("Title does not match!", "İş Dünyası – 2N Haber", actualTitle);
    }
}
