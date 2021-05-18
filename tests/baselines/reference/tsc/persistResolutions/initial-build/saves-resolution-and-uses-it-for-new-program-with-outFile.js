Input::
//// [/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/src/project/src/anotherFileReusingResolution.ts]
import { something } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";

//// [/src/project/src/externalThing.d.ts]
export function externalThing1(): number;

//// [/src/project/src/filePresent.ts]
export function something() { return 10; }

//// [/src/project/src/fileWithRef.ts]
/// <reference path="./types.ts"/>

//// [/src/project/src/globalAnotherFileWithSameReferenes.ts]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


//// [/src/project/src/globalFilePresent.ts]
function globalSomething() { return 10; }

//// [/src/project/src/globalMain.ts]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }


//// [/src/project/src/main.ts]
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";

//// [/src/project/src/types.ts]
interface SomeType {}

//// [/src/project/tsconfig.json]
{"compilerOptions":{"module":"amd","composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"outFile.js"},"include":["src/**/*.ts"]}



Output::
/lib/tsc --p src/project
======== Resolving module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/filePresent.ts' exist - use it as a name resolution result.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThing.ts' does not exist.
File '/src/project/src/externalThing.tsx' does not exist.
File '/src/project/src/externalThing.d.ts' exist - use it as a name resolution result.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving module './filePresent' from '/src/project/src/main.ts'. ========
Resolution for module './filePresent' was found in cache from location '/src/project/src'.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThing' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThing' was found in cache from location '/src/project/src'.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalMain.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 6 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalMain(): void;
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalMain.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":882,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":337,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./src/globalfilenotfound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,11]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":12,"originalFileName":12,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":10,"index":0},{"kind":3,"file":10,"index":1}]},{"fileName":13,"originalFileName":13,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":10,"index":3}]},{"fileName":14,"originalFileName":14,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":8}]},{"fileName":15,"originalFileName":15,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":16,"originalFileName":16,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":8,"index":0},{"kind":0,"index":5},{"kind":4,"file":9,"index":0}]},{"fileName":17,"originalFileName":17,"path":8,"resolvedPath":8,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":18,"originalFileName":18,"path":9,"resolvedPath":9,"version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":6}]},{"fileName":10,"originalFileName":10,"path":10,"resolvedPath":10,"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":7}]}],"rootFileNames":[14,13,12,15,17,16,18,10,5],"filesByName":[[11,0]],"fileProcessingDiagnostics":[{"kind":1,"fileProcessingReason":{"kind":4,"file":8,"index":1},"diagnostic":"File_0_not_found","args":["/src/project/src/globalFileNotFound.ts"]},{"kind":1,"fileProcessingReason":{"kind":4,"file":9,"index":1},"diagnostic":"File_0_not_found","args":["/src/project/src/globalFileNotFound.ts"]}],"resolutions":[{"resolvedModule":{"resolvedFileName":12,"extension":".ts"}},{"failedLookupLocations":[19,20,21,22,23]},{"resolvedModule":{"resolvedFileName":13,"extension":".d.ts"},"failedLookupLocations":[24,25]},{"failedLookupLocations":[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57]}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-882)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-337)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalMain(): void;
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalMain.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 882,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 337,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./src/globalfilenotfound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalMain.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 6
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/main.ts",
        "./src/types.ts"
      ],
      "filesByName": {
        "./src/globalfilenotfound.ts": 0
      },
      "fileProcessingDiagnostics": [
        {
          "kind": "FilePreprocessingFileExplainingDiagnostic",
          "fileProcessingReason": {
            "kind": "ReferenceFile",
            "file": "./src/globalanotherfilewithsamereferenes.ts",
            "index": 1
          },
          "diagnostic": "File_0_not_found",
          "args": [
            "/src/project/src/globalFileNotFound.ts"
          ]
        },
        {
          "kind": "FilePreprocessingFileExplainingDiagnostic",
          "fileProcessingReason": {
            "kind": "ReferenceFile",
            "file": "./src/globalmain.ts",
            "index": 1
          },
          "diagnostic": "File_0_not_found",
          "args": [
            "/src/project/src/globalFileNotFound.ts"
          ]
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 9253
}



Change:: no-change-run
Input::


Output::
/lib/tsc --p src/project
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalMain.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 6 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Completely
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts] file written with same contents
//// [/src/project/outFile.js] file written with same contents
//// [/src/project/outFile.tsbuildinfo] file written with same contents
//// [/src/project/outFile.tsbuildinfo.baseline.txt] file written with same contents
//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: Modify globalMain file
Input::
//// [/src/project/src/globalMain.ts]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();



