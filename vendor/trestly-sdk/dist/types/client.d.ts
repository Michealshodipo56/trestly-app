/**
 * Trestly SDK client functions
 */
import { TrestlyConfig, CreatePaymentParams, CreatePaymentResult, RaiseDisputeParams, ResolveDisputeParams, TransactionResult, EscrowedPayment } from "./types.js";
/**
 * Create a new escrowed payment
 *
 * Builds a Soroban transaction invoking create_payment on the Trestly contract.
 * Simulates the transaction, then calls the provided signTransaction callback
 * (this decouples the SDK from any specific wallet — the caller supplies their own signer,
 * whether that's Freighter in a browser or a server-side keypair).
 * Submits the signed transaction, polls for confirmation.
 *
 * @param config - Trestly contract configuration
 * @param params - Payment parameters including signer callback
 * @returns The new paymentId and transaction hash
 */
export declare function createPayment(config: TrestlyConfig, params: CreatePaymentParams): Promise<CreatePaymentResult>;
/**
 * Raise a dispute for an escrowed payment
 *
 * Same build → simulate → sign → submit → confirm pattern, invoking raise_dispute.
 *
 * @param config - Trestly contract configuration
 * @param params - Dispute parameters including payment ID and signer
 * @returns Transaction hash
 */
export declare function raiseDispute(config: TrestlyConfig, params: RaiseDisputeParams): Promise<TransactionResult>;
/**
 * Release an escrowed payment after the dispute window
 *
 * No signer required as a parameter beyond the submitting account — this is a public,
 * unauthenticated contract call. Still needs a fee-paying source account to submit the transaction.
 *
 * @param config - Trestly contract configuration
 * @param paymentId - The payment to release
 * @param submitterAccount - The account that will pay transaction fees (must have funds)
 * @param signTransaction - Callback to sign the transaction with the submitter's key
 * @returns Transaction hash
 */
export declare function release(config: TrestlyConfig, paymentId: number, submitterAccount: string, signTransaction: (xdr: string) => Promise<string>): Promise<TransactionResult>;
/**
 * Resolve a disputed payment (arbiter only)
 *
 * Invokes resolve_dispute. The arbiter decides whether to refund to payer or release to payee.
 *
 * @param config - Trestly contract configuration
 * @param params - Resolution parameters including arbiter and decision
 * @returns Transaction hash
 */
export declare function resolveDispute(config: TrestlyConfig, params: ResolveDisputeParams): Promise<TransactionResult>;
/**
 * Get an escrowed payment by ID
 *
 * Read-only — simulate a transaction calling get_payment, parse and return the result.
 * No signing needed.
 *
 * @param config - Trestly contract configuration
 * @param paymentId - The payment ID to retrieve
 * @returns The escrowed payment data
 */
export declare function getPayment(config: TrestlyConfig, paymentId: number): Promise<EscrowedPayment>;
//# sourceMappingURL=client.d.ts.map