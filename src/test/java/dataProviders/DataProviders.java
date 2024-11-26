package dataProviders;

import base.BaseTest;
import org.testng.annotations.DataProvider;
import java.uitests.PersonalInformationTest;

import java.lang.reflect.Method;

public class DataProviders extends BaseTest {

    @DataProvider(name = "dp1")
    public Object[][] getData(Method m) {
        String sheetName = m.getName();
        int rows = excel.getRowCount(sheetName);
        int cols = excel.getColumnCount(sheetName);
        Object[][] data = new Object[rows - 1][cols];
        for (int rowNum = 2; rowNum <= rows; rowNum++) {
            for (int colNum = 0; colNum < cols; colNum++) {
                data[rowNum - 2][colNum] = excel.getCellData(sheetName, colNum, rowNum);
            }
        }
        return data;
    }

    @DataProvider(name = "userData")
    public Object[][] userData() {
        return new Object[][] {
                {"John Doe", "12", "15", "1990", "12345678901", "5551234567", "john.doe@example.com", "path/to/resume.pdf"},
                {"Jane Smith", "03", "22", "1985", "09876543210", "5559876543", "jane.smith@example.com", "path/to/resume2.pdf"}
        };
    }
}