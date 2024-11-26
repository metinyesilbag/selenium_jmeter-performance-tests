package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class SuccesMessage extends BasePage {
    public SuccesMessage(WebDriver driver) {
        super(driver);
    }

    @FindBy(xpath = "//p[@class='text-[16px] flex justify-start items-start leading-6']")
    public WebElement successMessage;


    public void verifySuccessMessage() {
        String actualMessage = successMessage.getText();
        String expectedMessage = "Form Başarı ile gönderildi. Katıldığınız için teşekkür ederiz.";
        Assert.assertEquals("Success message does not match!", expectedMessage, actualMessage);
    }
}
