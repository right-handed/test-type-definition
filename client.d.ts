import { SharedCommands } from "nightwatch";

declare namespace ClientCommands {
  /**
   * @description testRTC gives you some useful debugging commands, making it easier to write test scripts and later on debug, analyze and troubleshoot both the script and your WebRTC application.
   */
  interface Debug {
    /**
     * @description Add a log message to the console log of the browser. These messages can later be seen in the browser log file that gets collected by testRTC.
     * @param status Message to be added to browser log
     */
    rtcInfo(status: string): this;
    /**
     * @description Using this command, it is possible to add a small status indication of the stage of the probe in the test. Upon test execution, when the probe reaches this command, the probe’s status string in the test execution dashboard will be updated to the string given in this command.
     * @param status New status to display
     */
    rtcProgress(status: string): this;
    /**
     * @description It is possible to take screenshots of the tested browser during the test. In order to take a screenshot, call <b>rtcScreenshot()</b> in the desired location in the test script.
     * @param name The name of the screenshot
     */
    rtcScreenshot(name: string): this;
    /**
     * @description Add a vertical event line on graphs shown.
     * @param name The name given to the event. This name will appear when you hover on the horizontal line in the graph
     * @param type
     * @example
     * "local"
     * @description If you want the horizontal line for the event to appear only on the graphs of the probe who added the event (recommended)
     * @example
     * "global"
     * @description If you want the horizontal line for the event to appear on all graphs of all probes as well as the high level graphs. It is recommended to use that for a limited number of events, preferably 1 or 2 in the whole test scenario, otherwise, it will clutter the graphs too much
     */
    rtcEvent(name: string, type: "local" | "global"): this;

    /**
     * @description Add additional information to the test result.
     * @description <b>* It is assumed that this command is called once in a test run in one of the probes only.</b>
     * @param info The additional information to show.
     */
    rtcSetAdditionalInfo(info: string): this;

    /**
     * @description Calculate the time it takes for a media related metric value to reach a certain threshold from an event and store that time in a custom metric.
     * @param key	The name of the metric to set.
     * @param event The name of the event to start the timer from. Events are created using <b>rtcEvent()</b>.
     * @param criteria The criteria threshold where the timer should be stopped. Similar to <b>rtcSetTestExpectation()</b>.
     * @param aggregate	The type of aggregation to use for this custom metric across agents in the same test run.
     * @example
     * "sum"
     * @description Sum the metric’s value across all agents
     * @example
     * "avg"
     * @description Calculate the average of this metric’s value across all agents.
     */
    rtcSetMetricFromThresholdTime(key: string, event: string, criteria: string, aggregate: "sum" | "avg"): this;
  }

