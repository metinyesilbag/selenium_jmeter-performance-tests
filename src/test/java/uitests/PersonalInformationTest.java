package uitests;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pageObjects.PersonalInformation;
import pageObjects.Position;
import pageObjects.SuccesMessage;
import static pageObjects.BasePage.driver;
import static dataProviders.DataProviders;

public class PersonalInformationTest extends BaseTest {

    PersonalInformation personalInformationPage;
    Position positionPage;

    @BeforeClass
    public void checkinURL() {
        if (!loggedin) {
            personalInformationPage.assertNameSurnameVisible();
        }
    }

    @BeforeMethod
    public void setUp() {
        personalInformationPage = new PersonalInformation(driver);
        positionPage = new Position(driver);
    }

    @Test(dataProvider = "userData", dataProviderClass = DataProviders.class)
    public void testStep1FormFilling(String name, String month, String day, String year, String tc, String phone, String email, String resume) {

        personalInformationPage.enterName(name);
        personalInformationPage.enterBirth(month, day, year);
        personalInformationPage.enterTcKNumber(tc);
        personalInformationPage.enterPhoneNumber(phone);
        personalInformationPage.enterMail(email);
        personalInformationPage.uploadFile(resume);
        personalInformationPage.clicEducation();
        personalInformationPage.clickKvkkButton();
        personalInformationPage.clickNextStepButton();
        positionPage.assertTestEngineerVisible();
    }

    @Test
    public void testStep2SelectPosition() {
        positionPage.clicTestEngineer();
        positionPage.clicGonderButton();

        SuccesMessage succesMessagePage = new SuccesMessage(driver);
        succesMessagePage.verifySuccessMessage();
    }

}