Output::
/lib/tsc --p src/project
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalMain.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 6 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Completely
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts] file written with same contents
//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalMain.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":902,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":337,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./src/globalfilenotfound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,11]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":12,"originalFileName":12,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":10,"index":0},{"kind":3,"file":10,"index":1}]},{"fileName":13,"originalFileName":13,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":10,"index":3}]},{"fileName":14,"originalFileName":14,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":8}]},{"fileName":15,"originalFileName":15,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":16,"originalFileName":16,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":8,"index":0},{"kind":0,"index":5},{"kind":4,"file":9,"index":0}]},{"fileName":17,"originalFileName":17,"path":8,"resolvedPath":8,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":18,"originalFileName":18,"path":9,"resolvedPath":9,"version":"-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":6}]},{"fileName":10,"originalFileName":10,"path":10,"resolvedPath":10,"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":7}]}],"rootFileNames":[14,13,12,15,17,16,18,10,5],"filesByName":[[11,0]],"fileProcessingDiagnostics":[{"kind":1,"fileProcessingReason":{"kind":4,"file":8,"index":1},"diagnostic":"File_0_not_found","args":["/src/project/src/globalFileNotFound.ts"]},{"kind":1,"fileProcessingReason":{"kind":4,"file":9,"index":1},"diagnostic":"File_0_not_found","args":["/src/project/src/globalFileNotFound.ts"]}],"resolutions":[{"resolvedModule":{"resolvedFileName":12,"extension":".ts"}},{"failedLookupLocations":[19,20,21,22,23]},{"resolvedModule":{"resolvedFileName":13,"extension":".d.ts"},"failedLookupLocations":[24,25]},{"failedLookupLocations":[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57]}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-902)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-337)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalMain(): void;
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalMain.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 902,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 337,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./src/globalfilenotfound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalMain.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 6
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/main.ts",
        "./src/types.ts"
      ],
      "filesByName": {
        "./src/globalfilenotfound.ts": 0
      },
      "fileProcessingDiagnostics": [
        {
          "kind": "FilePreprocessingFileExplainingDiagnostic",
          "fileProcessingReason": {
            "kind": "ReferenceFile",
            "file": "./src/globalanotherfilewithsamereferenes.ts",
            "index": 1
          },
          "diagnostic": "File_0_not_found",
          "args": [
            "/src/project/src/globalFileNotFound.ts"
          ]
        },
        {
          "kind": "FilePreprocessingFileExplainingDiagnostic",
          "fileProcessingReason": {
            "kind": "ReferenceFile",
            "file": "./src/globalmain.ts",
            "index": 1
          },
          "diagnostic": "File_0_not_found",
          "args": [
            "/src/project/src/globalFileNotFound.ts"
          ]
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 9287
}



Change:: Add new globalFile and update globalMain file
Input::
//// [/src/project/src/globalMain.ts]
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();globalFoo();

//// [/src/project/src/globalNewFile.ts]
function globalFoo() { return 20; }



Output::
/lib/tsc --p src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalMain.ts[0m:[93m3[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m3[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 6 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":997,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":376,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./src/globalfilenotfound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,12],[7,9,12]],"referencedMap":[[4,1],[6,2],[8,3],[10,4],[11,1]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":13,"originalFileName":13,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":11,"index":0},{"kind":3,"file":11,"index":1}]},{"fileName":14,"originalFileName":14,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":11,"index":3}]},{"fileName":15,"originalFileName":15,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":9}]},{"fileName":16,"originalFileName":16,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":17,"originalFileName":17,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":8,"index":0},{"kind":0,"index":5},{"kind":4,"file":10,"index":1}]},{"fileName":18,"originalFileName":18,"path":8,"resolvedPath":8,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":19,"originalFileName":19,"path":9,"resolvedPath":9,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":0},{"kind":0,"index":7}]},{"fileName":20,"originalFileName":20,"path":10,"resolvedPath":10,"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":6}]},{"fileName":11,"originalFileName":11,"path":11,"resolvedPath":11,"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":8}]}],"rootFileNames":[15,14,13,16,18,17,20,19,11,5],"filesByName":[[12,0]],"fileProcessingDiagnostics":[{"kind":1,"fileProcessingReason":{"kind":4,"file":8,"index":1},"diagnostic":"File_0_not_found","args":["/src/project/src/globalFileNotFound.ts"]},{"kind":1,"fileProcessingReason":{"kind":4,"file":10,"index":2},"diagnostic":"File_0_not_found","args":["/src/project/src/globalFileNotFound.ts"]}],"resolutions":[{"resolvedModule":{"resolvedFileName":13,"extension":".ts"}},{"failedLookupLocations":[21,22,23,24,25]},{"resolvedModule":{"resolvedFileName":14,"extension":".d.ts"},"failedLookupLocations":[26,27]},{"failedLookupLocations":[28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-997)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-376)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 997,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 376,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./src/globalfilenotfound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalnewfile.ts",
        "./src/globalfilenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalnewfile.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 6
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/types.ts"
      ],
      "filesByName": {
        "./src/globalfilenotfound.ts": 0
      },
      "fileProcessingDiagnostics": [
        {
          "kind": "FilePreprocessingFileExplainingDiagnostic",
          "fileProcessingReason": {
            "kind": "ReferenceFile",
            "file": "./src/globalanotherfilewithsamereferenes.ts",
            "index": 1
          },
          "diagnostic": "File_0_not_found",
          "args": [
            "/src/project/src/globalFileNotFound.ts"
          ]
        },
        {
          "kind": "FilePreprocessingFileExplainingDiagnostic",
          "fileProcessingReason": {
            "kind": "ReferenceFile",
            "file": "./src/globalmain.ts",
            "index": 2
          },
          "diagnostic": "File_0_not_found",
          "args": [
            "/src/project/src/globalFileNotFound.ts"
          ]
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 9825
}



Change:: Write file that could not be resolved by referenced path
Input::
//// [/src/project/src/globalFileNotFound.ts]
function globalSomething2() { return 20; }



Output::
/lib/tsc --p src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1041,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":422,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":13,"originalFileName":13,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":12,"index":0},{"kind":3,"file":12,"index":1}]},{"fileName":14,"originalFileName":14,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":12,"index":3}]},{"fileName":15,"originalFileName":15,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":10}]},{"fileName":16,"originalFileName":16,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":17,"originalFileName":17,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":0},{"kind":0,"index":6},{"kind":4,"file":11,"index":1}]},{"fileName":18,"originalFileName":18,"path":8,"resolvedPath":8,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":1},{"kind":0,"index":5},{"kind":4,"file":11,"index":2}]},{"fileName":19,"originalFileName":19,"path":9,"resolvedPath":9,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":10,"resolvedPath":10,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":8}]},{"fileName":21,"originalFileName":21,"path":11,"resolvedPath":11,"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":7}]},{"fileName":12,"originalFileName":12,"path":12,"resolvedPath":12,"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":9}]}],"rootFileNames":[15,14,13,16,19,18,17,21,20,12,5],"resolutions":[{"resolvedModule":{"resolvedFileName":13,"extension":".ts"}},{"failedLookupLocations":[22,23,24,25,26]},{"resolvedModule":{"resolvedFileName":14,"extension":".d.ts"},"failedLookupLocations":[27,28]},{"failedLookupLocations":[29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-1041)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-422)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1041,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 422,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/types.ts"
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 9900
}