  /**
   * @description Expectations are special testRTC mechanisms that are calculated at the end of a test run or a monitor run. These can be used to look at metrics and determine if a test passed or failed based on user defined thresholds.
   */
  interface Expectations {
    /**
     * @description Used for calculation of predefined expectations built into testRTC
     * @description Indicate expected outcome for the specific probe execution. This is used to decide if a test has successfully passed or failed.
     * @param criteria	The criteria to test. See for the available options [<a href="https://testrtc.com/docs/rtcsettestexpectation/">How to create expectation</a>]
     * @param message	Message to invoke if criteria isn’t met
     * @param level	Level of expectation ( default <b>"error"</b> )
     */
    rtcSetTestExpectation(criteria: string, message: string, level: "error" | "warning"): this;
    /**
     * @description Used for calculation of predefined expectations built into testRTC between certain events
     * @description Indicate expected outcome for the specific probe execution between two application defined events.
     * @description This is used to decide if a test has successfully passed or failed.
     * @description <a href="https://testrtc.com/docs/using-event-based-test-expectations/">Using event based expectations</a>
     * @param criteria  The criteria to test. See for the available options [<a href="https://testrtc.com/docs/rtcsettestexpectation/">How to create expectation</a>]
     * @param start_event The starting point in time for the evaluation. Events are creating using <b>rtcEvent()</b>
     * @param end_event The ending point in time for the evaluation. Events are created using <b>rtcEvent()</b>
     * @param message Message to invoke if criteria isn’t met
     * @param level Level of expectation ( default <b>"error"</b> )
     */
    rtcSetEventsExpectation(
      criteria: string,
      start_event: string,
      end_event: string,
      message: string,
      level: "error" | "warning"
    ): this;
    /**
     * @description Used for developer-specific calculated expectations
     * @description Unlike <b>rtcSetTestExpectation()</b>, this script command enables you to create your own calculation as an asset.
     * @description Your function will be called at the end of the test run, letting you decide what to do with the metrics collected and determine if the test should pass or fail.
     * @description If you want to create a custom expectation based on events in the session then use <b>rtcSetCustomEventsExpectation()</b>.
     * @description You can also check <a href="https://testrtc.com/docs/assertion-and-expectation-commands/">other assertions and expectation commands</a> available in testRTC.
     * @param asset_name The name of the <a href="https://testrtc.com/docs/including-assets-in-scripts/">asset</a> holding the expectation calculation
     */
    rtcSetCustomExpectation(asset_name: string): this;
    /**
     * @description Used for developer-specific calculated events-based expectations
     * @description Where <b>rtcSetCustomExpectation()</b> is used to calculate custom expectations on the whole data series, this command is used to limit the calculation to the timespan between events created using <b>rtcEvent()</b>.
     * @description You can also check <a href="https://testrtc.com/docs/assertion-and-expectation-commands/">other assertions and expectation commands</a> available in testRTC.
     * @param asset_name Asset name with expectation code to include
     * @param start_event Starting point in time for the metrics used for the calculation
     * @param end_event Ending point in time for the metrics used for the calculation
     *
     * @description See <b><a href="https://testrtc.com/docs/rtcsetcustomexpectation/">rtcSetCustomExpectation()</a></b> for details and examples.
     */
    rtcSetCustomEventsExpectation(asset_name: string, start_event: string, end_event: string): this;
  }

  /**
   * @description You can explicitly force failure or warning in the probe or the whole test.
   */
  interface Status {
    /**
     * @description Add a warning to the probe’s status with a specific warning message
     * @param message The warning message to use.
     */
    rtcWarning(message: string): this;
    /**
     * @description Fail the probe in the test with a specific error message
     * @description This command will cause only the probe calling <b>rtcFail()</b> to fail. Other probes in the test will continue executing regularly.
     * @param reason The failure reason to use.
     */
    rtcFail(reason: string): this;

    /**
     * @description
     * Instructs the probe to fail gracefully and force failure on all other probes running the script, providing a verbose fail reason.
     * This command will also cause all other probes to stop executing their script and fail (without collecting logs).
     * @param reason The failure reason to use.
     */
    rtcFailAll(reason: string): this;

    /**
     * @description Instructs the test run to ignore errors that contain certain text.
     * @description Enables you to force the test to succeed when certain types of failure messages are caught, and you’d like to ignore them.
     * @param text The error text to ignore.
     */
    rtcIgnoreErrorContains(text: string): this;

    /**
     * @description Invoke a REST/HTTP API to an external system.
     * @param url External REST/HTTP server API URL. It is also possible to use an object to set HTTP headers to the request.
     * @param callback The external REST server response
     * @example
     * // This will send HTTP Get to the same url to retrieve the just posted data
     * client.rtcActivateWebhook(restURL, function(answer) {
     *    client.rtcInfo('rtcActivateWebhook Get answer' + answer);
     * })
     */
    rtcActivateWebhook(url: string | object, callback: (answer: string) => void): this;

    /**
     * @description Invoke a REST/HTTP API to an external system.
     * @param url External REST/HTTP server API URL. It is also possible to use an object to set HTTP headers to the request.
     * @param input If exists – send as HTTP POST with the input object converted to JSON as body of the request. If it does not exist – send as HTTP GET request
     * @param callback The external REST server response
     * @example
     * // This will send HTTP POST to the to save some data
     * client.rtcActivateWebhook(restURL, { value: 100 }, function(answer) {
     *    client.rtcInfo('rtcActivateWebhook Post answer ' + answer);
     * })
     */
    rtcActivateWebhook(url: string | object, input: object, callback: (answer: string) => void): this;
  }

