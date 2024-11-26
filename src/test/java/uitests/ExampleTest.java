package uitests;

import base.BaseTest;
import dataProviders.DataProviders;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.SkipException;
import org.testng.annotations.Test;
import sitePages.moduleOne.ExamplePage;

public class ExampleTest extends BaseTest {


    @Test(dataProviderClass = DataProviders.class, dataProvider = "dp1", description = "Excel data retrieve example")
    public void testFunction(String carBrand, String carModel, String testVar, String runMode) throws InterruptedException {
        if (runMode.equals("N")) {
            throw new SkipException(carBrand + " Testi Run mode N olduğu için skip edildi.");
        }
        if (carBrand.equals("Hyundai")) {
            System.out.println("Car Model : " + carModel);
            System.out.println("Test variable : " + testVar);
        } else if (carBrand.equals("Toyota")) {
            System.out.println("Car Model : " + carModel);
            System.out.println("Test variable : " + testVar);
            assertions.Assertion.AssertTwoValues(carModel, "Elantra");
        }

        //Page object usage
        ExamplePage examplePage = new ExamplePage(driver);
        examplePage.test1();
    }
    // Example test for using actions and Js methods inside tests.
    // !!!
    // NOT RECOMMENDED These functions should be used inside page objects
    @Test
    public void testJSandActionUsage(){
        WebElement element = driver.findElement(By.id("myElementId"));
        jsUtils.clickElement(element);
        actionUtils.clickElement(element);
    }
}
