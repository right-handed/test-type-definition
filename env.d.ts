export interface TestRTCEnv {
  //	The string that was entered in the test configuration page, ‘Service URL’ field
  RTC_SERVICE_U2RL: string;
  //	The random name allocated for the specific test execution
  RTC_TEST_NAME: string;
  //	The probe’s name. The agent name format is [RTC_TEST_NAME]-[RTC_AGENT_NUM]
  RTC_AGENT_NAME: string;
  //	The total number of probes in the test. This corresponds to the concurrent probes value that is set when the test is executed
  RTC_AGENT_COUNT: string;
  //	The (numeric) index of this probe from total number of probes in the test (starts with 1)
  RTC_AGENT_NUM: string;
  //	The size of a configured session (Session Size parameter in the test script editor)
  RTC_SESSION_SIZE: string;
  //	The total number of sessions in the test.
  RTC_SESSION_COUNT: string;
  //	The numeric index of this session from total number of sessions in the test (starts with 1)
  RTC_SESSION_IDX: string;
  /**	The session unique name for the test. <br>
   * 	The session name includes the session’s (numeric) index of this session from total number of sessions in the test (starts with 1). <br>
   *	The session name format is [RTC_TEST_NAME]-“room”[RTC_SESSION_IDX] */
  RTC_SESSION_NAME: string;
  //	The (numeric) index of this agent in the specific session (starts with 1)
  RTC_IN_SESSION_ID: string;
  //	The name of the test script being executed
  RTC_TEST_SCRIPT_NAME: string;
  //	The maximum duration in milliseconds of the test before it gets canceled automatically
  RTC_TIMEOUT: string;
  //	The probe’s operating system
  RTC_OS: string;
  //	The probe’s location
  RTC_LOCATION: string;
  //	The probe’s browser version
  RTC_BROWSER: string;
  //	The probe’s configured network profile
  RTC_NETWORK_PROFILE: string;
  //	The probe’s configured firewall profile
  RTC_FIREWALL_PROFILE: string;
  //	The testRunId allocated for this test run
  RTC_TEST_RUN_ID: string;
  //	The number of times this specific test script has been executed
  RTC_RUN_COUNT: string;
  // Indicates how many additional tabs are used by testRTC for its operation. See switching windows and tabs for more information
  RTC_EXTRA_TABS: string;
}
