import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, Copy, Check, ShieldCheck, Database, RefreshCw, Sparkles, Layers, Cpu } from 'lucide-react';
import { sampleSqlQueries } from '../data/portfolioData';

export default function PipelinePlayground() {
  const [activeTab, setActiveTab] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [executionOutput, setExecutionOutput] = useState(null);

  const query = sampleSqlQueries[activeTab];

  const handleRun = () => {
    setIsRunning(true);
    setExecutionOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      if (activeTab === 0) {
        setExecutionOutput({
          status: "AGENTIC TEXT-TO-SQL VALIDATED",
          executionTime: "84 ms (MCP Protocol)",
          recordsScanned: "4 Catalogs, 28 Tables Analyzed",
          accuracy: "99.4% Syntactic & Relational Accuracy",
          naturalQuery: "Show total transaction volume and failure rates grouped by payment channel for Q3 with settlement latency",
          generatedSql: `SELECT 
    t.payment_channel,
    COUNT(t.transaction_id) AS total_tx_volume,
    ROUND(100.0 * SUM(CASE WHEN t.status = 'FAILED' THEN 1 ELSE 0 END) / COUNT(*), 2) AS failure_rate_pct,
    AVG(t.latency_ms) AS avg_settlement_ms
FROM analytics_dw.transactions t
INNER JOIN analytics_dw.channels c ON t.payment_channel = c.channel_code
WHERE t.transaction_timestamp BETWEEN '2024-07-01' AND '2024-09-30'
GROUP BY t.payment_channel
ORDER BY total_tx_volume DESC;`,
          guardrailChecks: [
            { check: "Schema Entity Resolution", status: "PASSED (Resolved 'transactions' & 'channels')", color: "text-emerald-400" },
            { check: "Deterministic AST Join Guardrail", status: "PASSED (Relational Join on payment_channel, 0 Cartesian)", color: "text-emerald-400" },
            { check: "Enterprise Multi-Tenant RBAC", status: "PASSED (Tenant scope verified)", color: "text-cyan-400" },
            { check: "Model Context Protocol (MCP)", status: "PASSED (Tool 'generate_production_sql' executed via stdio)", color: "text-emerald-400" }
          ]
        });
      } else if (activeTab === 1) {
        setExecutionOutput({
          status: "REDSHIFT AUDIT SUCCESS",
          executionTime: "142 ms",
          recordsScanned: "1,420,890 events",
          anomaliesDetected: "40% reduction (PCI-DSS Compliant)",
          data: [
            { channel: "CREDIT_CARD_REST", total: "450,210", nulls: "12", null_pct: "0.002%", latency: "42ms" },
            { channel: "ACH_BATCH_PAY", total: "620,100", nulls: "45", null_pct: "0.007%", latency: "85ms" },
            { channel: "MOBILE_POS_GATEWAY", total: "350,580", nulls: "8", null_pct: "0.002%", latency: "38ms" }
          ]
        });
      } else {
        setExecutionOutput({
          status: "AWS GLUE JOB SUCCEEDED",
          executionTime: "1.24 mins (Spark Cluster)",
          recordsScanned: "3,850,000 streaming events",
          anomaliesDetected: "0 duplicate transaction IDs",
          log: "[INFO] GlueContext initialized.\n[INFO] Catalog schema 'payment_dw' parsed successfully.\n[INFO] Filtering risk_score > 0.85 (Anomalous payload stream tagged).\n[INFO] Partitioning parquet files by payment_channel to s3://global-payments-analytics-prod/\n[SUCCESS] Job completed with 0 errors."
        });
      }
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(query.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="sandbox" className="py-20 bg-slate-950/80 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <Terminal className="w-3.5 h-3.5" /> Interactive Agentic AI & ETL Playground
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Live AgentSQL, MCP & Data Pipeline Simulator
          </h2>
          <p className="text-slate-400 text-sm">
            Experience the actual AgentSQL Text-to-SQL prompt guardrails (Trida Labs), Redshift data quality scripts (Global Payments), and PySpark Glue ETL logic (Amazon).
          </p>
        </div>

        {/* Console Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Top Bar Tabs */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Script Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {sampleSqlQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTab(idx);
                    setExecutionOutput(null);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                    activeTab === idx
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 font-semibold shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {idx === 0 && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                  {idx === 1 && <Database className="w-3.5 h-3.5 text-emerald-400" />}
                  {idx === 2 && <Cpu className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{item.tabLabel}</span>
                  <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 rounded bg-slate-950 text-slate-500 border border-slate-800 font-sans">
                    {item.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Console Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-mono border border-slate-700"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {isCopied ? 'Copied' : 'Copy Code'}
              </button>

              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-2 px-5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition-all disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Run Simulation
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Code Viewer Panel */}
          <div className="p-6 bg-slate-950 font-mono text-xs text-cyan-300 overflow-x-auto border-b border-slate-800/80 max-h-[350px]">
            <div className="text-slate-500 mb-2">// {query.description}</div>
            <pre className="leading-relaxed">
              <code>{query.code}</code>
            </pre>
          </div>

          {/* Execution Output Panel */}
          <div className="p-6 bg-slate-900 min-h-[160px]">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" /> Execution Console Output:
              </span>
              {executionOutput && (
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> {executionOutput.status} ({executionOutput.executionTime})
                </span>
              )}
            </div>

            {!executionOutput && !isRunning && (
              <div className="text-slate-500 text-xs font-mono py-6 text-center border border-dashed border-slate-800 rounded-xl">
                Click "Run Simulation" above to execute query on mock AgentSQL MCP engine / Redshift / Glue.
              </div>
            )}

            {isRunning && (
              <div className="flex items-center justify-center gap-3 py-8 text-cyan-400 font-mono text-xs">
                <RefreshCw className="w-5 h-5 animate-spin" />
                {activeTab === 0
                  ? 'Connecting to Model Context Protocol (MCP) server & resolving schema guardrails...'
                  : 'Parsing catalog schema and running distributed map-reduce partitions...'}
              </div>
            )}

            {/* Tab 0 Output: AgentSQL & MCP */}
            {executionOutput && activeTab === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono mb-2">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                    Resolution Latency: <span className="text-cyan-400 font-semibold">{executionOutput.executionTime}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                    Accuracy Standard: <span className="text-emerald-400 font-semibold">{executionOutput.accuracy}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                    Context Analyzed: <span className="text-purple-400 font-semibold">{executionOutput.recordsScanned}</span>
                  </div>
                </div>

                {/* Natural query & Generated SQL */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Stakeholder Natural Language Query:</span>
                  </div>
                  <div className="text-xs text-white font-medium italic pl-5">
                    "{executionOutput.naturalQuery}"
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pt-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Autonomous Generated SQL (Syntactically Verified):</span>
                  </div>
                  <pre className="text-xs font-mono text-cyan-300 bg-slate-900/90 p-3 rounded-lg overflow-x-auto border border-slate-800">
                    <code>{executionOutput.generatedSql}</code>
                  </pre>
                </div>

                {/* Guardrail checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {executionOutput.guardrailChecks.map((item, gIdx) => (
                    <div key={gIdx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-semibold block">{item.check}</span>
                        <span className="text-[11px] text-slate-400">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 1 Output: Redshift Anomaly Audit */}
            {executionOutput && activeTab === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono mb-2">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Scanned: <span className="text-cyan-400">{executionOutput.recordsScanned}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Quality Standard: <span className="text-emerald-400">{executionOutput.anomaliesDetected}</span>
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Payment Channel</th>
                        <th className="p-2.5">Total Events</th>
                        <th className="p-2.5">Null Amounts</th>
                        <th className="p-2.5">Null Pct</th>
                        <th className="p-2.5">Avg Latency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {executionOutput.data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="p-2.5 font-bold text-cyan-300">{row.channel}</td>
                          <td className="p-2.5">{row.total}</td>
                          <td className="p-2.5 text-emerald-400">{row.nulls}</td>
                          <td className="p-2.5 text-emerald-400">{row.null_pct}</td>
                          <td className="p-2.5">{row.latency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2 Output: AWS Glue PySpark */}
            {executionOutput && activeTab === 2 && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-wrap">
                {executionOutput.log}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