  /**
   * @description testRTC allows you to share key/value pairs between the probes that are part of the same session. This script command together with <b>rtcSetSessionValue()</b> can be used for such information sharing and for synchronization across probes.
   */
  interface SessionSynchronization {
    /**
     * @description Create a key/value pair shared by the session probes
     * @description Within a session of a test run, one probe will call .rtcSetSessionValue(). This will generate a key/value pair that will be stored in a shared memory across all probes in the same session. The other probes can then call .rtcWaitForSessionValue() with the same key parameter to retrieve the value.
     * @param key The key to share across probes in the same session
     * @param value The value to set for the key
     */
    rtcSetSessionValue(key: string, value: string): this;
    /**
     * @description Wait for a key/value pair that is created in the session
     * @description This script command will wait until the requested key is received in the session. The callback function will be invoked and its a single parameter will hold the value provided in the call to .rtcSetSessionValue() by another probe. If the time indicated passes without receiving the value, this command will fail.
     * @param key	The key to wait for
     * @param callback The function that will be called when the value of the given key has been received
     * @param time The maximum number of milliseconds to wait. If this time passes, the test will fail
     */
    rtcWaitForSessionValue(key: string, callback: (value: string) => void, time: number): this;
  }

  /**
   * @description testRTC allows you to share key/value pairs between the probes in the same test run. This script command together with <b>rtcWaitForTestValue()</b> can be used for such information sharing and for synchronization across probes.
   */
  interface TestSynchronization {
    /**
     * @description Create a key/value pair shared by all probes in the test run
     * @description Within a test run, one probe will call <b>rtcSetTestValue()</b>. This will generate a key/value pair that will be stored in a shared memory across all probes in the test run. The other probes can then call <b>rtcWaitForTestValue()</b> with the same key parameter to retrieve the value.
     * @param key The key to share across probes in the test run
     * @param value The value to set for the key
     */
    rtcSetTestValue(key: string, value: string): this;

    /**
     * @description Wait for a key/value pair that is created globally in the test run
     * @description This script command will wait until the requested key is received in the test run.
     * @description The callback function will be invoked, and it's a single parameter will hold the value provided in the call to <b>rtcSetTestValue()</b> by another probe.
     * @description If the time indicated passes without receiving the value, this command will fail.
     * @param key	The key to wait for
     * @param callback The function that will be called when the value of the given key has been received
     * @param time The maximum number of milliseconds to wait. If this time passes, the test will fail
     */
    rtcWaitForTestValue(key: string, callback: (value: string) => void, time: number): this;
  }

  /**
   * @description You can synchronize and retrieve values in the test from external sources. This method is useful if you need to parse emails or SMS messages that has 2FA (two factor authentication) or joining URL/password information in them.
   */
  interface ExternalSynchronization {
    /**
     * @description Wait for a key/value pair that is created externally by invoking /testruns/externalValue REST API
     * @description If the external event is received, then the callback function provided shall be invoked and the value passed as its single parameter will hold the external value itself.
     * @param key	The external key to wait for
     * @param callback	The function that will be called when the external value of the given key has been received
     * @param time	The maximum number of milliseconds to wait. If this time passes, the test will fail
     */
    rtcWaitForExternalValue(key: string, callback: (value: string) => void, time: number): this;
  }

  /**
   * @description testRTC offers timing mechanisms, enabling you to time certain activities within your web service.
   * @description With these, you can set expectations based on timing, or collect timing related custom metrics.
   */
  interface Timer {
    /**
     * @param key	The name of the timer to start
     */
    rtcStartTimer(key: string): this;

    /**
     * @description Returns the time elapsed from timer start time.
     * @param key The name of the timer to get
     * @param callback Callback function to be called with the time elapsed since the timer started
     */
    rtcGetTimer(key: string, callback: (time: number) => void): this;
  }

  /**
   * @description testRTC has the ability to store code assets and then use them inside your test scripts by a dedicated include command.
   * @description This is useful when you are maintaining a large set of scripts, each offering different scenario within your application or when you need to run multiple monitors with slight variations.
   */
  interface Including {
    /**
     * @description To include an Asset inside a test script you can use the <b>client.include()</b> script command.
     * @param asset_name The name of the asset to include
     */
    include(asset_name: string): this;

