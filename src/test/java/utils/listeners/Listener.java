package utils.listeners;

import base.BaseTest;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.MediaEntityBuilder;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.markuputils.ExtentColor;
import com.aventstack.extentreports.markuputils.Markup;
import com.aventstack.extentreports.markuputils.MarkupHelper;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.logging.LogType;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import utils.extentreports.ExtentManager;
import utils.logs.Log;
import utils.screenrecorder.CustomScreenRecorder;

import java.io.IOException;

public class Listener extends BaseTest implements ITestListener {
	public static ExtentTest test;
	private static ExtentReports extent;

	static {
		try {
			extent = ExtentManager
					.createExtentReports();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private CustomScreenRecorder screenRecorder;

	public Listener() {
		//<editor-fold desc="Screen Recording">
/*
        try {
            //this is the location that we are going to save the recorded file
            screenRecorder = new CustomScreenRecorder(new File(System.getProperty("user.dir") + "\\target\\screen-records"));
        } catch (IOException | AWTException e) {
            System.out.println(e.getMessage());
        }
 */

		//</editor-fold>
	}

	private static String getTestMethodName(ITestResult iTestResult) {
		return iTestResult.getMethod().getConstructorOrMethod().getName();
	}

	private void stopScreenRecording(boolean keepFile) {
		try {
			screenRecorder.stopRecording(keepFile);
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}

	@Override
	public void onStart(ITestContext iTestContext) {
	}

	@Override
	public void onFinish(ITestContext iTestContext) {
		Log.info("I am in onFinish method " + iTestContext.getName());
		//Do tier down operations for ExtentReports reporting!
		if (extent != null) {

			extent.flush();
		}
	}

	@Override
	public void onTestStart(ITestResult iTestResult) {
		Log.info(getTestMethodName(iTestResult) + " test is starting.");
		test = extent
				.createTest(iTestResult.getTestClass().getName() + "     @TestCase : " + iTestResult.getMethod().getMethodName());
		//<editor-fold desc="Screen Recording">
/*
        try {
            screenRecorder.startRecording(iTestResult.getClass().getSimpleName() + "-" + iTestResult.getMethod().getMethodName(), true);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
*/
		//</editor-fold>
	}

	@Override
	public void onTestSuccess(ITestResult iTestResult) {
		String methodName = iTestResult.getMethod().getMethodName();
		String logText = "<b>" + "TEST CASE:- " + methodName.toUpperCase() + " PASSED" + "</b>";
		Markup m = MarkupHelper.createLabel(logText, ExtentColor.GREEN);
		test.pass(m);
		test.info(iTestResult.getMethod().getDescription());
		//<editor-fold desc="Screen Record Stop">
		//stopScreenRecording(false);
		//</editor-fold>
	}

	@Override
	public void onTestFailure(ITestResult iTestResult) {
		try {
			ExtentManager.captureScreenshot();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//Get driver from BaseTest and assign to local webdriver variable.
		LogEntries logs = driver.manage().logs().get(LogType.BROWSER);
		String methodName = iTestResult.getMethod().getMethodName();
		String logText = "<b>" + "TEST CASE:- " + methodName.toUpperCase() + " FAILED" + "</b>";
		Markup m = MarkupHelper.createLabel(logText, ExtentColor.RED);
		String consoleLogs = "<textarea>" + logs.getAll().toString() + "</textarea>";
		String seleniumLogs = "<textarea>" + iTestResult.getThrowable().toString() + "</textarea>";

		test.log(Status.FAIL, m);
		test.info(iTestResult.getMethod().getDescription());
		test.fail("<b><font color=red>" + "Screenshot of failure" + "</font></b><br>", MediaEntityBuilder.createScreenCaptureFromPath(ExtentManager.fileName)
				.build());
		test.fail("<b><font color=red>" + "Network Server Errors : " +
				"</font></b><br><table><tr><td>Request URL</td><td>Status Code</td></tr>"
				+responseServerErrorMessages
				+"</table>");
		test.fail("<b><font color=red>" + "Network Client Errors : " +
				"</font></b><table style=\"border:1px solid black\"><tr><td>Request URL</td><td>Status Code</td></tr>"
				+responseClientErrorMessages+
				"</table>");
		test.fail("<b><font color=red>" + "Browser console logs : " + "</font></b><br><table>" + consoleLogs+"</table>");
		test.fail("<b><font color=red>" + "Selenium error : " + "</font></b><br>" + seleniumLogs);
		//<editor-fold desc="Screen Record Stop">
		//stopScreenRecording(true);
		//</editor-fold>
	}

	@Override
	public void onTestSkipped(ITestResult iTestResult) {
		Log.info(getTestMethodName(iTestResult) + " test is skipped.");
		//ExtentReports log operation for skipped tests.
		String methodName = iTestResult.getMethod().getMethodName();
		String logText = "<b>" + "Test Case:- " + methodName + " Skipped" + "</b>";
		Markup m = MarkupHelper.createLabel(logText, ExtentColor.YELLOW);
		test.skip(m);
		test.info(iTestResult.getMethod().getDescription());
		//<editor-fold desc="Screen Record Stop">
		//stopScreenRecording(false);
		//</editor-fold>
	}

	@Override
	public void onTestFailedButWithinSuccessPercentage(ITestResult iTestResult) {
		Log.info("Test failed but it is in defined success ratio " + getTestMethodName(iTestResult));
	}
}



    /*
    @Override
    public void onTestStart(ITestResult result) {
        ITestListener.super.onTestStart(result);
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        ITestListener.super.onTestSuccess(result);
    }
// Example Screenshot Taking feature
    @Override
    public void onTestFailure(ITestResult result) {
        takeScreenShot();
        LogEntries logs = driver.manage().logs().get(LogType.BROWSER);
        System.out.println("Console logs : "+logs.getAll());
    }
    @Override
    public void onTestSkipped(ITestResult result) {
        ITestListener.super.onTestSkipped(result);
    }

    @Override
    public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
        ITestListener.super.onTestFailedButWithinSuccessPercentage(result);
    }

    @Override
    public void onTestFailedWithTimeout(ITestResult result) {
        ITestListener.super.onTestFailedWithTimeout(result);
    }

    @Override
    public void onStart(ITestContext context) {
        ITestListener.super.onStart(context);
    }

    @Override
    public void onFinish(ITestContext context) {
        ITestListener.super.onFinish(context);
    }
}
     */

