package uitests;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pageObjects.*;

import static pageObjects.BasePage.driver;

public class NavbarTest extends BaseTest{

    MenuObject menuObject;


    @BeforeClass
    public void checkinURL() {
        if (!loggedin) {
            menuObject.assertSearchButtonVisible();
        }
    }

    @BeforeMethod
    public void setUp() {
        menuObject = new MenuObject(driver);
        menuObject.assertSearchButtonVisible();
    }

    @AfterMethod
    public void back() {
        driver.navigate().back();
    }

    @Test
    public void testNeden() {
        menuObject.clickNedenButton();
        Neden neden = new Neden(driver);
        neden.verifyPageTitle();
    }

    @Test
    public void testNasil() {
        menuObject.clickNasilButton();
        Nasil nasil = new Nasil(driver);
        nasil.verifyPageTitle();
    }

    @Test
    public void testIsDunyasi() {
        menuObject.clickisDunyasiButton();
        IsDunyasi isDunyasi = new IsDunyasi(driver);
        isDunyasi.verifyPageTitle();
    }

    @Test
    public void testYasam() {
        menuObject.clickIsYasamButton();
        Yasam yasam = new Yasam(driver);
        yasam.verifyPageTitle();
    }

}