Change:: Clean resolutions
Input::


Output::
/lib/tsc --p src/project --cleanPersistedProgram
exitCode:: ExitStatus.Success


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1041,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":422,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[]},"version":"FakeTSVersion"}



Change:: Clean resolutions again
Input::


Output::
/lib/tsc --p src/project --cleanPersistedProgram
exitCode:: ExitStatus.Success




Change:: no-change-run
Input::


Output::
/lib/tsc --p src/project
======== Resolving module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/filePresent.ts' exist - use it as a name resolution result.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThing.ts' does not exist.
File '/src/project/src/externalThing.tsx' does not exist.
File '/src/project/src/externalThing.d.ts' exist - use it as a name resolution result.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving module './filePresent' from '/src/project/src/main.ts'. ========
Resolution for module './filePresent' was found in cache from location '/src/project/src'.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThing' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThing' was found in cache from location '/src/project/src'.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts] file written with same contents
//// [/src/project/outFile.js] file written with same contents
//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1041,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":422,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":13,"originalFileName":13,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":12,"index":0},{"kind":3,"file":12,"index":1}]},{"fileName":14,"originalFileName":14,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":12,"index":3}]},{"fileName":15,"originalFileName":15,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":10}]},{"fileName":16,"originalFileName":16,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":17,"originalFileName":17,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":0},{"kind":0,"index":6},{"kind":4,"file":11,"index":1}]},{"fileName":18,"originalFileName":18,"path":8,"resolvedPath":8,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":1},{"kind":0,"index":5},{"kind":4,"file":11,"index":2}]},{"fileName":19,"originalFileName":19,"path":9,"resolvedPath":9,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":10,"resolvedPath":10,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":8}]},{"fileName":21,"originalFileName":21,"path":11,"resolvedPath":11,"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":7}]},{"fileName":12,"originalFileName":12,"path":12,"resolvedPath":12,"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":9}]}],"rootFileNames":[15,14,13,16,19,18,17,21,20,12,5],"resolutions":[{"resolvedModule":{"resolvedFileName":13,"extension":".ts"}},{"failedLookupLocations":[22,23,24,25,26]},{"resolvedModule":{"resolvedFileName":14,"extension":".d.ts"},"failedLookupLocations":[27,28]},{"failedLookupLocations":[29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt] file written with same contents
//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: Modify global main file
Input::
//// [/src/project/src/globalMain.ts]
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();globalFoo();globalSomething();



Output::
/lib/tsc --p src/project
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Completely
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts] file written with same contents
//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1061,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":422,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":13,"originalFileName":13,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":12,"index":0},{"kind":3,"file":12,"index":1}]},{"fileName":14,"originalFileName":14,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":12,"index":3}]},{"fileName":15,"originalFileName":15,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":10}]},{"fileName":16,"originalFileName":16,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":17,"originalFileName":17,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":0},{"kind":0,"index":6},{"kind":4,"file":11,"index":1}]},{"fileName":18,"originalFileName":18,"path":8,"resolvedPath":8,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":1},{"kind":0,"index":5},{"kind":4,"file":11,"index":2}]},{"fileName":19,"originalFileName":19,"path":9,"resolvedPath":9,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":10,"resolvedPath":10,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":8}]},{"fileName":21,"originalFileName":21,"path":11,"resolvedPath":11,"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":7}]},{"fileName":12,"originalFileName":12,"path":12,"resolvedPath":12,"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":9}]}],"rootFileNames":[15,14,13,16,19,18,17,21,20,12,5],"resolutions":[{"resolvedModule":{"resolvedFileName":13,"extension":".ts"}},{"failedLookupLocations":[22,23,24,25,26]},{"resolvedModule":{"resolvedFileName":14,"extension":".d.ts"},"failedLookupLocations":[27,28]},{"failedLookupLocations":[29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-1061)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-422)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1061,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 422,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/types.ts"
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 9936
}



