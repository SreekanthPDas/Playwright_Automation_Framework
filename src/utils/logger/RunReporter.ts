import { Reporter, TestCase, TestResult, Suite, FullConfig } from '@playwright/test/reporter';
import {runLogger} from './runLogger';

class RunReporter implements Reporter {
  onBegin(config:FullConfig, suite: Suite) {
    runLogger.info(`Test suite started - ENV=${process.env.ENV}, Browser=${config.projects[0].use.browserName}, Build=${process.env.BUILD_NO}, Date=${new Date().toISOString()}`);
    runLogger.info(`Total tests discovered: ${suite.allTests().length}`);
  }

  onTestBegin(test: TestCase) {
    runLogger.info(`Test started: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    runLogger.info(`Test finished: ${test.title} - Status=${result.status.toUpperCase()} - Duration=${result.duration}ms`);
  }

  onEnd(result: any ) {
    runLogger.info(`Test suite completed - Status=${result.status}`);
  }
}

export default RunReporter;
