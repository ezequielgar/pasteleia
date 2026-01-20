'use client';

import { useRouter } from 'next/navigation';
import { TrendingUp } from 'lucide-react';

export default function FinanceSummaryCard({ incomeData, expensesData }) {
    const router = useRouter();

    // Calculate totals
    const totalIncome = incomeData.reduce((sum, val) => sum + val, 0);
    const totalExpenses = expensesData.reduce((sum, val) => sum + val, 0);
    const profit = totalIncome - totalExpenses;

    // Calculate percentage changes (comparing last 3 days vs previous 4 days)
    const recentIncome = incomeData.slice(-3).reduce((sum, val) => sum + val, 0);
    const previousIncome = incomeData.slice(0, 4).reduce((sum, val) => sum + val, 0);
    const incomeChange = previousIncome > 0 ? ((recentIncome - previousIncome) / previousIncome * 100).toFixed(1) : 0;

    // Get max value for chart scaling
    const maxValue = Math.max(...incomeData, ...expensesData);

    return (
        <div
            onClick={() => router.push('/admin/finanzas')}
            className="neobrutalist-card group cursor-pointer"
        >
            {/* Pattern Grid Overlay */}
            <div className="card-pattern-grid"></div>
            <div className="card-overlay-dots"></div>

            {/* Bold Pattern */}
            <div className="bold-pattern">
                <svg viewBox="0 0 100 100">
                    <path
                        strokeDasharray="15 10"
                        strokeWidth="10"
                        stroke="#000"
                        fill="none"
                        d="M0,0 L100,0 L100,100 L0,100 Z"
                    ></path>
                </svg>
            </div>

            {/* Title Area */}
            <div className="card-title-area">
                <span className="text-sm sm:text-base">Finanzas</span>
                <span className="card-tag">Live</span>
            </div>

            {/* Body */}
            <div className="card-body">
                <div className="card-description">
                    Resumen de ingresos y gastos de los últimos 7 días con tendencias actualizadas.
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-box stat-income">
                        <p className="stat-label">Ingresos</p>
                        <p className="stat-value">${totalIncome.toFixed(0)}</p>
                        <span className={`stat-change ${incomeChange >= 0 ? 'positive' : 'negative'}`}>
                            {incomeChange >= 0 ? '+' : ''}{incomeChange}%
                        </span>
                    </div>

                    <div className="stat-box stat-expense">
                        <p className="stat-label">Gastos</p>
                        <p className="stat-value">${totalExpenses.toFixed(0)}</p>
                        <span className="stat-change neutral">
                            Ganancia: ${profit.toFixed(0)}
                        </span>
                    </div>
                </div>

                {/* Mini Chart */}
                <div className="chart-container">
                    <div className="chart-bars">
                        {incomeData.map((value, index) => {
                            const height = maxValue > 0 ? (value / maxValue * 100) : 0;
                            const expenseHeight = maxValue > 0 ? (expensesData[index] / maxValue * 100) : 0;

                            return (
                                <div key={index} className="bar-group">
                                    {/* Income bar */}
                                    <div className="bar-wrapper income-bar" style={{ height: `${height}%` }}>
                                        <div className="bar-fill" />
                                    </div>
                                    {/* Expense bar */}
                                    <div className="bar-wrapper expense-bar" style={{ height: `${expenseHeight}%` }}>
                                        <div className="bar-fill" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="card-actions">
                    <div className="price">
                        <span className="text-lg font-bold">7 días</span>
                        <span className="price-period">últimos</span>
                    </div>

                    <button className="card-button">
                        Ver Detalles
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="dots-pattern">
                <svg viewBox="0 0 80 40">
                    <circle fill="#000" r="3" cy="10" cx="10"></circle>
                    <circle fill="#000" r="3" cy="10" cx="30"></circle>
                    <circle fill="#000" r="3" cy="10" cx="50"></circle>
                    <circle fill="#000" r="3" cy="10" cx="70"></circle>
                    <circle fill="#000" r="3" cy="20" cx="20"></circle>
                    <circle fill="#000" r="3" cy="20" cx="40"></circle>
                    <circle fill="#000" r="3" cy="20" cx="60"></circle>
                    <circle fill="#000" r="3" cy="30" cx="10"></circle>
                    <circle fill="#000" r="3" cy="30" cx="30"></circle>
                    <circle fill="#000" r="3" cy="30" cx="50"></circle>
                    <circle fill="#000" r="3" cy="30" cx="70"></circle>
                </svg>
            </div>

            <div className="accent-shape"></div>
            <div className="corner-slice"></div>

            <div className="stamp">
                <span className="stamp-text">$$</span>
            </div>

            <style jsx>{`
                .neobrutalist-card {
                    --primary: #10B981;
                    --primary-hover: #059669;
                    --secondary: #3B82F6;
                    --secondary-hover: #2563EB;
                    --accent: #F59E0B;
                    --text: #050505;
                    --bg: #ffffff;
                    --shadow-color: #000000;
                    --pattern-color: #cfcfcf;

                    position: relative;
                    width: 100%;
                    max-width: 20em;
                    background: var(--bg);
                    border: 0.35em solid var(--text);
                    border-radius: 0.6em;
                    box-shadow: 0.7em 0.7em 0 var(--shadow-color),
                        inset 0 0 0 0.15em rgba(0, 0, 0, 0.05);
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                    overflow: hidden;
                    transform-origin: center;
                }

                .neobrutalist-card:hover {
                    transform: translate(-0.4em, -0.4em) scale(1.02);
                    box-shadow: 1em 1em 0 var(--shadow-color);
                }

                .neobrutalist-card:hover .card-pattern-grid,
                .neobrutalist-card:hover .card-overlay-dots {
                    opacity: 1;
                }

                .neobrutalist-card:active {
                    transform: translate(0.1em, 0.1em) scale(0.98);
                    box-shadow: 0.5em 0.5em 0 var(--shadow-color);
                }

                .neobrutalist-card::before {
                    content: "";
                    position: absolute;
                    top: -1em;
                    right: -1em;
                    width: 4em;
                    height: 4em;
                    background: var(--accent);
                    transform: rotate(45deg);
                    z-index: 1;
                }

                .neobrutalist-card::after {
                    content: "★";
                    position: absolute;
                    top: 0.4em;
                    right: 0.4em;
                    color: var(--text);
                    font-size: 1.2em;
                    font-weight: bold;
                    z-index: 2;
                }

                .card-pattern-grid {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
                    background-size: 0.5em 0.5em;
                    pointer-events: none;
                    opacity: 0.5;
                    transition: opacity 0.4s ease;
                    z-index: 1;
                }

                .card-overlay-dots {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(var(--pattern-color) 1px, transparent 1px);
                    background-size: 1em 1em;
                    background-position: -0.5em -0.5em;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    z-index: 1;
                }

                .bold-pattern {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 6em;
                    height: 6em;
                    opacity: 0.15;
                    pointer-events: none;
                    z-index: 1;
                }

                .card-title-area {
                    position: relative;
                    padding: 1.4em;
                    background: var(--primary);
                    color: var(--bg);
                    font-weight: 800;
                    font-size: 1.2em;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 0.35em solid var(--text);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    z-index: 2;
                    overflow: hidden;
                }

                .card-title-area::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 0.5em,
                            transparent 0.5em, transparent 1em);
                    pointer-events: none;
                    opacity: 0.3;
                }

                .card-tag {
                    background: var(--bg);
                    color: var(--text);
                    font-size: 0.6em;
                    font-weight: 800;
                    padding: 0.4em 0.8em;
                    border: 0.15em solid var(--text);
                    border-radius: 0.3em;
                    box-shadow: 0.2em 0.2em 0 var(--shadow-color);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    transform: rotate(3deg);
                    transition: all 0.3s ease;
                }

                .neobrutalist-card:hover .card-tag {
                    transform: rotate(-2deg) scale(1.1);
                    box-shadow: 0.25em 0.25em 0 var(--shadow-color);
                }

                .card-body {
                    position: relative;
                    padding: 1.5em;
                    z-index: 2;
                }

                .card-description {
                    margin-bottom: 1.5em;
                    color: var(--text);
                    font-size: 0.95em;
                    line-height: 1.4;
                    font-weight: 500;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1em;
                    margin-bottom: 1.5em;
                }

                .stat-box {
                    padding: 1em;
                    border-radius: 0.5em;
                    border: 0.12em solid var(--text);
                    box-shadow: 0.2em 0.2em 0 rgba(0, 0, 0, 0.2);
                }

                .stat-income {
                    background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
                }

                .stat-expense {
                    background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
                }

                .stat-label {
                    font-size: 0.75em;
                    font-weight: 700;
                    color: var(--text);
                    margin-bottom: 0.3em;
                    text-transform: uppercase;
                }

                .stat-value {
                    font-size: 1.1em;
                    font-weight: 800;
                    color: var(--text);
                    margin-bottom: 0.2em;
                }

                .stat-change {
                    font-size: 0.7em;
                    font-weight: 600;
                }

                .stat-change.positive {
                    color: #059669;
                }

                .stat-change.negative {
                    color: #DC2626;
                }

                .stat-change.neutral {
                    color: #6B7280;
                }

                .chart-container {
                    margin-bottom: 1.5em;
                    height: 7em;
                    background: #F9FAFB;
                    border: 0.15em solid var(--text);
                    border-radius: 0.5em;
                    padding: 0.8em;
                    overflow: hidden;
                }

                .chart-bars {
                    display: flex;
                    height: 100%;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 0.2em;
                }

                .bar-group {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    gap: 0.15em;
                    height: 100%;
                }

                .bar-wrapper {
                    width: 100%;
                    border-radius: 0.2em;
                    position: relative;
                }

                .bar-wrapper.income-bar {
                    background: #D1FAE5;
                }

                .bar-wrapper.expense-bar {
                    background: #FEE2E2;
                }

                .bar-fill {
                    width: 100%;
                    height: 85%;
                    border-radius: 0.2em;
                    transition: all 0.3s ease;
                }

                .income-bar .bar-fill {
                    background: linear-gradient(to top, #10B981, #34D399);
                    box-shadow: 0 0.1em 0.2em rgba(16, 185, 129, 0.3);
                }

                .expense-bar .bar-fill {
                    background: linear-gradient(to top, #EF4444, #F87171);
                    box-shadow: 0 0.1em 0.2em rgba(239, 68, 68, 0.3);
                }

                .card-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1.5em;
                    padding-top: 1.2em;
                    border-top: 0.15em dashed rgba(0, 0, 0, 0.15);
                    position: relative;
                }

                .card-actions::before {
                    content: "✂";
                    position: absolute;
                    top: -0.8em;
                    left: 50%;
                    transform: translateX(-50%) rotate(90deg);
                    background: var(--bg);
                    padding: 0 0.5em;
                    font-size: 1em;
                    color: rgba(0, 0, 0, 0.4);
                }

                .price {
                    position: relative;
                    font-weight: 800;
                    color: var(--text);
                }

                .price::before {
                    content: "";
                    position: absolute;
                    bottom: 0.15em;
                    left: 0;
                    width: 100%;
                    height: 0.2em;
                    background: var(--accent);
                    z-index: -1;
                    opacity: 0.5;
                }

                .price-period {
                    display: block;
                    font-size: 0.7em;
                    font-weight: 600;
                    color: rgba(0, 0, 0, 0.6);
                    margin-top: 0.2em;
                }

                .card-button {
                    position: relative;
                    background: var(--secondary);
                    color: var(--bg);
                    font-size: 0.9em;
                    font-weight: 700;
                    padding: 0.7em 1.2em;
                    border: 0.2em solid var(--text);
                    border-radius: 0.4em;
                    box-shadow: 0.3em 0.3em 0 var(--shadow-color);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    overflow: hidden;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .card-button::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
                    transition: left 0.6s ease;
                }

                .neobrutalist-card:hover .card-button {
                    background: var(--secondary-hover);
                    transform: translate(-0.1em, -0.1em);
                    box-shadow: 0.4em 0.4em 0 var(--shadow-color);
                }

                .neobrutalist-card:hover .card-button::before {
                    left: 100%;
                }

                .card-button:active {
                    transform: translate(0.1em, 0.1em);
                    box-shadow: 0.15em 0.15em 0 var(--shadow-color);
                }

                .dots-pattern {
                    position: absolute;
                    bottom: 2em;
                    left: -2em;
                    width: 8em;
                    height: 4em;
                    opacity: 0.3;
                    transform: rotate(-10deg);
                    pointer-events: none;
                    z-index: 1;
                }

                .accent-shape {
                    position: absolute;
                    width: 2.5em;
                    height: 2.5em;
                    background: var(--secondary);
                    border: 0.15em solid var(--text);
                    border-radius: 0.3em;
                    transform: rotate(45deg);
                    bottom: -1.2em;
                    right: 2em;
                    z-index: 0;
                    transition: transform 0.3s ease;
                }

                .neobrutalist-card:hover .accent-shape {
                    transform: rotate(55deg) scale(1.1);
                }

                .stamp {
                    position: absolute;
                    bottom: 1.5em;
                    left: 1.5em;
                    width: 4em;
                    height: 4em;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 0.15em solid rgba(0, 0, 0, 0.3);
                    border-radius: 50%;
                    transform: rotate(-15deg);
                    opacity: 0.2;
                    z-index: 1;
                }

                .stamp-text {
                    font-size: 0.8em;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .corner-slice {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 1.5em;
                    height: 1.5em;
                    background: var(--bg);
                    border-right: 0.25em solid var(--text);
                    border-top: 0.25em solid var(--text);
                    border-radius: 0 0.5em 0 0;
                    z-index: 1;
                }
            `}</style>
        </div>
    );
}
