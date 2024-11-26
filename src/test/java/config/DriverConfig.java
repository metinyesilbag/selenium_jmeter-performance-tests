package config;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

public class DriverConfig {

    public static WebDriver configChromeDriver(Properties property) {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        System.out.println(property.getProperty("Headless"));
        if (property.getProperty("Headless").equalsIgnoreCase("true"))
            options.addArguments("--headless");
        if (property.getProperty("Maximize").equalsIgnoreCase("false") && !property.getProperty("Screen_resolution").isEmpty())
            options.addArguments("--window-size=" + property.getProperty("Screen_resolution"));
        if (property.getProperty("Ignore_ssl_errors").equalsIgnoreCase("true"))
            options.addArguments("--ignore-ssl-errors=yes");
        if (property.getProperty("Ignore_certificate_errors").equalsIgnoreCase("true"))
            options.addArguments("--ignore-certificate-errors");
        if (property.getProperty("increased_performance").equalsIgnoreCase("true")) {
            Map<String, Object> prefs = new HashMap<String, Object>();
            prefs.put("profile.default_content_setting_values.notifications", 2);
            prefs.put("profile.managed_default_content_settings.images", 2);
            options.setExperimentalOption("prefs", prefs);
        }
        options.addArguments("--remote-allow-origins=*");
        WebDriver driver = new ChromeDriver(options);
        if (property.getProperty("Maximize").equalsIgnoreCase("true"))
            driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(Integer.parseInt(property.getProperty("ImplicitWait"))));

        return driver;
    }

    public static WebDriver configGeckoDriver(WebDriver driver) {
        WebDriverManager.firefoxdriver().setup();
        driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().maximize();
        return driver;
    }
}
