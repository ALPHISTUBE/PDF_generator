"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/oauth/page",{

/***/ "(app-pages-browser)/./src/components/home/google-login.jsx":
/*!**********************************************!*\
  !*** ./src/components/home/google-login.jsx ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\nconst GoogleLogin = ()=>{\n    _s();\n    const handleGoogleLogin = async ()=>{\n        try {\n            const res = await fetch(\"http://localhost:8000/api/user/auth/google/\");\n            const { auth_url } = await res.json();\n            window.location.href = auth_url;\n        } catch (error) {\n            console.error(\"Error during Google login:\", error);\n        }\n    };\n    useEffect(()=>{\n        if (true) {\n            // Parse query parameters from the URL\n            const params = new URLSearchParams(window.location.search);\n            const username = params.get(\"username\");\n            const email = params.get(\"email\");\n            const accessToken = params.get(\"access_token\");\n            const refreshToken = params.get(\"refresh_token\");\n            // Store tokens and user info securely\n            if (accessToken) {\n                localStorage.setItem(\"accessToken\", accessToken);\n                localStorage.setItem(\"refreshToken\", refreshToken);\n                localStorage.setItem(\"username\", username);\n                localStorage.setItem(\"email\", email);\n            }\n            console.log(\"Access token:\", accessToken);\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center items-center h-screen bg-gray-100\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n            onClick: handleGoogleLogin,\n            className: \"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\",\n            children: \"Login with Google\"\n        }, void 0, false, {\n            fileName: \"E:\\\\Alphi\\\\Tutorial\\\\Next\\\\PDF_generator\\\\website\\\\src\\\\components\\\\home\\\\google-login.jsx\",\n            lineNumber: 39,\n            columnNumber: 13\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"E:\\\\Alphi\\\\Tutorial\\\\Next\\\\PDF_generator\\\\website\\\\src\\\\components\\\\home\\\\google-login.jsx\",\n        lineNumber: 38,\n        columnNumber: 9\n    }, undefined);\n};\n_s(GoogleLogin, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n_c = GoogleLogin;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoogleLogin);\nvar _c;\n$RefreshReg$(_c, \"GoogleLogin\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2hvbWUvZ29vZ2xlLWxvZ2luLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFMEI7QUFFMUIsTUFBTUMsY0FBYzs7SUFDaEIsTUFBTUMsb0JBQW9CO1FBQ3RCLElBQUk7WUFDQSxNQUFNQyxNQUFNLE1BQU1DLE1BQU07WUFDeEIsTUFBTSxFQUFFQyxRQUFRLEVBQUUsR0FBRyxNQUFNRixJQUFJRyxJQUFJO1lBQ25DQyxPQUFPQyxRQUFRLENBQUNDLElBQUksR0FBR0o7UUFDM0IsRUFBRSxPQUFPSyxPQUFPO1lBQ1pDLFFBQVFELEtBQUssQ0FBQyw4QkFBOEJBO1FBQ2hEO0lBQ0o7SUFFQUUsVUFBVTtRQUNOLElBQUksSUFBNkIsRUFBRTtZQUMvQixzQ0FBc0M7WUFDdEMsTUFBTUMsU0FBUyxJQUFJQyxnQkFBZ0JQLE9BQU9DLFFBQVEsQ0FBQ08sTUFBTTtZQUN6RCxNQUFNQyxXQUFXSCxPQUFPSSxHQUFHLENBQUM7WUFDNUIsTUFBTUMsUUFBUUwsT0FBT0ksR0FBRyxDQUFDO1lBQ3pCLE1BQU1FLGNBQWNOLE9BQU9JLEdBQUcsQ0FBQztZQUMvQixNQUFNRyxlQUFlUCxPQUFPSSxHQUFHLENBQUM7WUFFaEMsc0NBQXNDO1lBQ3RDLElBQUlFLGFBQWE7Z0JBQ2JFLGFBQWFDLE9BQU8sQ0FBQyxlQUFlSDtnQkFDcENFLGFBQWFDLE9BQU8sQ0FBQyxnQkFBZ0JGO2dCQUNyQ0MsYUFBYUMsT0FBTyxDQUFDLFlBQVlOO2dCQUNqQ0ssYUFBYUMsT0FBTyxDQUFDLFNBQVNKO1lBQ2xDO1lBRUFQLFFBQVFZLEdBQUcsQ0FBQyxpQkFBaUJKO1FBQ2pDO0lBQ0osR0FBRyxFQUFFO0lBRUwscUJBQ0ksOERBQUNLO1FBQUlDLFdBQVU7a0JBQ1gsNEVBQUNDO1lBQ0dDLFNBQVN6QjtZQUNUdUIsV0FBVTtzQkFDYjs7Ozs7Ozs7Ozs7QUFLYjtHQTFDTXhCO0tBQUFBO0FBNENOLGlFQUFlQSxXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaG9tZS9nb29nbGUtbG9naW4uanN4P2UwMWQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgR29vZ2xlTG9naW4gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVHb29nbGVMb2dpbiA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdXNlci9hdXRoL2dvb2dsZS9cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgYXV0aF91cmwgfSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXV0aF91cmw7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGR1cmluZyBHb29nbGUgbG9naW46XCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIC8vIFBhcnNlIHF1ZXJ5IHBhcmFtZXRlcnMgZnJvbSB0aGUgVVJMXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJuYW1lID0gcGFyYW1zLmdldChcInVzZXJuYW1lXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IHBhcmFtcy5nZXQoXCJlbWFpbFwiKTtcclxuICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBwYXJhbXMuZ2V0KFwiYWNjZXNzX3Rva2VuXCIpO1xyXG4gICAgICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBwYXJhbXMuZ2V0KFwicmVmcmVzaF90b2tlblwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0b3JlIHRva2VucyBhbmQgdXNlciBpbmZvIHNlY3VyZWx5XHJcbiAgICAgICAgICAgIGlmIChhY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhY2Nlc3NUb2tlblwiLCBhY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInJlZnJlc2hUb2tlblwiLCByZWZyZXNoVG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VybmFtZVwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVtYWlsXCIsIGVtYWlsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBY2Nlc3MgdG9rZW46XCIsIGFjY2Vzc1Rva2VuKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIGgtc2NyZWVuIGJnLWdyYXktMTAwXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVHb29nbGVMb2dpbn0gXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ibHVlLTUwMCBob3ZlcjpiZy1ibHVlLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBweS0yIHB4LTQgcm91bmRlZFwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIExvZ2luIHdpdGggR29vZ2xlXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdvb2dsZUxvZ2luOyJdLCJuYW1lcyI6WyJSZWFjdCIsIkdvb2dsZUxvZ2luIiwiaGFuZGxlR29vZ2xlTG9naW4iLCJyZXMiLCJmZXRjaCIsImF1dGhfdXJsIiwianNvbiIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImVycm9yIiwiY29uc29sZSIsInVzZUVmZmVjdCIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInNlYXJjaCIsInVzZXJuYW1lIiwiZ2V0IiwiZW1haWwiLCJhY2Nlc3NUb2tlbiIsInJlZnJlc2hUb2tlbiIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJsb2ciLCJkaXYiLCJjbGFzc05hbWUiLCJidXR0b24iLCJvbkNsaWNrIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/home/google-login.jsx\n"));

/***/ })

});