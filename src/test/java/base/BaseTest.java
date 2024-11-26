package base;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
//import org.openqa.selenium.devtools.v109.network.Network;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.*;
import pageObjects.BasePage;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.Properties;

public class BaseTest {

    public static WebDriver driver;
    public static WebDriverWait wait;
    // Config Settings
    public static Properties configProp = new Properties();
    public static Properties reportProp = new Properties();
    // Report
    public static String responseRedirectionMessages="";
    public static String responseClientErrorMessages="";
    public static String responseServerErrorMessages="";



    // This parameter will be passed from testng xml. If running from compiler directly will be used chrome as default (@Optional) parameter
    @BeforeSuite
    public static void setUp() throws IOException {
        // Initialize property file
        initializePropertyFile(configProp,reportProp);
        // Set the browser based on user input
        // Get the network tab
        //getNetworkTab(); //For Using uncomment the line.
        // Open the base URL
        driver.get(configProp.getProperty("BASE_URI"));
        // Initialize wait for explicit wait
        wait = new WebDriverWait(driver, Duration.ofSeconds(Integer.parseInt(configProp.getProperty("Explicit_Wait"))));
        // Create an instance of the BasePage class
        BasePage basePage = new BasePage(driver);
        // Set the explicit wait
        basePage.setExplicitWait(Duration.ofSeconds(Integer.parseInt(configProp.getProperty("Explicit_Wait"))));
    }

    /*
     * tearDown() is used to close the webdriver instance and end tests.
     * It is called after all the tests have been completed.
     */
    @AfterSuite
    public static void tearDown() {
        driver.quit();
    }

    public static void initializePropertyFile(Properties configProp, Properties reportProp) throws FileNotFoundException, IOException {
        // create 2 property object

        // create input stream of configuration file
        // load the file into configProp
        // create input stream of report configuration file
        // load the file into reportProp
    }

    public static String getAuthor() throws IOException {

        return BaseTest.reportProp.getProperty("Author");
    }

    public static String getTestName() throws IOException {

        return BaseTest.reportProp.getProperty("Test");
    }

    //This method is for getNetworkTab information. You should make some changes when you are using.
	/*
	public static void getNetworkTab(){
		DevTools devTools = ((ChromeDriver) driver).getDevTools();
		devTools.createSession();
		devTools.send(Network.enable(java.util.Optional.empty(), java.util.Optional.empty(), java.util.Optional.empty()));
		devTools.addListener(Network.responseReceived(),response->{
			if(response.getResponse().getStatus()>=300&&response.getResponse().getStatus()<400){
				responseRedirectionMessages=responseRedirectionMessages+"<tr><td style=\"border:1px solid black\">"+response.getResponse().getUrl()+"</td><td style=\"border:1px solid black\">"+response.getResponse().getStatus()+"</td></tr></br>";
			}
			else if(response.getResponse().getStatus()>=400&&response.getResponse().getStatus()<500){
				responseClientErrorMessages=responseClientErrorMessages+"<tr><td style=\"border:1px solid black\">"+response.getResponse().getUrl()+"</td><td style=\"border:1px solid black\">"+response.getResponse().getStatus()+"</td></tr></br>";
			}
			else if(response.getResponse().getStatus()>=500&&response.getResponse().getStatus()<600){
				responseServerErrorMessages= responseServerErrorMessages+"<tr><td style=\"border:1px solid black\">"+response.getResponse().getUrl()+"</td><td style=\"border:1px solid black\">"+response.getResponse().getStatus()+"</td></tr></br>";
			}
		});
	}

	 */

}