Change:: Modify main file
Input::
//// [/src/project/src/main.ts]
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";something();



Output::
/lib/tsc --p src/project
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Completely
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts] file written with same contents
//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1127,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":422,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":13,"originalFileName":13,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":12,"index":0},{"kind":3,"file":12,"index":1}]},{"fileName":14,"originalFileName":14,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":12,"index":3}]},{"fileName":15,"originalFileName":15,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":10}]},{"fileName":16,"originalFileName":16,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":17,"originalFileName":17,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":0},{"kind":0,"index":6},{"kind":4,"file":11,"index":1}]},{"fileName":18,"originalFileName":18,"path":8,"resolvedPath":8,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":1},{"kind":0,"index":5},{"kind":4,"file":11,"index":2}]},{"fileName":19,"originalFileName":19,"path":9,"resolvedPath":9,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":10,"resolvedPath":10,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":8}]},{"fileName":21,"originalFileName":21,"path":11,"resolvedPath":11,"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":7}]},{"fileName":12,"originalFileName":12,"path":12,"resolvedPath":12,"version":"-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":9}]}],"rootFileNames":[15,14,13,16,19,18,17,21,20,12,5],"resolutions":[{"resolvedModule":{"resolvedFileName":13,"extension":".ts"}},{"failedLookupLocations":[22,23,24,25,26]},{"resolvedModule":{"resolvedFileName":14,"extension":".d.ts"},"failedLookupLocations":[27,28]},{"failedLookupLocations":[29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-1127)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-422)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1127,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 422,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/types.ts"
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 9960
}



Change:: Add new module and update main file
Input::
//// [/src/project/src/main.ts]
import { foo } from "./newFile";import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";something();

//// [/src/project/src/newFile.ts]
export function foo() { return 20; }



Output::
/lib/tsc --p src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './newFile' from '/src/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/newFile.ts' exist - use it as a name resolution result.
======== Module name './newFile' was successfully resolved to '/src/project/src/newFile.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1346,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":493,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":14,"originalFileName":14,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":13,"index":1},{"kind":3,"file":13,"index":2}]},{"fileName":15,"originalFileName":15,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":13,"index":4}]},{"fileName":16,"originalFileName":16,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":11}]},{"fileName":17,"originalFileName":17,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":18,"originalFileName":18,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":0},{"kind":0,"index":6},{"kind":4,"file":11,"index":1}]},{"fileName":19,"originalFileName":19,"path":8,"resolvedPath":8,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":1},{"kind":0,"index":5},{"kind":4,"file":11,"index":2}]},{"fileName":20,"originalFileName":20,"path":9,"resolvedPath":9,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":21,"originalFileName":21,"path":10,"resolvedPath":10,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":8}]},{"fileName":22,"originalFileName":22,"path":11,"resolvedPath":11,"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":7}]},{"fileName":23,"originalFileName":23,"path":12,"resolvedPath":12,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":13,"index":0},{"kind":0,"index":10}]},{"fileName":13,"originalFileName":13,"path":13,"resolvedPath":13,"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":9}]}],"rootFileNames":[16,15,14,17,20,19,18,22,21,13,23,5],"resolutions":[{"resolvedModule":{"resolvedFileName":14,"extension":".ts"}},{"failedLookupLocations":[24,25,26,27,28]},{"resolvedModule":{"resolvedFileName":15,"extension":".d.ts"},"failedLookupLocations":[29,30]},{"failedLookupLocations":[31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62]},{"resolvedModule":{"resolvedFileName":23,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-1346)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-493)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1346,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 493,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 11
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/newFile.ts",
          "originalFileName": "./src/newFile.ts",
          "path": "./src/newfile.ts",
          "resolvedPath": "./src/newfile.ts",
          "version": "4428918903-export function foo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./newFile"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./newFile",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/newFile.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/newFile.ts",
        "./src/types.ts"
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 10489
}



Change:: Write file that could not be resolved
Input::
//// [/src/project/src/fileNotFound.ts]
export function something2() { return 20; }



