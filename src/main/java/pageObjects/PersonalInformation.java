package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class PersonalInformation extends BasePage {
    public PersonalInformation(WebDriver driver) {
        super(driver);
    }

    @FindBy(id = "name")
    public WebElement Name_Surname;

    @FindBy(id = "birth")
    public WebElement birth;

    @FindBy(id = "tcKimlik")
    public WebElement tcK;

    @FindBy(id = "phone")
    public WebElement phone;

    @FindBy(id = "email")
    public WebElement e_mail;

    @FindBy(xpath = "//label[normalize-space()='Dosya Yükleyiniz (.pdf)']")
    public WebElement resumeUpload;

    @FindBy(xpath = "//button[normalize-space()='Lisans']")
    public WebElement lisansButton;

    @FindBy(id = "pdp1")
    public WebElement KVKK;

    @FindBy(xpath = "//button[@aria-label='Go to the next step']//*[name()='svg']")
    public WebElement NextStepButton;

    public void assertNameSurnameVisible() {
        wait.until(ExpectedConditions.visibilityOf(Name_Surname));
        Assert.assertTrue("Name_Surname is not visible", Name_Surname.isDisplayed());
    }

    public void enterName(String name) {
        wait.until(ExpectedConditions.visibilityOf(Name_Surname));
        Name_Surname.sendKeys(name);
    }

    public void enterBirth(String month, String day, String year) {
        String date = month + "/" + day + "/" + year;

        wait.until(ExpectedConditions.visibilityOf(birth));
        birth.sendKeys(date);
    }

    public void enterTcKNumber(String tcNumber) {
        wait.until(ExpectedConditions.visibilityOf(tcK));
        tcK.sendKeys(tcNumber);
    }

    public void enterPhoneNumber(String PhoneNumber) {
        wait.until(ExpectedConditions.visibilityOf(phone));
        phone.sendKeys(PhoneNumber);
    }

    public void enterMail(String MailAddress) {
        wait.until(ExpectedConditions.visibilityOf(e_mail));
        e_mail.sendKeys(MailAddress);
    }

    public void uploadFile(String filePath) {
        File file = new File(filePath);
        if (file.exists() && file.isFile()) {
            wait.until(ExpectedConditions.visibilityOf(resumeUpload));
            resumeUpload.sendKeys(filePath);
        } else {
            System.out.println("Geçersiz dosya yolu: " + filePath);
        }
    }

    public void clicEducation() {
        wait.until(ExpectedConditions.elementToBeClickable(lisansButton));
        lisansButton.click();
    }

    public void clickKvkkButton() {
        wait.until(ExpectedConditions.elementToBeClickable(KVKK));
        KVKK.click();
    }

    public void clickNextStepButton() {
        wait.until(ExpectedConditions.elementToBeClickable(NextStepButton));
        NextStepButton.click();
    }

}
