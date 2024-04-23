export default class TestFramework {
  constructor() {
    this.tests = new Array();
    this.failed = 0;
    this.passed = 0;
  }

  addTest(description, testFunction) {
    this.tests.push({ description, testFunction });
  }

  assertEquals(actual, expected) {
    if (actual != expected) throw new Error(`Expected ${expected}, but got ${actual}`);
  }

  runTests() {
    this.tests.forEach((test) => {
      try {
        test.testFunction();
        console.log(`PASS: ${description}`);
        this.passed++;
      } catch (error) {
        console.log(`FAIL: ${description}`);
        console.log(`ERROR: ${error.message}`);
        this.failed++;
      }
    });
    this.summariseResults();
  }

  summariseResults() {
    console.log(`Number of Tests: ${this.tests.length}`);
    console.log(`Tests Passed: ${this.passed}`);
    console.log(`Tests Failed: ${this.failed}`);
  }
}