Output::
/lib/tsc --p src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' exist - use it as a name resolution result.
======== Module name './fileNotFound' was successfully resolved to '/src/project/src/fileNotFound.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was successfully resolved to '/src/project/src/fileNotFound.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/fileNotFound.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1598,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":576,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filePresent.ts","./src/fileNotFound.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":15,"originalFileName":15,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":0},{"kind":0,"index":3},{"kind":3,"file":14,"index":1},{"kind":3,"file":14,"index":2}]},{"fileName":16,"originalFileName":16,"path":3,"resolvedPath":3,"version":"-497034637-export function something2() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":1},{"kind":0,"index":2},{"kind":3,"file":14,"index":3}]},{"fileName":17,"originalFileName":17,"path":4,"resolvedPath":4,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":5,"index":2},{"kind":0,"index":1},{"kind":3,"file":14,"index":4}]},{"fileName":18,"originalFileName":18,"path":5,"resolvedPath":5,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":6,"originalFileName":6,"path":6,"resolvedPath":6,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":7,"index":0},{"kind":0,"index":12}]},{"fileName":19,"originalFileName":19,"path":7,"resolvedPath":7,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":8,"resolvedPath":8,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":0},{"kind":0,"index":7},{"kind":4,"file":12,"index":1}]},{"fileName":21,"originalFileName":21,"path":9,"resolvedPath":9,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":1},{"kind":0,"index":6},{"kind":4,"file":12,"index":2}]},{"fileName":22,"originalFileName":22,"path":10,"resolvedPath":10,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":5}]},{"fileName":23,"originalFileName":23,"path":11,"resolvedPath":11,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":12,"index":0},{"kind":0,"index":9}]},{"fileName":24,"originalFileName":24,"path":12,"resolvedPath":12,"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":8}]},{"fileName":25,"originalFileName":25,"path":13,"resolvedPath":13,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":14,"index":0},{"kind":0,"index":11}]},{"fileName":14,"originalFileName":14,"path":14,"resolvedPath":14,"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":10}]}],"rootFileNames":[18,17,16,15,19,22,21,20,24,23,14,25,6],"resolutions":[{"resolvedModule":{"resolvedFileName":15,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".d.ts"},"failedLookupLocations":[26,27]},{"failedLookupLocations":[28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]},{"resolvedModule":{"resolvedFileName":25,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-1598)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-576)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1598,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 576,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 3
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/fileNotFound.ts",
          "originalFileName": "./src/fileNotFound.ts",
          "path": "./src/filenotfound.ts",
          "resolvedPath": "./src/filenotfound.ts",
          "version": "-497034637-export function something2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 12
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 7
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 5
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/newFile.ts",
          "originalFileName": "./src/newFile.ts",
          "path": "./src/newfile.ts",
          "resolvedPath": "./src/newfile.ts",
          "version": "4428918903-export function foo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 11
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./newFile"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./newFile",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/newFile.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/fileNotFound.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/newFile.ts",
        "./src/types.ts"
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 10797
}



Change:: Clean resolutions
Input::


Output::
/lib/tsc --p src/project --cleanPersistedProgram
exitCode:: ExitStatus.Success


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/fileNotFound.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1598,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":576,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filePresent.ts","./src/fileNotFound.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[]},"version":"FakeTSVersion"}



Change:: Clean resolutions again
Input::


Output::
/lib/tsc --p src/project --cleanPersistedProgram
exitCode:: ExitStatus.Success




Change:: no-change-run
Input::


Output::
/lib/tsc --p src/project
======== Resolving module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/filePresent.ts' exist - use it as a name resolution result.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' exist - use it as a name resolution result.
======== Module name './fileNotFound' was successfully resolved to '/src/project/src/fileNotFound.ts'. ========
======== Resolving module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThing.ts' does not exist.
File '/src/project/src/externalThing.tsx' does not exist.
File '/src/project/src/externalThing.d.ts' exist - use it as a name resolution result.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving module './newFile' from '/src/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/newFile.ts' exist - use it as a name resolution result.
======== Module name './newFile' was successfully resolved to '/src/project/src/newFile.ts'. ========
======== Resolving module './filePresent' from '/src/project/src/main.ts'. ========
Resolution for module './filePresent' was found in cache from location '/src/project/src'.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was successfully resolved to '/src/project/src/fileNotFound.ts'. ========
======== Resolving module 'externalThing' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThing' was found in cache from location '/src/project/src'.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts] file written with same contents
//// [/src/project/outFile.js] file written with same contents
//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/fileNotFound.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1598,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":576,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filePresent.ts","./src/fileNotFound.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":15,"originalFileName":15,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":0},{"kind":0,"index":3},{"kind":3,"file":14,"index":1},{"kind":3,"file":14,"index":2}]},{"fileName":16,"originalFileName":16,"path":3,"resolvedPath":3,"version":"-497034637-export function something2() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":1},{"kind":0,"index":2},{"kind":3,"file":14,"index":3}]},{"fileName":17,"originalFileName":17,"path":4,"resolvedPath":4,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":5,"index":2},{"kind":0,"index":1},{"kind":3,"file":14,"index":4}]},{"fileName":18,"originalFileName":18,"path":5,"resolvedPath":5,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":6,"originalFileName":6,"path":6,"resolvedPath":6,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":7,"index":0},{"kind":0,"index":12}]},{"fileName":19,"originalFileName":19,"path":7,"resolvedPath":7,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":8,"resolvedPath":8,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":0},{"kind":0,"index":7},{"kind":4,"file":12,"index":1}]},{"fileName":21,"originalFileName":21,"path":9,"resolvedPath":9,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":1},{"kind":0,"index":6},{"kind":4,"file":12,"index":2}]},{"fileName":22,"originalFileName":22,"path":10,"resolvedPath":10,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":5}]},{"fileName":23,"originalFileName":23,"path":11,"resolvedPath":11,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":12,"index":0},{"kind":0,"index":9}]},{"fileName":24,"originalFileName":24,"path":12,"resolvedPath":12,"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":8}]},{"fileName":25,"originalFileName":25,"path":13,"resolvedPath":13,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":14,"index":0},{"kind":0,"index":11}]},{"fileName":14,"originalFileName":14,"path":14,"resolvedPath":14,"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":10}]}],"rootFileNames":[18,17,16,15,19,22,21,20,24,23,14,25,6],"resolutions":[{"resolvedModule":{"resolvedFileName":15,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".d.ts"},"failedLookupLocations":[26,27]},{"failedLookupLocations":[28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]},{"resolvedModule":{"resolvedFileName":25,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt] file written with same contents
//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: Modify main file
Input::
//// [/src/project/src/main.ts]
import { foo } from "./newFile";import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";something();something();



