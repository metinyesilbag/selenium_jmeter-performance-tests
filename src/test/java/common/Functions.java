package common;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.WindowType;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Set;

import static base.BaseTest.driver;
// This class contains all the helper methods that are used in the automation framework.
// The takeScreenShot() method takes a screenshot of the current page and saves it in a file.
// The sleep() method is used to pause the execution for a given amount of time in milliseconds.
// The refreshPage() method refreshes the current page.
// The forwardPage() and backPage() methods are used to navigate forward and backward in the browser history.
// The goToNewWindow() method is used to switch to a new window.
// The goToFrameByIndex(), goToFrameByName(), and goToFrameByElement() methods are used to switch to an iframe.
// The goToMainDocument() method is used to switch back to the main document.
// The goToAlert() method is used to switch to an alert.
// The getAlertText() method is used to get the text from an alert.
// The acceptAlert() and cancelAlert() methods are used to accept or dismiss an alert.
// The openLinkInNewTab() method is used to open a link in a new tab.
// Common functions will be here like taking screen shots, login function etc which can be used by more than one place
public class Functions {

    public static void takeScreenShot() {
        final SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        File ssFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        try {
            FileUtils.copyFile(ssFile, new File("src\\test\\resources\\" + "_on_" + sdf1.format(timestamp) + ".png"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sleep(Integer milliSeconds) {
        try {
            Thread.sleep((long) milliSeconds);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void refreshPage() {
        driver.navigate().refresh();
    }

    public static void forwardPage() {
        driver.navigate().forward();
    }

    public static void backPage() {
        driver.navigate().back();
    }

    //TODO it will most probably work for 2 windows, for more, adjustment needed.
    public static void goToNewWindow() {
        String currentWindow = driver.getWindowHandle();
        Set<String> handles = driver.getWindowHandles();
        for (String handle : handles) {
            if (!handle.equalsIgnoreCase(currentWindow)) {
                driver.switchTo().window(handle);
            }
        }
    }

    public static void goToFrameByIndex(int frameIndex) {
        driver.switchTo().frame(frameIndex);
    }

    public static void goToFrameByName(String name) {
        driver.switchTo().frame(name);
    }

    public static void goToFrameByElement(WebElement element) {
        driver.switchTo().frame(element);
    }

    public static void goToMainDocument() {
        driver.switchTo().defaultContent();
    }

    public static void goToAlert() {
        driver.switchTo().alert();
    }

    public static String getAlertText() {
        return driver.switchTo().alert().getText();
    }

    public static void acceptAlert() {
        driver.switchTo().alert().accept();
    }

    public static void cancelAlert() {
        driver.switchTo().alert().dismiss();
    }

    public static void openLinkInNewTab(String URL) {
        driver.switchTo().newWindow(WindowType.TAB);
        driver.navigate().to(URL);
    }

}
