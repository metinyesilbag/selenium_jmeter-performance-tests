package utils.extentreports;

import base.BaseTest;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ExtentManager {
	public static final ExtentReports extentReports = new ExtentReports();
	private static final SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
	public static String fileName;
	static Timestamp timestamp = new Timestamp(System.currentTimeMillis());
	static ExtentSparkReporter reporter = new ExtentSparkReporter(".\\reports\\" + sdf1.format(timestamp) + ".html");

	public synchronized static ExtentReports createExtentReports() throws IOException {

		reporter.config().setReportName("Test Report for : "); // TODO Version Number will be added to here
		extentReports.attachReporter(reporter);
		extentReports.setSystemInfo("Test On", BaseTest.getTestName());
		extentReports.setSystemInfo("Author", BaseTest.getAuthor());
		return extentReports;
	}

	public static void captureScreenshot() throws IOException {
		Date d = new Date();
		fileName = d.toString().replace(":", "_").replace(" ", "_") + ".jpg";

		File screeshot = ((TakesScreenshot) BaseTest.driver).getScreenshotAs(OutputType.FILE);
		FileUtils.copyFile(screeshot, new File(".\\reports\\" + fileName));
	}
}