Output::
/lib/tsc --p src/project
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Completely
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts] file written with same contents
//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/fileNotFound.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1630,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":576,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filePresent.ts","./src/fileNotFound.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":15,"originalFileName":15,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":0},{"kind":0,"index":3},{"kind":3,"file":14,"index":1},{"kind":3,"file":14,"index":2}]},{"fileName":16,"originalFileName":16,"path":3,"resolvedPath":3,"version":"-497034637-export function something2() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":1},{"kind":0,"index":2},{"kind":3,"file":14,"index":3}]},{"fileName":17,"originalFileName":17,"path":4,"resolvedPath":4,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":5,"index":2},{"kind":0,"index":1},{"kind":3,"file":14,"index":4}]},{"fileName":18,"originalFileName":18,"path":5,"resolvedPath":5,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":6,"originalFileName":6,"path":6,"resolvedPath":6,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":7,"index":0},{"kind":0,"index":12}]},{"fileName":19,"originalFileName":19,"path":7,"resolvedPath":7,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":8,"resolvedPath":8,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":0},{"kind":0,"index":7},{"kind":4,"file":12,"index":1}]},{"fileName":21,"originalFileName":21,"path":9,"resolvedPath":9,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":1},{"kind":0,"index":6},{"kind":4,"file":12,"index":2}]},{"fileName":22,"originalFileName":22,"path":10,"resolvedPath":10,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":5}]},{"fileName":23,"originalFileName":23,"path":11,"resolvedPath":11,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":12,"index":0},{"kind":0,"index":9}]},{"fileName":24,"originalFileName":24,"path":12,"resolvedPath":12,"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":8}]},{"fileName":25,"originalFileName":25,"path":13,"resolvedPath":13,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":14,"index":0},{"kind":0,"index":11}]},{"fileName":14,"originalFileName":14,"path":14,"resolvedPath":14,"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":10}]}],"rootFileNames":[18,17,16,15,19,22,21,20,24,23,14,25,6],"resolutions":[{"resolvedModule":{"resolvedFileName":15,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".d.ts"},"failedLookupLocations":[26,27]},{"failedLookupLocations":[28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]},{"resolvedModule":{"resolvedFileName":25,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-1630)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-576)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1630,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 576,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 3
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/fileNotFound.ts",
          "originalFileName": "./src/fileNotFound.ts",
          "path": "./src/filenotfound.ts",
          "resolvedPath": "./src/filenotfound.ts",
          "version": "-497034637-export function something2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 12
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 7
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 5
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/newFile.ts",
          "originalFileName": "./src/newFile.ts",
          "path": "./src/newfile.ts",
          "resolvedPath": "./src/newfile.ts",
          "version": "4428918903-export function foo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 11
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./newFile"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./newFile",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/newFile.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/fileNotFound.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/newFile.ts",
        "./src/types.ts"
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 10821
}



Change:: Delete file that could not be resolved
Input::
//// [/src/project/src/fileNotFound.ts] unlink


