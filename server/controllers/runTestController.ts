import lighthouse, { Flags } from "lighthouse";
import chromeLauncher from "chrome-launcher";
import desktopConfig from "../config/desktop-config.js";
import sendEventMessage from "../utils/sendEventMessage.js";
import { Request, Response } from "express";
import { TestParamsReqBody } from "../types/common";

async function launchChrome() {
  return await chromeLauncher.launch({
    chromeFlags: ["--headless"],
  });
}

function closeChrome(chrome: chromeLauncher.LaunchedChrome) {
  return chrome.kill();
}

async function runLighthouse(url: string, options: Flags) {
  return await lighthouse(url, options);
}

function prepareOptions(chromePort: number, desktop: boolean) {
  return {
    logLevel: "silent" as const,
    output: "html" as const,
    onlyCategories: ["performance"],
    port: chromePort,
    // blockedUrlPatterns: ["assets.adobedtm.com/launch*"],
    ...(desktop && desktopConfig.settings),
  };
}

function calculateTimeElapsed(startTime: number) {
  const totalTime = new Date().getTime() - startTime;
  const diffMins = Math.floor(totalTime / 60000);
  const diffSecs = Math.floor((totalTime % 60000) / 1000);
  return `${diffMins}m${diffSecs}`;
}

function calculateAverage(resultsArray: { categories: any; audits: any }[], runs: number) {
  const totalScores = {
    overall: 0,
    FCP: 0,
    SI: 0,
    LCP: 0,
    TBT: 0,
    CLS: 0,
  };

  for (let i = 0; i < runs; i++) {
    const { categories, audits } = resultsArray[i];
    totalScores.overall += categories.performance.score * 100;
    totalScores.FCP += audits["first-contentful-paint"].numericValue;
    totalScores.SI += audits["speed-index"].numericValue;
    totalScores.LCP += audits["largest-contentful-paint"].numericValue;
    totalScores.TBT += audits["total-blocking-time"].numericValue;
    totalScores.CLS += audits["cumulative-layout-shift"].numericValue;
  }

  return {
    overall: (totalScores.overall / runs).toFixed(2),
    FCP: (totalScores.FCP / runs / 1000).toFixed(2),
    SI: (totalScores.SI / runs / 1000).toFixed(2),
    LCP: (totalScores.LCP / runs / 1000).toFixed(2),
    TBT: (totalScores.TBT / runs / 1000).toFixed(2),
    CLS: (totalScores.CLS / runs).toFixed(3),
  };
}

function calculateMedian(resultsArray: any[]) {
  resultsArray.sort(
    (
      a: { categories: { performance: { score: number } } },
      b: { categories: { performance: { score: number } } }
    ) => a.categories.performance.score - b.categories.performance.score
  );
  const mNum = Math.floor(resultsArray.length / 2);

  return {
    overall: resultsArray[mNum].categories.performance.score * 100,
    FCP: (resultsArray[mNum].audits["first-contentful-paint"].numericValue / 1000).toFixed(2),
    SI: (resultsArray[mNum].audits["speed-index"].numericValue / 1000).toFixed(2),
    LCP: (resultsArray[mNum].audits["largest-contentful-paint"].numericValue / 1000).toFixed(2),
    TBT: (resultsArray[mNum].audits["total-blocking-time"].numericValue / 1000).toFixed(2),
    CLS: resultsArray[mNum].audits["cumulative-layout-shift"].numericValue.toFixed(3),
  };
}

let testParams = <TestParamsReqBody>{};

export default async function runTestController(req: Request, res: Response) {
  // loading the parameters for the test
  if (req.method === "POST") {
    testParams = req.body;
  }

  // running the test with the loaded parameters
  if (req.method === "GET") {

    // return if endpoint hasn't been substantiated yet
    if (Object.keys(testParams).length === 0) {
      res.status(404).json({ message: "Test not found" });
    }

    const { url, runs, desktop } = testParams;
    const chrome = await launchChrome();

    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Access-Control-Allow-Origin", "*");

      sendEventMessage(res, "update", "Tests started");

      const startTime = new Date().getTime();
      const options = prepareOptions(chrome.port, desktop);
      const resultsArray = [];

      for (let i = 0; i < runs; i++) {
        sendEventMessage(res, "update", `Running test ${i + 1}`);
        const runResult = await runLighthouse(url, options);
        if (runResult) resultsArray.push(runResult.lhr);
      }

      sendEventMessage(res, "update", `Tests finished, calculating results`);

      const timeElapsed = calculateTimeElapsed(startTime);
      const averageResult = calculateAverage(resultsArray, runs);
      const medianResult = calculateMedian(resultsArray);

      const results = { timeElapsed, averageResult, medianResult };

      sendEventMessage(res, "results", JSON.stringify(results));
    } catch (error) {
      sendEventMessage(res, "message", `Error: ${error}`);
    } finally {
      await closeChrome(chrome);
      sendEventMessage(res, "message", "Closing event stream");
      res.end();
    }
  }
}