    /**
     * @description Enables you to install and use npm packages as part of your test scripts.
     * @description npm is a package manager for JavaScript that makes it easy to share and reuse code.
     * @description With npm support in testRTC, you can now leverage the ecosystem of packages and modules provided by the Node.js community.
     * @param name The name of the package. This can also include a version number using the format <name>@<version>
     * @param func	The npm package can be used inside this function. Outside - it won’t exist.
     * @example
     * client.rtcRequire("jsonwebtoken", function(jwt) {
     *     var token = jwt.sign({ foo: 'bar' }, 'fooBarSecret');
     *     client.rtcInfo("Token: " + token);
     * });
     */
    rtcRequire(name: string, func: (arg: object) => void): this;
  }

  interface Network {
    /**
     * @description Change the network configuration during a test run dynamically to simulate changing network conditions
     * @param profile A JSON object describing the network configuration to use
     * @example
     * client.rtcSetNetwork({
     *     outgoing: {
     *         packetloss: 0.01,
     *         jitter: 0,
     *         latency: 0,
     *         bitrate: 5000
     *     },
     *     incoming: {
     *         packetloss: 0.01,
     *         jitter: 0,
     *         latency: 0,
     *         bitrate: 5000
     *     }
     * });
     */
    rtcSetNetwork(profile: NetworkConfig): this;
    /**
     * @description Change the network profile during a test run dynamically to simulate changing network conditions.
     * @param profile_name The name of the network profile to set <br/>
     * If the value is an empty string <b>""</b>, then the network will return to its default state for the test
     * @example
     * "No throttling"
     * "Call Drop"
     * "DSL"
     * "Very Bad Network"
     * "Wifi"
     * "Wifi High packet loss"
     * "Regular 2.5G"
     * "Regular 3G"
     * "Poor 3G"
     * "Regular 4G"
     * "Poor 4G"
     * "Unstable 4G"
     * "High Latency 4G"
     * "High Packet Loss 4G"
     * "50% Packet Loss"
     * @description <a href="https://testrtc.com/docs/test-profile-configurations/">See available network profile configurations</a>
     */
    rtcSetNetworkProfile(profile_name: string): this;
  }

  interface Calls {
    /**
     * @description Instructs the probe to run a specific function when the test completes, either prematurely or properly.
     * @param func Function to be called when the script finishes running.
     * A boolean value indicating if the test completed prematurely is passed to the runFunc function as its only variable
     * @example
     * client.rtcCallWhenDone(function(completedPrematurely) {
     *     client
     *         .rtcSetAdditionalInfo("Stopped prematurely " + failed)
     *         .rtcScreenshot("Stopped prematurely " + failed);
     * });
     */
    rtcCallWhenDone(func: (completedPrematurely: boolean) => void): this;

    /**
     * @description Instruct testRTC to collect webrtc-internals at that point in time.
     * @description When you need to collect data via webrtc-internals before the end of the test, then you can and should use <b>rtcCaptureCallData()</b>
     * @param tab Indicates which tab points to <a href="chrome://webrtc-internals">chrome://webrtc-internals</a>. ( default <b>0</> ) <br/>
     * You should use this argument if the open tab gets closed by your application, and you need to open it manually later on – some proctoring applications do that.
     */
    rtcCaptureCallData(tab?: number): this;
  }

  type DataConfig = {
    // Percentage ( <b>0.02</b> )
    packetloss: number;
    // Milliseconds
    jitter: number;
    // Milliseconds
    latency: number;
    // Kbps
    bitrate: number;
  };
  type NetworkConfig = {
    outgoing: DataConfig;
    incoming: DataConfig;
  };
}

type Client = SharedCommands &
  ClientCommands.Debug &
  ClientCommands.Expectations &
  ClientCommands.Status &
  ClientCommands.SessionSynchronization &
  ClientCommands.TestSynchronization &
  ClientCommands.ExternalSynchronization &
  ClientCommands.Timer &
  ClientCommands.Including &
  ClientCommands.Network &
  ClientCommands.Calls;

export const Client: Client;