Output::
/lib/tsc --p src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1378,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":493,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/filenotfound.ts","./src/fileNotFound.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":14,"originalFileName":14,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":13,"index":1},{"kind":3,"file":13,"index":2}]},{"fileName":15,"originalFileName":15,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":13,"index":4}]},{"fileName":16,"originalFileName":16,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":11}]},{"fileName":17,"originalFileName":17,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":18,"originalFileName":18,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":0},{"kind":0,"index":6},{"kind":4,"file":11,"index":1}]},{"fileName":19,"originalFileName":19,"path":8,"resolvedPath":8,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":1},{"kind":0,"index":5},{"kind":4,"file":11,"index":2}]},{"fileName":20,"originalFileName":20,"path":9,"resolvedPath":9,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":21,"originalFileName":21,"path":10,"resolvedPath":10,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":8}]},{"fileName":22,"originalFileName":22,"path":11,"resolvedPath":11,"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":7}]},{"fileName":23,"originalFileName":23,"path":12,"resolvedPath":12,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":13,"index":0},{"kind":0,"index":10}]},{"fileName":13,"originalFileName":13,"path":13,"resolvedPath":13,"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":9}]}],"rootFileNames":[16,15,14,17,20,19,18,22,21,13,23,5],"filesByName":[[24,0]],"resolutions":[{"resolvedModule":{"resolvedFileName":14,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":25,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":15,"extension":".d.ts"},"failedLookupLocations":[26,27]},{"failedLookupLocations":[28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]},{"resolvedModule":{"resolvedFileName":23,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-1378)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-493)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1378,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 493,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/filenotfound.ts",
      "./src/fileNotFound.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 11
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/newFile.ts",
          "originalFileName": "./src/newFile.ts",
          "path": "./src/newfile.ts",
          "resolvedPath": "./src/newfile.ts",
          "version": "4428918903-export function foo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./newFile"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./newFile",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/newFile.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/newFile.ts",
        "./src/types.ts"
      ],
      "filesByName": {
        "./src/filenotfound.ts": 0
      },
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 10478
}



Change:: Create external module file that could not be resolved
Input::
//// [/src/project/src/externalThingNotPresent.ts]
export function externalThing2() { return 20; }



Output::
/lib/tsc --p src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' exist - use it as a name resolution result.
======== Module name 'externalThingNotPresent' was successfully resolved to '/src/project/src/externalThingNotPresent.ts'. ========
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was successfully resolved to '/src/project/src/externalThingNotPresent.ts'. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/externalThingNotPresent.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/externalThingNotPresent.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/externalThingNotPresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1657,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":591,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThingNotPresent.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/filenotfound.ts","./src/fileNotFound.ts","./src/externalThing.ts","./src/externalThing.tsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"5318862050-export function externalThing2() { return 20; }","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":15,"originalFileName":15,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":0},{"kind":0,"index":3},{"kind":3,"file":14,"index":1},{"kind":3,"file":14,"index":2}]},{"fileName":16,"originalFileName":16,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":5,"index":2},{"kind":0,"index":1},{"kind":3,"file":14,"index":4}]},{"fileName":17,"originalFileName":17,"path":4,"resolvedPath":4,"version":"5318862050-export function externalThing2() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":3},{"kind":0,"index":2},{"kind":3,"file":14,"index":5}]},{"fileName":18,"originalFileName":18,"path":5,"resolvedPath":5,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":6,"originalFileName":6,"path":6,"resolvedPath":6,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":7,"index":0},{"kind":0,"index":12}]},{"fileName":19,"originalFileName":19,"path":7,"resolvedPath":7,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":8,"resolvedPath":8,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":0},{"kind":0,"index":7},{"kind":4,"file":12,"index":1}]},{"fileName":21,"originalFileName":21,"path":9,"resolvedPath":9,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":1},{"kind":0,"index":6},{"kind":4,"file":12,"index":2}]},{"fileName":22,"originalFileName":22,"path":10,"resolvedPath":10,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":5}]},{"fileName":23,"originalFileName":23,"path":11,"resolvedPath":11,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":12,"index":0},{"kind":0,"index":9}]},{"fileName":24,"originalFileName":24,"path":12,"resolvedPath":12,"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":8}]},{"fileName":25,"originalFileName":25,"path":13,"resolvedPath":13,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":14,"index":0},{"kind":0,"index":11}]},{"fileName":14,"originalFileName":14,"path":14,"resolvedPath":14,"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":10}]}],"rootFileNames":[18,16,17,15,19,22,21,20,24,23,14,25,6],"filesByName":[[26,0]],"resolutions":[{"resolvedModule":{"resolvedFileName":15,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":27,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":16,"extension":".d.ts"},"failedLookupLocations":[28,29]},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":25,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-1657)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-591)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/externalThingNotPresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1657,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 591,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThingNotPresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/filenotfound.ts",
      "./src/fileNotFound.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/externalthingnotpresent.ts": {
        "version": "5318862050-export function externalThing2() { return 20; }"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 3
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/externalThingNotPresent.ts",
          "originalFileName": "./src/externalThingNotPresent.ts",
          "path": "./src/externalthingnotpresent.ts",
          "resolvedPath": "./src/externalthingnotpresent.ts",
          "version": "5318862050-export function externalThing2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 3
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 5
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThingNotPresent.ts",
                  "extension": ".ts"
                }
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 12
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 7
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 5
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/newFile.ts",
          "originalFileName": "./src/newFile.ts",
          "path": "./src/newfile.ts",
          "resolvedPath": "./src/newfile.ts",
          "version": "4428918903-export function foo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 11
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./newFile"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./newFile",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/newFile.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThingNotPresent.ts",
                  "extension": ".ts"
                }
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/externalThingNotPresent.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/newFile.ts",
        "./src/types.ts"
      ],
      "filesByName": {
        "./src/filenotfound.ts": 0
      },
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThingNotPresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 9470
}



