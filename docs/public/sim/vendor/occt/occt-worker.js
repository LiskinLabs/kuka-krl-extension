/*
 * Liskin Labs OCCT STEP/IGES/BREP tessellation worker.
 * Keeps heavy CAD parsing off the main thread so the simulator UI stays responsive.
 * The LGPL-2.1 occt-import-js glue/WASM remain unmodified next to this file.
 */
'use strict';

let modulePromise = null;
let moduleFailure = null;

function loadModule() {
  if (moduleFailure) return Promise.reject(moduleFailure);
  if (!modulePromise) {
    try {
      importScripts(new URL('occt-import-js.js', self.location.href).href);
      if (typeof self.occtimportjs !== 'function') {
        throw new Error('occtimportjs runtime is unavailable inside the worker.');
      }
      modulePromise = self.occtimportjs({
        locateFile: (file) => new URL(file, self.location.href).href,
      });
    } catch (err) {
      moduleFailure = err instanceof Error ? err : new Error(String(err));
      return Promise.reject(moduleFailure);
    }
  }
  return modulePromise;
}

self.onmessage = async (event) => {
  const msg = event.data || {};
  if (msg.type !== 'parse') return;
  const { id, kind, buffer, params } = msg;
  try {
    self.postMessage({ id, stage: 'module' });
    const module = await loadModule();
    self.postMessage({ id, stage: 'parse' });
    const bytes = new Uint8Array(buffer);
    const result =
      kind === 'iges'
        ? module.ReadIgesFile(bytes, params)
        : kind === 'brep'
          ? module.ReadBrepFile(bytes, null)
          : module.ReadStepFile(bytes, params);
    self.postMessage({ id, ok: true, result });
  } catch (err) {
    self.postMessage({ id, ok: false, error: err instanceof Error ? err.message : String(err) });
  }
};
