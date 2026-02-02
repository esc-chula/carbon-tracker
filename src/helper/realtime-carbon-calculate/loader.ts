import type { RealtimeCarbonDetail } from "@/sections/project/helper/carbon-detail-builder";

type CarbonCalculatorResult = {
  scope1?: {
    activity?: number;
  };
  scope2?: {
    building?: number;
    generator?: number;
  };
  scope3?: {
    transportation?: number;
    attendee?: number;
    overnight?: number;
    souvenir?: number;
    waste?: number;
  };
  total?: number;
  error?: string;
};

type CarbonCalculator = (
  carbonDetail: RealtimeCarbonDetail,
  emissionFactors: Record<string, number>,
  csvContent: string,
) => CarbonCalculatorResult;

type GoInstance = {
  importObject: WebAssembly.Imports;
  run(instance: WebAssembly.Instance): Promise<void> | void;
};

type GoConstructor = new () => GoInstance;

declare global {
  interface Window {
    Go?: GoConstructor;
    calcCarbonWithCSV?: CarbonCalculator;
  }
}

const loadScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("Cannot load scripts outside the browser context"));
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-carbon-loader=\"${src}\"]`,
    );

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        resolve();
        return;
      }

      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () => {
        reject(new Error(`Failed to load script: ${src}`));
      });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.carbonLoader = src;

    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    });

    script.addEventListener("error", () => {
      reject(new Error(`Failed to load script: ${src}`));
    });

    document.body.appendChild(script);
  });

const waitForCalculator = (timeoutMs = 3000): Promise<void> =>
  new Promise((resolve, reject) => {
    const start = Date.now();

    const schedule =
      typeof window !== "undefined" &&
      typeof window.requestAnimationFrame === "function"
        ? window.requestAnimationFrame.bind(window)
        : (callback: FrameRequestCallback) => {
            window.setTimeout(() => callback(Date.now()), 16);
          };

    const check = () => {
      if (typeof window.calcCarbonWithCSV === "function") {
        resolve();
        return;
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error("Timed out waiting for carbon calculator"));
        return;
      }

      schedule(() => check());
    };

    check();
  });

const instantiateWasm = async (go: GoInstance) => {
  const response = await fetch("/wasm/main.wasm");
  if (!response.ok) {
    throw new Error("Failed to load carbon calculator wasm file");
  }

  if (WebAssembly.instantiateStreaming) {
    const clone = response.clone();
    try {
      return await WebAssembly.instantiateStreaming(response, go.importObject);
    } catch {
      const buffer = await clone.arrayBuffer();
      return await WebAssembly.instantiate(buffer, go.importObject);
    }
  }

  const buffer = await response.arrayBuffer();
  return await WebAssembly.instantiate(buffer, go.importObject);
};

let calculatorPromise: Promise<CarbonCalculator> | null = null;

async function loadCarbonCalculator(): Promise<CarbonCalculator> {
  if (typeof window === "undefined") {
    throw new Error("Carbon calculator is only available in the browser");
  }

  if (typeof window.calcCarbonWithCSV === "function") {
    return window.calcCarbonWithCSV;
  }

  calculatorPromise ??= (async () => {
    if (!window.Go) {
      await loadScript("/wasm/wasm_exec.js");
    }

    if (!window.Go) {
      throw new Error("Go runtime failed to load");
    }

    const go = new window.Go();
    const { instance } = await instantiateWasm(go);
    void go.run(instance);

    await waitForCalculator();

    if (typeof window.calcCarbonWithCSV !== "function") {
      throw new Error("Carbon calculator function is unavailable");
    }

    return window.calcCarbonWithCSV;
  })().catch((error) => {
    calculatorPromise = null;
    throw error;
  });

  return calculatorPromise;
}

export type { CarbonCalculator, CarbonCalculatorResult };
export { loadCarbonCalculator };