Change:: Write .ts file that takes preference over resolved .d.ts file
Input::
//// [/src/project/src/externalThing.ts]
export function externalThing1() { return 10; }



Output::
/lib/tsc --p src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThingNotPresent.ts'.
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThingNotPresent.ts'.
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.ts","/src/project/src/externalThingNotPresent.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/externalThingNotPresent.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/externalThing.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
declare module "src/externalThing" {
    export function externalThing1(): number;
}
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("src/externalThing", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing1 = void 0;
    function externalThing1() { return 10; }
    exports.externalThing1 = externalThing1;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/externalThingNotPresent.ts","./src/anotherFileReusingResolution.ts","./src/externalThing.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1926,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":679,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/externalthing.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThingNotPresent.ts","./src/anotherFileReusingResolution.ts","./src/externalThing.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/filenotfound.ts","./src/fileNotFound.ts","./src/externalThing.tsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"5318862050-export function externalThing2() { return 20; }","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"5618215488-export function externalThing1() { return 10; }","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3,4],[7],[9,10],[9,10,12],[2,3,4,14]],"referencedMap":[[5,1],[8,2],[11,3],[13,4],[15,5]],"exportedModulesMap":[],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":16,"originalFileName":16,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":0},{"kind":0,"index":3},{"kind":3,"file":15,"index":1},{"kind":3,"file":15,"index":2}]},{"fileName":17,"originalFileName":17,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":5,"index":2},{"kind":3,"file":15,"index":4}]},{"fileName":18,"originalFileName":18,"path":4,"resolvedPath":4,"version":"5318862050-export function externalThing2() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":3},{"kind":0,"index":2},{"kind":3,"file":15,"index":5}]},{"fileName":19,"originalFileName":19,"path":5,"resolvedPath":5,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":20,"originalFileName":20,"path":6,"resolvedPath":6,"version":"5618215488-export function externalThing1() { return 10; }","flags":0,"includeReasons":[{"kind":0,"index":1}]},{"fileName":7,"originalFileName":7,"path":7,"resolvedPath":7,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":8,"index":0},{"kind":0,"index":12}]},{"fileName":21,"originalFileName":21,"path":8,"resolvedPath":8,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":22,"originalFileName":22,"path":9,"resolvedPath":9,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":7},{"kind":4,"file":13,"index":1}]},{"fileName":23,"originalFileName":23,"path":10,"resolvedPath":10,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":1},{"kind":0,"index":6},{"kind":4,"file":13,"index":2}]},{"fileName":24,"originalFileName":24,"path":11,"resolvedPath":11,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":5}]},{"fileName":25,"originalFileName":25,"path":12,"resolvedPath":12,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":13,"index":0},{"kind":0,"index":9}]},{"fileName":26,"originalFileName":26,"path":13,"resolvedPath":13,"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":8}]},{"fileName":27,"originalFileName":27,"path":14,"resolvedPath":14,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":15,"index":0},{"kind":0,"index":11}]},{"fileName":15,"originalFileName":15,"path":15,"resolvedPath":15,"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":10}]}],"rootFileNames":[19,20,18,16,21,24,23,22,26,25,15,27,7],"filesByName":[[28,0]],"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":29,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".d.ts"},"failedLookupLocations":[20,30]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":27,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-1926)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("src/externalThing", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing1 = void 0;
    function externalThing1() { return 10; }
    exports.externalThing1 = externalThing1;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-679)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
declare module "src/externalThing" {
    export function externalThing1(): number;
}
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/externalThingNotPresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/externalThing.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1926,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 679,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/externalthing.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThingNotPresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/externalThing.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/filenotfound.ts",
      "./src/fileNotFound.ts",
      "./src/externalThing.tsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/externalthingnotpresent.ts": {
        "version": "5318862050-export function externalThing2() { return 20; }"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/externalthing.ts": {
        "version": "5618215488-export function externalThing1() { return 10; }"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 3
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/externalThingNotPresent.ts",
          "originalFileName": "./src/externalThingNotPresent.ts",
          "path": "./src/externalthingnotpresent.ts",
          "resolvedPath": "./src/externalthingnotpresent.ts",
          "version": "5318862050-export function externalThing2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 3
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 5
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThingNotPresent.ts",
                  "extension": ".ts"
                }
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/externalThing.ts",
          "originalFileName": "./src/externalThing.ts",
          "path": "./src/externalthing.ts",
          "resolvedPath": "./src/externalthing.ts",
          "version": "5618215488-export function externalThing1() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 12
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 7
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 5
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/newFile.ts",
          "originalFileName": "./src/newFile.ts",
          "path": "./src/newfile.ts",
          "resolvedPath": "./src/newfile.ts",
          "version": "4428918903-export function foo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 11
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./newFile"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./newFile",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/newFile.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThingNotPresent.ts",
                  "extension": ".ts"
                }
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.ts",
        "./src/externalThingNotPresent.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/newFile.ts",
        "./src/types.ts"
      ],
      "filesByName": {
        "./src/filenotfound.ts": 0
      },
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThingNotPresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 9779
}

