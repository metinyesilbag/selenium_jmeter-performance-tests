package assertions;

import org.testng.Assert;
import org.testng.asserts.SoftAssert;

public final class Assertion {
    static SoftAssert softAssert = new SoftAssert();

    public static void AssertTwoValues(Object first, Object second) {
        Assert.assertEquals(first, second);
    }

    public static void AssertNotEqual(Object first, Object second) {
        Assert.assertNotEquals(first, second);
    }

    public static void AssertTrue(boolean condition) {
        Assert.assertTrue(condition);
    }

    public static void AssertFalse(boolean condition) {
        Assert.assertFalse(condition);
    }

    public static void SoftAssertTrue(boolean condition) {
        softAssert.assertTrue(condition);
    }

    public static void SoftAssertFalse(boolean condition) {
        softAssert.assertFalse(condition);
    }

    public static void SoftAssertEqual(Object first, Object second) {
        softAssert.assertEquals(first, second);
    }

    public static void SoftAssertClose() {
        softAssert.assertAll();
    }
}
