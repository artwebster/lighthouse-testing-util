import lighthouse from "lighthouse";
import chromeLauncher from "chrome-launcher";
import desktopConfig from "../config/desktop-config.js";

async function launchChrome() {
  return await chromeLauncher.launch({
    chromeFlags: ["--headless"],
  });
}

async function closeChrome(chrome) {
  return chrome.kill();
}

async function runLighthouse(url, options) {
  return await lighthouse(url, options);
}

function prepareOptions(chromePort, desktop) {
  return {
    logLevel: "silent",
    output: "html",
    onlyCategories: ["performance"],
    port: chromePort,
    // blockedUrlPatterns: ["assets.adobedtm.com/launch*"],
    ...(desktop && desktopConfig.settings),
  };
}

function calculateTimeElapsed(startTime) {
  const totalTime = new Date() - startTime;
  const diffMins = Math.floor(totalTime / 60000);
  const diffSecs = Math.floor((totalTime % 60000) / 1000);
  return `${diffMins}m${diffSecs}`;
}

function calculateAverage(resultsArray, runs) {
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

function calculateMedian(resultsArray) {
  resultsArray.sort((a, b) => a.categories.performance.score - b.categories.performance.score);
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

async function runTests(url, runs, desktop) {
  const chrome = await launchChrome();
  const resultsArray = [];
  const startTime = new Date();
  const options = prepareOptions(chrome.port, desktop);

  try {
    for (let i = 0; i < runs; i++) {
      const runResult = await runLighthouse(url, options);
      resultsArray.push(runResult.lhr);
    }

    const timeElapsed = calculateTimeElapsed(startTime);
    const averageResult = calculateAverage(resultsArray, runs);
    const medianResult = calculateMedian(resultsArray);

    return { url, runs, desktop, timeElapsed, averageResult, medianResult };
  } finally {
    await closeChrome(chrome);
  }
}

export default async function lighthouseController(req, res) {
  const { url, runs, desktop } = req.body;

  try {
    const result = await runTests(url, runs, desktop);

    res.status(200).json({ status: 200, data: result, message: "Tests successful" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}
