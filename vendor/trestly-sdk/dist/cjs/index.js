"use strict";
/**
 * Trestly SDK - TypeScript client library for routing x402 payments through Trestly escrow
 *
 * This package provides a drop-in replacement for standard x402 payment calls that routes
 * payments through the Trestly escrow contract instead of paying the seller directly.
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaymentId = exports.parseEscrowedPayment = exports.submitAndConfirm = exports.simulateTransaction = exports.buildContractTransaction = exports.wrapX402Payment = exports.getPayment = exports.resolveDispute = exports.release = exports.raiseDispute = exports.createPayment = void 0;
// Core client functions
var client_js_1 = require("./client.js");
Object.defineProperty(exports, "createPayment", { enumerable: true, get: function () { return client_js_1.createPayment; } });
Object.defineProperty(exports, "raiseDispute", { enumerable: true, get: function () { return client_js_1.raiseDispute; } });
Object.defineProperty(exports, "release", { enumerable: true, get: function () { return client_js_1.release; } });
Object.defineProperty(exports, "resolveDispute", { enumerable: true, get: function () { return client_js_1.resolveDispute; } });
Object.defineProperty(exports, "getPayment", { enumerable: true, get: function () { return client_js_1.getPayment; } });
// X402 wrapper (most common integration point)
var x402_wrapper_js_1 = require("./x402-wrapper.js");
Object.defineProperty(exports, "wrapX402Payment", { enumerable: true, get: function () { return x402_wrapper_js_1.wrapX402Payment; } });
// Contract utilities (for advanced usage)
var contract_js_1 = require("./contract.js");
Object.defineProperty(exports, "buildContractTransaction", { enumerable: true, get: function () { return contract_js_1.buildContractTransaction; } });
Object.defineProperty(exports, "simulateTransaction", { enumerable: true, get: function () { return contract_js_1.simulateTransaction; } });
Object.defineProperty(exports, "submitAndConfirm", { enumerable: true, get: function () { return contract_js_1.submitAndConfirm; } });
Object.defineProperty(exports, "parseEscrowedPayment", { enumerable: true, get: function () { return contract_js_1.parseEscrowedPayment; } });
Object.defineProperty(exports, "parsePaymentId", { enumerable: true, get: function () { return contract_js_1.parsePaymentId; } });
//# sourceMappingURL=index.js.map